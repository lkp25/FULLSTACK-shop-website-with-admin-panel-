module.exports = (req, res, next)=>{
    console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
    //only allow admin users through
    if (req.session.user.isAdmin) {
      
      next()
    } else {
      res.send('ERROR: This account does not have admin privilige')
    }
  
  }