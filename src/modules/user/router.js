const Router = require("express").Router()
const { signin, signup } = require("./controller")

const UserRouter = (app) => {
    Router.post('/signup', signup)
    Router.post('/signin', signin)
    app.use(Router)
}

module.exports = UserRouter