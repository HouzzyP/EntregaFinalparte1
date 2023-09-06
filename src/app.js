import express from 'express'
import cartRouter from './routes/cart.router.js'
import productRouter from './routes/product.router.js'
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import {Server} from 'socket.io'

import {ProductManager} from './Product.js'
const manager = new ProductManager()

const app = express()
const httpServer = app.listen(8080, () => console.log('listening 8080'))
const socketServer = new Server(httpServer)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');



app.use('/api/products',productRouter)

app.use('/api/carts',cartRouter)

socketServer.on('connection', async socket =>{
    console.log('Cliente Conectado')
    const arrayProducts = await manager.getProducts()
    socket.emit('products',arrayProducts)
})