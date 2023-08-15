// IIFE Immediate Invoke Function Expression
(async () => {

const http = require ('http')     // requerido para websockets
const path = require('path')

const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require ("socket.io") // requerido para websockets
const mongoose = require('mongoose')


const routes = require ('./routes/index.js') 

const socketManager = require('./websocket')


try {
  // conectar la base de datos antes de levantar el server => Mongo Atlas: mongodb+srv://USUARIO:CONTRASEÑA@cluster0.ewuqtys.mongodb.net/BASE_DE_DATOS?retryWrites=true&w=majority
                                                                  //Local: mongodb://localhost:27017/ecommerce
  
  
  await mongoose.connect("mongodb+srv://irante:flame360@cluster0.8qme5x7.mongodb.net/ecommerce?retryWrites=true&w=majority")

  
const app = express()         //app express

const server = http.createServer(app)     // server http montado con express. se embebe la app de express en createserver (websockets)
const io = new Server(server)             // websockets montado en el http

app.engine('handlebars', handlebars.engine()) // registramos handlebars como motor de plantillas
app.set('views', path.join(__dirname, '/views')) // el setting 'views' = directorio de vistas
app.set('view engine', 'handlebars') // setear handlebars como motor de plantillas


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static', express.static(path.join(__dirname + '/public'))) // convertimos a la carpeta public en recurso estatico para alojar imagenes/css



app.use('/', routes)     // hacer que todas las rutas /api usen routes (index.js de api que a su vez contiene las rutas de usuarios, productos,etc)  ********


// web socket
io.on('connection', socketManager)


const port = 8080

server.listen(port, () => {
  console.log(`Express Server listening at http://localhost:${port}`)
})

console.log('se ha conectado a la base de datos')
} catch(e) {
  console.log('no se ha podido conectar a la base de datos')
  console.log(e)
}
})()
