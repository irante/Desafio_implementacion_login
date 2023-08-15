const cartModel = require('../models/cart.model')

class CartManager {


  

  // Agregar Carrito

  async create(carrito) {
    const NewCarrito = await cartModel.create(carrito)
    return NewCarrito 


  }


  /*
  // obtener los productos del carrito con id especificado

  async getProductsByCartId(cartId) {
    await this.#readFile();

    const cart = this.#carts.find((cart) => cart.id == cartId);

    if (!cart) {
      return "carrito no encontrado";
    }
    
    return cart.products;
  }



// Agregar productos al carrito

async AgregarProducto(idcart, Idprod) {

  await this.#readFile()
  
  
  let index = this.#carts.findIndex(el => el.id === parseInt(idcart))  // verifica si existe un carrito con ese id. Daba error debido a que traia el parametro como string

 
  if (index < 0) throw new Error ("Cart not found")
  
  const productIndex = this.#carts[index].products.findIndex(item => item.id === parseInt(Idprod)) // aqui verificas si el carrito ya tiene un producto con el id que viene por params
  
  if (productIndex >= 0) { // si existe aqui se aumenta la cantidad
  
  const newProduct = {
  
  id: Idprod,
  
  quantity: this.#carts[index].products[productIndex].quantity + 1,
  
  }
  
  this.#carts[index].products[productIndex] = newProduct
  
  } else { // si aun no existe el producto en el carrito lo agrega
  
  const newProduct = {
  
  id: Idprod,
  
  quantity: 1
  
  }
  
  this.#carts[index].products.push(newProduct)
  
  }
  
  this.#writeFile()
  
  return this.#carts[index].products
  
  }



*/



}






module.exports = new CartManager()