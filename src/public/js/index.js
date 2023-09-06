const socket = io()

socket.on("products",(obj)=>{
    showProducts(obj)
})


function showProducts(products) {
    let div = document.getElementById("productos");
    let productos = "";
  
    products.forEach((product) => {
      productos += `
        <div class="card">
          <div class="contentBx">
            <h2>${product.title}</h2>
            <div>
              <h3>${product.description}</h3>
            </div>
            <div>
              <h3>Stock: ${product.stock}</h3>
            </div>
            <div>
              <h3>Precio: ${product.price}</h3>
            </div>
          </div>
        </div>
          `;
    });
  
    div.innerHTML = productos;
  }
