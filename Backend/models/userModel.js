  const mongoose = require('mongoose')
  const bcrypt = require('bcrypt')
  const validator = require('validator')
  const Schema = mongoose.Schema
  const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
   password: {
        type: String,
        required: true
        
    }
  })
  userSchema.statics.signup = async function (email,password){
    if(!email || !password){
      throw Error('fill the required details')
    }
    if(!validator.isEmail(email)){
      throw Error('Not a valid email')
    }
    if(!validator.isStrongPassword(password)){
      throw Error('Not a strong password')
    }
    const exist = await this.findOne({email})
    if(exist){
        throw Error('email already exist')
    }
    const salt = await bcrypt.genSalt(10) //salt is used to add extra length ie characters to our password so that 2 identical pass have diff hash 
    const hash = await bcrypt.hash(password,salt)
    const user= await this.create({email, password: hash})
    return user

  }
  userSchema.statics.login = async function (email,password){
    if(!email || !password){
      throw Error('fill the required details')
    }
    
    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect email')
    }
    const match= await bcrypt.compare(password,user.password) // check if hashed passowrd is same
    if(!match){
      throw Error('Incorrect password')
    }
    return user
  }
  module.exports= mongoose.model('user',userSchema)