function isAuth(req, res, next) {
  if (req.user) {         // si usuario existe
    next()                // continuar
    return
  }

  res.redirect('/login')    // si no existe envio a pantalla de login
}

module.exports = isAuth