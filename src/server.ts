export default (function server(){
    const express = require('express')
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    return app;
})()