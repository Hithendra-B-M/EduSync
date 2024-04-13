const express = require('express')
const app = express()
const Bree = require('bree')
const bree = new Bree({
    jobs :[{
        name:'mailer',
        interval:'30s',
       
    }]
})
bree.start();

app.listen(5000,()=>console.log("Listening to port 5000"))