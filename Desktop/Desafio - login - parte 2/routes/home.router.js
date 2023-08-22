const { Router } = require('express')

const productManager = require('../managers/ProductManager')
const userManager = require('../managers/user.manager')
const isAuth = require('../middlewares/auth.middleware')


const router = Router()


//   Acceder al home               http://localhost:8080/
//   Acceder a una pagina         http://localhost:8080/?page=2


// Router de home http://localhost:8080

router.get('/', async (req, res) => {
  let page = req.query.page
  const { docs: products, ...pageInfo } = await productManager.getAllPaged(page)
  pageInfo.prevLink = pageInfo.hasPrevPage ? `http://localhost:8080/?page=${pageInfo.prevPage}` : ''
  pageInfo.nextLink = pageInfo.hasNextPage ? `http://localhost:8080/?page=${pageInfo.nextPage}` : ''

  
  

  res.render('home', {                  // renderizamos la plantilla home.handlebars como inicio.  http://localhost:8080/
    title: 'Bienvenido a la Tienda!',
    products,
    pageInfo,
    user: req.user ?  {           // toma dato del midleware global que esta en server.js
      ...req.user,
      isAdmin: req.user?.role == 'admin',
    } : null,
    style: 'home'
   
    
  })
})


// Ruta de perfil

router.get('/profile', isAuth, (req, res) => {
  res.render('profile', {
    ...req.session.user       // envio los datos del usuario
  })
})


  //Ruta Signup

router.get('/signup', (_, res) => res.render('signup'))
router.post('/signup', async (req, res) => {
  const user = req.body

  const existing = await userManager.getByEmail(user.email)
  if (existing) {
    return res.render('signup', {
      error: 'El email ya existe'
    })
  }

   // crear al usuario
   try {
    const newUser = await userManager.create(user)

   

    req.session.user = {
      name: newUser.firstname,
      id: newUser._id,
      ...newUser._doc
    }

    console.log(req.session)

    req.session.save((err) => {
      res.redirect('/')
    })

  } catch(e) {
    return res.render('signup', {
      error: 'Ocurrio un error. Intentalo mas tarde'
    })
  }



})



 
    //Router de Logins

  router.get('/login', (_, res) => {
    res.render('login')
  })
  
  router.post('/login', async (req, res) => { // el formulario en el html enviar los datos usando el metodo post: <form action="" method="post">
    //const { user } = req.body

    const { email } = req.body

    // setear la cookie de usuario
   
    //res.cookie('user', user) // nombre que recibira la cookie,  el vaor que trenda la cookie , numero de milisendos antes de qeu expire
    //res.cookie('token', 'SOYUNTOKEN', { signed: true })


  // ********En lugar de guardar el usuarios como cookie, guardamos la sesion******


    // guardo la session con la informacion del usuario
    /*
    req.session.user = {      // la propiedad use de la sesion sera un objeto con pripiedad name y valor:  user=(req.body)
      name: "Anonimo",
      email
    }

    
    req.session.save((err) => {       // fuerzo que la sesion se guarde
      if(!err){
      res.redirect('/')         // si no hay error redirige a la pagina principal
      }       
    })
    */

    try {

      const user = await userManager.getByEmail(email)               // busco el usuario por su email
  
      if (!user) {
        return res.render('login', { error: 'El usuario no existe' })   // si no existe renderizo el login
      }
  
      req.session.user = {                                      // si el usuario existe lo guardo
        name: user.firstname,
        id: user._id,
  
        // role: 'Admin'
        ...user
      }
  
      req.session.save((err) => {
        if(!err) {
          res.redirect('/')
        }
      })
    } catch(e) {
      res.render('login', { error: 'Ha ocurrido un error' })
    }





  })


  // Router logout
  router.get('/logout', isAuth, (req, res) => {
    const { user } = req.cookies


    
    // borrar la cookie
  res.clearCookie('user') // borro la cookie de nombre user


//borro la sesion
  req.session.destroy((err) => {
    if(err) {
      return res.redirect('/error')
    }

    res.render('logout', {
      user: req.user.name
    })

    req.user = null
  })


    /*
    res.render('logout',{
      user
    })
    */
 

  


})



module.exports = router