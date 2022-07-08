const { model } = require("mongoose");
const { userSchema } = require("./schema")

const userModel = model("user", userSchema)

class User {
    static async create (user){
        try {
            const newUser = new userModel(user)
            return await newUser.save()

        } catch (error) {
            if(error.code == 11000){
                const duplicateError = new Error("Email already exists")
                duplicateError.code = 400
                throw duplicateError
            }
        }
    }

    static async get(email){
        
        const user = await userModel.findOne({ email })
        return user
    }
    
}

module.exports = User