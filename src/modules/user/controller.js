const { validateData } = require("../../utils/validator")
const { signInSchemaValidator } = require("./schema")
const { signUpSchemaValidator } = require("./schema")
const { hashPassword, comparePasswords } = require("../../utils/hasher")
const Response = require("../../utils/response")
const User = require("./model")


async function signup (req, res) {
    try {
        const newUser = req.body
        newUser.email = req.body.email.toLowerCase()
        const data = await validateData(newUser, signUpSchemaValidator)

        if(!data.isValid){
            data.error.code = 400;
            throw data.error
        }

        newUser.password = await hashPassword(req.body.password)
        const user = await User.create(newUser)
        //filter result
        const result = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
        const response = Response.success(200, result)
        res.status(response.code).send(response)
        return
    } 
    catch (error) {
        const response = Response.error(error.code ? error.code : 500, error.message)
        res.status(response.code).send(response)
    }
}
async function signin (req, res) {
    try {
       const email = req.body.email.toLowerCase();
       const password =  req.body.password;
       const data = await validateData({ email, password }, signInSchemaValidator)

       if(!data.isValid){
           data.error.code = 400
           throw data.error;
       }

       //check if user exists
       let user = await User.get(email)
       if(!user || !(await comparePasswords(password, user.password))){
           const error = new Error("Incorrect email or password")
           error.code = 400;
           throw error
       }
       //filter result
       const result = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
       } 
       
       const response =  Response.success(200, result)
       res.status(response.code).send(response)
       return

    } 
    catch (error) {
        const response = Response.error(error.code ? error.code : 500, error.message)
        res.status(response.code).send(response)
    }
}



module.exports = authRouter = { signin, signup}
