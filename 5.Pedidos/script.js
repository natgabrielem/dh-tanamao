// localização

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    localStorage.setItem("Longitude: ", position.coords.longitude)
    localStorage.setItem("Latitude: ", position.coords.latitude)
  }

getLocation();

// busca e renderizacao dos produtos

const root = document.getElementById('root');

const prodURL = "https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/products?finalizado=false";

async function getProducts() {
    let response = await fetch(prodURL).then(res => res.json());
    let products = await response.products;

    for (let val of products) {
        console.log(val);

        const { cep, cpf, endereco, nomeUser, gorjeta, pagamento, pedido } = val;

        let pedidosArr = pedido.split('/');
        let pedidosStr = `<div class="order-description">`;

        for (let i = 1; i < pedidosArr.length; i += 2) {
            pedidosStr += `<span class="order-item">` + pedidosArr[i - 1] + ` | Qnt. ` + pedidosArr[i] + `</span>`;

            if (i !== pedidosArr.length - 1) {
                pedidosStr += `<hr />`
            }
        }

        pedidosStr += `</div>`;
        
        root.insertAdjacentHTML('beforeend', 
            `<div class="order-container">
                <a href="../5.5 Confirmação/confirmacao.html">
                <div class="order-box">
                    <div class="order-info">
                        <h2 class="order-user">${nomeUser}</h2>
                    </div>` 
                    
                    + pedidosStr + ` 

                    <div class="order-location">
                        <img src="../assets/icon/icons8-encomenda-enviada-100.png" alt="Encomenda enviada">
                        <span>Distância: 100m</span>
                        <img src="../assets/icon/icons8-pilha-de-dinheiro-100.png" alt="Gorjeta">
                        <span>Gorjeta: R$: ${gorjeta},00</span>
                    </div>
                </div>
                </a>
            </div>`
        )        
    }
}

getProducts();

// fim da busca e renderização dos produtos