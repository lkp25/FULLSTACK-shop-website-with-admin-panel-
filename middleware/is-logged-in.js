module.exports = (req, res, next)=>{
 
    if (!req.session.isLoggedIn) {
      return res.send('ERROR: You must be logged in as admin')
    } 
    next()
  
  }