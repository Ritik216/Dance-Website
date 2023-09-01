const express = require("express")
const path= require("path")
const fs = require("fs")
const app = express()
var mongoose = require("mongoose")
var bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance');
const port = 80;


// Defining mongo schema

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
})
var Contact = mongoose.model('Contact',contactSchema);

// For serving tatic files
app.use('/static',express.static('static'))
app.use(express.urlencoded());

// For template engine

app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))

// Endpoints

app.get('/',(req,res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title':"Pubg is the best game", 'content': con}
    res.status(200).render('home.pug',params)
})

app.get('/contact',(req,res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title':"Pubg is the best game", 'content': con}
    res.status(200).render('contact.pug',params)
})
app.post('/contact',(req,res)=>{
//     ri.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
//     <strong>Holy guacamole!</strong> You should check in on some of those fields below.
//     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//   </div>`
    var mydata = new Contact(req.body)
    mydata.save().then((val)=>{
        // res.send("This item has been saved to our database")
        res.status(200).render('contact.pug')
        
    }).catch((err)=>{
        res.status(404).send("This item has bot saved to out database")
    })
    
})


app.get('/about',(req,res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title':"Pubg is the best game", 'content': con}
    res.status(200).render('about.pug',params)
})
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
})