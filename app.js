const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000;

app.set('view engine', 'ejs')
app.set('views', './views')
// static file serving
app.use(express.static(__dirname+'/public'))

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/blog', (req, res) => {
    res.render('blog');
})

app.get('/users', (req, res) => {
    res.render('users');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.post('/api/contact', (req, res) => {
    const name = req.body.name;
    const phone = req.body.name;
    const email = req.body.name;
    const memo = req.body.name;

    const data = `${name} ${phone} ${email} ${memo}`

    res.send(data)
})
  
app.listen(port, () => {
    console.log(`Node Legacy App listening on port ${port}`)
})