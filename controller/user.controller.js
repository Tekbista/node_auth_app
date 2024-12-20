const User = require('../model/user.model.js')
const bcrypt = require('bcrypt')


const getHashPassword = async (rawPass) => {
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const hash = await bcrypt.hash(rawPass, salt)
    return hash
}

const loadLoginPage = async (req, res) =>{
    res.status(200).render('login')
}

const authenticateUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email: email})
    

    if(user !== null){
        if(user.email === email && bcrypt.compare(password, user.password)){
            res.status(200).redirect('/home')
        }else{
            res.status(401).redirect('/user/login')
        }
    }else{
        res.status(401).redirect('/user/login')
    }
    
}

const loadSignupPage = async(req, res) =>{
    res.status(200).render('signup')
}

const createUser = async (req, res) => {
    try {
        const rawPassword = req.body.password
        const hash = await getHashPassword(rawPassword)
        req.body.password = hash
        const user = await User.create(req.body)
        if(!user){
            res.status(500).redirect('/user/signup')
        }
        res.status(200).redirect("/home")
    } catch (error) {
        console.log(error)
        res.status(500).redirect('/user/signup')
    }
}

module.exports = { loadLoginPage, loadSignupPage, createUser, authenticateUser }