const express = require('express')
const multer = require('multer')
const app = express()
var hbs = require('hbs')

const upload = multer({ dest: 'uploads/' })

hbs.registerPartials(__dirname + '/views/partials', function (err) {})

app.set('view engine', 'html')
app.engine('html', require('hbs').__express)

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        companyName: 'XYZ COMPANY',
        founder: 'YASH',
    })
})

app.get('/products', (req, res) => {
    res.render('products.hbs', {
        products: ['WATCH', 'SHOES', 'GLASSES'],
    })
})

app.post('/products', upload.single('uploaded_file'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.redirect('/products')
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})
