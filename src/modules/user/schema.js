const Joi = require('joi');
const { Schema } = require("mongoose")

exports.userSchema = new Schema ({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        lowercase:  true,
        unique: true
    },
    password: {
        type: String
    },
})


exports.signUpSchemaValidator = Joi.object().keys({
    firstName: Joi.string().required(),

    lastName: Joi.string().required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),

    password: Joi.string().min(7).required(),

    confirmPassword: Joi.ref("password")
});

exports.signInSchemaValidator = Joi.object().keys({
   
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),

    password: Joi.string().min(7).required(),

});