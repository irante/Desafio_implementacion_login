//importamos router de productos y carrito

const ProductRouter = require('./api/products.router')    // importo el router de productos
const CartRouter = require('./api/Cart.router')    // importo el router de carrito
const HomeRoutes = require('./home.router.js')
const RealtimeRoutes = require('./realtime.router.js')

// creamos un router de los otros routers

const { Router } = require('express')
const router = Router()




// rutas de productos
router.use('/api/products', ProductRouter)        // hacer que todas las rutas: /products usen el archivo product.router.js



// rutas de Carrito

router.use('/api/carts', CartRouter)


// ruta de Home

router.use('/', HomeRoutes)


// ruta realTimeProducts

router.use('/realTimeProducts', RealtimeRoutes)


// Ruta De chat
router.use('/chat', (req, res) => {
    res.render('chat')
    
  })



module.exports = router       







  