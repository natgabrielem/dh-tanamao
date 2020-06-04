// busca e rederizacao dos meus pedidos

const CPF = localStorage.getItem('cpf');

const pedidosURL = `https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/products?cpf=${CPF}`;

// lista os pedidos favoritos

async function getMyOrders() {
    let response = await fetch(pedidosURL).then(res => res.json());
    let products = await response.products;
    
    for (let val of products) {

        const { id, pedido, favorito, finalizado } = val;

        let pedidosArr = pedido.split('/');
        let pedidosStr = `<div class="order-description">`;

        for (let i = 1; i < pedidosArr.length; i += 2) {
            pedidosStr += `<p class="order-item">` + pedidosArr[i - 1] + ` | Qnt. ` + pedidosArr[i] + `</p>`;
        }

        // renderiza os produtos favoritos

        if (favorito) {
            const favDiv = document.querySelector('#fav-box');

            favDiv.insertAdjacentHTML('beforeend',
                `<div class="info order${id}">`
                    + pedidosStr + 
                `</div>
                <div class="options" style="justify-content: center;">
                    <div class="erase">
                        <img class="icon" class="icon" src="../assets/icon/icons8-esvaziar-o-carrinho-de-compras-100.png" alt="Apagar">
                        <a class="delete" onclick="delProduct(${id})" >Apagar</a>
                    </div>
                </div>
                <hr />`
            );
        }

        // renderiza os pedidos nao finalizados

        if (!finalizado) {
            const favDiv = document.querySelector('#active-box');

            favDiv.insertAdjacentHTML('beforeend',
                `<div style="padding-bottom:1px" class="info order${id}">
                    <p class="order-description">${pedidosStr}</p>
                </div>
                <div class="options" style="justify-content: center;">
                    <div class="save">
                        <img class="icon" class="icon" src="../assets/icon/icons8-copas-100.png" alt="Salvar">
                        <a onclick="favoriteProduct(${id})" href="#">Salvar</a>
                    </div>
                </div>
                <hr />`
            );
        }

        // renderiza os produtos finalizados

        if (finalizado) {
            const favDiv = document.querySelector('#finished-box');

            favDiv.insertAdjacentHTML('beforeend', 
                `<div class="info order${id}">
                    <p class="order-description">${pedidosStr}</p>
                </div>
                <div class="options">
                    <div class="reorder">
                        <img class="icon" src="../assets/icon/icons8-refresh-48.png" alt="Refazer Pedido">
                        <a onclick="remakeProduct(${id})" href="#">Refazer Pedido</a>
                    </div>
                    <div class="erase">
                        <img class="icon" class="icon" src="../assets/icon/icons8-esvaziar-o-carrinho-de-compras-100.png" alt="Apagar">
                        <a onclick="delProduct(${id})">Apagar</a>
                    </div>
                    <div class="save">
                        <img class="icon" class="icon" src="../assets/icon/icons8-copas-100.png" alt="Salvar">
                        <a onclick="favoriteProduct(${id})" href="#">Salvar</a>
                    </div>
                </div>
                <hr />`
            )
        }
    }
}

getMyOrders();

function delProduct(id) {
    const DELETE_URL = `https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/products/${id}`

    fetch(DELETE_URL, {
        method: "DELETE"
    }).then((res) => { location.reload() })
}

function favoriteProduct(id) {
    const FAV_URL = `https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/products/${id}`

    const data = {
        product: {
            favorito: true,
        }
    }

    fetch(FAV_URL, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then((res) => { location.reload() })
}

function remakeProduct(id) {
    const RMK_URL = `https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/products/${id}`

    const data = {
        product: {
            finalizado: false,
        }
    }

    fetch(RMK_URL, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then((res) => { location.reload() })
}