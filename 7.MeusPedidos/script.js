// busca e rederizacao dos meus pedidos

const CPF = 1234567890; // pegar do localstorage

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
                `<div class="info">`
                    + pedidosStr + 
                `</div>
                <div class="options">
                    <div class="edit">
                        <img class="icon" src="../../assets/icon/icons8-editar-100.png" alt="Editar">
                        <a href="#">Editar</a>
                    </div>
                    <div class="erase">
                        <img class="icon" class="icon" src="../../assets/icon/icons8-esvaziar-o-carrinho-de-compras-100.png" alt="Apagar">
                        <a href="#">Apagar</a>
                    </div>
                </div>
                <hr />`
            );
        }

        // renderiza os pedidos nao finalizados

        if (!finalizado) {
            const favDiv = document.querySelector('#active-box');

            favDiv.insertAdjacentHTML('beforeend',
                `<div style="padding-bottom:1px" class="info">
                    <p class="order-description">${pedidosStr}</p>
                </div>
                <div class="options">
                    <div class="edit">
                        <img class="icon" src="../../assets/icon/icons8-editar-100.png" alt="Editar">
                        <a href="#">Editar</a>
                    </div>
                    <div class="save">
                        <img class="icon" class="icon" src="../../assets/icon/icons8-copas-100.png" alt="Salvar">
                        <a href="#">Salvar</a>
                    </div>
                </div>
                <hr />`
            );
        }

        // renderiza os produtos finalizados

        if (finalizado) {
            const favDiv = document.querySelector('#finished-box');

            favDiv.insertAdjacentHTML('beforeend', 
                `<div class="info">
                    <p class="order-description">${pedidosStr}</p>
                </div>
                <div class="options">
                    <div class="reorder">
                        <img class="icon" src="../../assets/icon/icons8-refresh-48.png" alt="Refazer Pedido">
                        <a href="#">Refazer Pedido</a>
                    </div>
                    <div class="erase">
                        <img class="icon" class="icon" src="../../assets/icon/icons8-esvaziar-o-carrinho-de-compras-100.png" alt="Apagar">
                        <a href="#">Apagar</a>
                    </div>
                    <div class="save">
                        <img class="icon" class="icon" src="../../assets/icon/icons8-copas-100.png" alt="Salvar">
                        <a href="#">Salvar</a>
                    </div>
                </div>
                <hr />`
            )
        }
    }
}

getMyOrders();