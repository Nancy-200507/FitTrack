const User = require('../models/userModel')
const jwt = require('jsonwebtoken')  //used to create signed token
const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'}) // expiresin 3d means that the user will be logined by default for 3 days if not logedoff

}
// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.login(email, password);
  
      const token = createToken(user._id);
  
      res.status(200).json({
        email: user.email,
        token,
      });
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
// signup user
const signUpUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.signup(email, password);
  
      const token = createToken(user._id);
  
      res.status(200).json({
        email: user.email,
        token,
      });
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
 module.exports = {loginUser,signUpUser}