import {Router} from 'express'
import {ProductManager} from '../Product.js'
const manager = new ProductManager()

const router = new Router()


router.get('/realtimeproducts',(req,res) =>{
    
    res.render('realTimeProducts',{})
})

router.get('/',(req,res) =>{
    manager.getProducts()
    .then((data) => {
        
        if(parseInt(req.query.limit) < data.length){
            const newData = data.splice(0,req.query.limit)
            res.render('home',{data: newData})
        }else{
            res.render('home',{data: data})
        }
    })
   
})

router.get('/:pid',(req,res) =>{
    manager.getProductsById(parseInt(req.params.pid))
    .then((data) => {
        if(typeof data === 'object'){
            res.send(data)
        }else{
            res.send({'Error' : data, 'id': parseInt(req.params.pid)})
        }
        
        
    })
})

router.post('/',(req,res) =>{
    manager.addProduct(req.body)

    res.status(200).send()
    
})

router.put('/:pid',(req,res) =>{
    manager.updateProducts(req.params['pid'],req.body)

    res.status(200).send()
})

router.delete('/:pid',(req,res) =>{
    manager.deleteProduct(req.params['pid'])
})

export default router