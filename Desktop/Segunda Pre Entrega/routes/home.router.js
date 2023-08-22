const { Router } = require('express')

const productManager = require('../managers/ProductManager')


const router = Router()


//   Acceder al home               http://localhost:8080/
//   Acceder a una pagina         http://localhost:8080/?page=2

router.get('/', async (req, res) => {
  let page = req.query.page
  const { docs: products, ...pageInfo } = await productManager.getAllPaged(page)
  pageInfo.prevLink = pageInfo.hasPrevPage ? `http://localhost:8080/?page=${pageInfo.prevPage}` : ''
  pageInfo.nextLink = pageInfo.hasNextPage ? `http://localhost:8080/?page=${pageInfo.nextPage}` : ''

  console.log(pageInfo)
  

  res.render('home', {                  // renderizamos la plantilla home.handlebars como inicio.  http://localhost:8080/
    title: 'Bienvenido a la Tienda!',
    products,
    pageInfo
   
    
  })

  

  

})




module.exports = router