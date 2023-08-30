import fs from 'fs';

export class ProductManager {
	products;
	constructor() {
		this.products = [];
        this.path = './src/products.json'

	}

	async getId(){
		const info = await this.getProducts()
        var maxValor = Math.max(...info.map(obj => obj.id));
		return maxValor + 1;
	}

	async addProduct({title, description, price, thumbnail, code, stock, category, status}) {
        if(status !== false){
            status = true
        }
		const productNewWOThumAndSta = {
			title,
			description,
			price,
			code,
			stock,
            category,
		};
		//Se verifica que vengan todos los campos
		const validarValues = Object.values(productNewWOThumAndSta).some(value => !value)
				if(validarValues){
					throw new error('Se encuentran campos vacios que son obligatorios!')
				}

        const productNew = {
            ...productNewWOThumAndSta,
            status,
            thumbnail
        }
		try{
			if(!fs.existsSync(this.path)){
				
				const listaVacia = []
				listaVacia.push({...productNew,id : await this.getId()})
				await fs.promises.writeFile(this.path,JSON.stringify(listaVacia,null,'\t'))
			}else{
				const info = await this.getProducts()
				const codeRepeat = info.some(a => a.code == productNew.code)
				codeRepeat == true ? console.log('El codigo se encuentra repetido') : info.push({...productNew,id: await this.getId()})
				await fs.promises.writeFile(this.path,JSON.stringify(info,null,'\t'))
			}
			

		}catch(err){
			console.log(err)
		}

	}

	async getProducts() {
		if(fs.existsSync(this.path)){
			let info =  JSON.parse(await fs.promises.readFile(this.path,'utf-8'))
			return info
		}
		return []
		
		//console.log(this.products)
	}


	async getProductsById(id) {
		const info = await this.getProducts()
		const productId = info.find(a => a.id == id)
		if(productId == undefined){
			return('El producto con el id no se encuentra')
		} else{
			return productId
		}
	}
	async deleteProduct(pid){
        const id = parseInt(pid)
        console.log(id)
		const info = await this.getProducts()
		const codeRepeat = info.some(a => a.id == id)
		//verificamos si el codigo a actualizar existe ya
		if(!codeRepeat){
			throw new Error('El Id del producto que se intenta eliminar no existe')
		}
		const findInfo = info.findIndex(a => a.id === id)
		info.splice(findInfo,1)
		await fs.promises.writeFile(this.path, JSON.stringify(info))
	}

	//buscamos todos los productos, buscamos el indice donde se encuentra el id, se asigna el id al nuevo producto a actualizar
	//y se remplaza con lo nuevo
	//product debe ser un objeto si o si
	async updateProducts(pid,product){
        const id = parseInt(pid)
		const info = await this.getProducts()
		const infoId = info.findIndex( a => a.id === id)
		const codeRepeat = info.some(a => {
			return a.code == product.code && a.id != id
		})
		//verificamos si el codigo a actualizar existe ya y es de distinto ID
        if(codeRepeat){
			throw new Error('El Code que se intenta actualizar ya existe, intente con otro')
		}
        if(infoId === -1){
            throw new Error('No existe producto con este ID')
        }
		product.id = id
        console.log(infoId)
        const newProduct = {...info[infoId], ...product}
        
		info.splice(infoId,1,newProduct)
		await fs.promises.writeFile(this.path, JSON.stringify(info))
	}

}

const Main = async () => {
	const productManager = new ProductManager()
    await productManager.addProduct("producto prueba 1","Este es un producto prueba 1",200,"Sin imagen","abc1231",25)
	await productManager.addProduct("producto prueba 2","Este es un producto prueba 2",400,"Sin imagen","abc1232",15)
	await productManager.addProduct("producto prueba 3","Este es un producto prueba 3",600,"Sin imagen","abc1233",55)
	await productManager.addProduct("producto prueba 4","Este es un producto prueba 4",600,"Sin imagen","abc1234",55)
	await productManager.addProduct("producto prueba 5","Este es un producto prueba 5",600,"Sin imagen","abc1235",55)
	await productManager.addProduct("producto prueba 6","Este es un producto prueba 6",600,"Sin imagen","abc1236",55)
	await productManager.addProduct("producto prueba 7","Este es un producto prueba 7",600,"Sin imagen","abc1237",55)
	await productManager.addProduct("producto prueba 8","Este es un producto prueba 8",600,"Sin imagen","abc1238",55)
	await productManager.addProduct("producto prueba 9","Este es un producto prueba 9",600,"Sin imagen","abc1239",55)
	await productManager.addProduct("producto prueba 10","Este es un producto prueba 10",600,"Sin imagen","abc12310",55)

  };
