const express = require('express')
const app = express()
const port = 3000;

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