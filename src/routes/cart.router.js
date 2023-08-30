import {Router} from 'express'
import {cartManager} from '../Cart.js'
const router = new Router()
const manager = new cartManager()

router.post('/',(req,res) =>{
    manager.creatCart()

    res.status(200).send()
})

router.get('/:cid',(req,res) =>{
    manager.getCartId(parseInt(req.params.cid))
    .then((data) =>{
        res.send(data.products)
    })
})

router.post('/:cid/product/:pid',(req,res) =>{
    manager.creatProductForCart(parseInt(req.params.cid),parseInt(req.params.pid))
    .then((data) =>{
        console.log(data)
        if(data === undefined){
            res.status(200).send()
        }
        res.status(400).send(data)
    })
})
export default router