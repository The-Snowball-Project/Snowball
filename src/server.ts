export default (function server(){
    const express = require('express')
    const app = express()
    const path = require("path")
    app.use(express.static(path.join(__dirname,"public")))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    return app;
})()