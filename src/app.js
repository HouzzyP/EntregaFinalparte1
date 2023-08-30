import express from 'express'
import cartRouter from './routes/cart.router.js'
import productRouter from './routes/product.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'));


app.use('/api/products',productRouter)

app.use('/api/carts',cartRouter)

app.listen(8080,() =>console.log('Servidor arriba puerto 8080'))