import fs from 'fs'

export class cartManager {
	carts;
	constructor() {
		this.carts = [];
        this.path = './src/carrito.json'
	}
    async getId(){
		const info = await this.getCarts()
        var maxValor = Math.max(...info.map(obj => obj.id));
        console.log(maxValor)
        if(maxValor === -Infinity){
            return 1
        }
		return maxValor + 1;
	}

    async creatCart(){
        const cart = {
            "id" : await this.getId(),
            "products": []
        }
        const info = await this.getCarts()
        info.push(cart)
        await fs.promises.writeFile(this.path,JSON.stringify(info,null,'\t'))
    }

    async getCarts(){
        if(fs.existsSync(this.path)){
			let info =  JSON.parse(await fs.promises.readFile(this.path,'utf-8'))
			return info
		}
		return []
    }

    async getCartId(id){
        if(fs.existsSync(this.path)){
			let info =  JSON.parse(await fs.promises.readFile(this.path,'utf-8'))
			const cartId = info.find(a => a.id == id)
            if(cartId == undefined){
                return('No hay carrito con la id', id)
            }else{
                return cartId
            }
		}
		return 'No hay carritos agregados'
    }

    async creatProductForCart(idC,idP){
        const cart = await this.getCartId(idC)
        const products = JSON.parse(await fs.promises.readFile('./src/products.json','utf-8'))
        const info = JSON.parse(await fs.promises.readFile(this.path,'utf-8'))
        const cartIndex = info.findIndex(a => a.id === idC)
        const product = products.find(a => a.id == idP)

        if(product === undefined){
            return {"error" : "No hay producto con dicho id"}
        }
        if(cart.products.length === 0){
            cart.products.push({"product": product.id,"quantity": product.stock})
            info[cartIndex] = cart
            await fs.promises.writeFile(this.path,JSON.stringify(info,null,'\t'))
            return
        }
        //agregar quantity si es que ya hay un producto
        if(cart.products.some(a => a.product === idP)){
            const infoQuantity = cart.products.find(a => a.product === idP)
            const productIndex = info[cartIndex].products.findIndex(a => a.product === idP)
            info[cartIndex].products[productIndex].quantity += product.stock
            
            console.log(info[cartIndex].products)
            await fs.promises.writeFile(this.path,JSON.stringify(info,null,'\t'))
            return

        }
        if(cart.products.length > 0){
            cart.products.push({"product": product.id,"quantity": product.stock})
            info[cartIndex] = cart
            await fs.promises.writeFile(this.path,JSON.stringify(info,null,'\t'))
        }
        

    }

}
