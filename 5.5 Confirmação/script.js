const root = document.querySelector("#root");

const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);

const productID = URLParams.get('id');

const PROD_URL = `https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/products/${productID}`;

async function getData() {
    let response = await fetch(PROD_URL).then(res => res.json());
    let product = response.product;
    
    const { pedido, cpf, nomeUser } = product;

    const USER_URL = `https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/accounts?cpf=${cpf}`;

    let user = await fetch(USER_URL).then(res => res.json());

    let pedidosArr = pedido.split('/');
    let pedidosStr = `<div class="order-description">`;

    let tel = (user.accounts[0].telefone).toString();
    let telefone = `(${tel.substring(0,2)}) ${tel.substring(2, tel.length)}`;

    for (let i = 1; i < pedidosArr.length; i += 2) {
        pedidosStr += `<h3>` + pedidosArr[i - 1] + ` | Qnt. ` + pedidosArr[i] + `</h3>`;
    }

    root.insertAdjacentHTML('afterbegin', 
        `<div class="pedido">
            ${pedidosStr}
        </div>
        <div class="whats">
            <a target="_blanket" href="https://api.whatsapp.com/send?phone=${user.accounts[0].telefone}">
                <h3>Entrar em contato com ${nomeUser}</h3>
                <div id="whatsRow">
                    <img src="../assets/icon/icons8-whatsapp-100.png">
                    <p>${telefone}</p>
                </div>
            </a>
        </div>`
    )
}

getData();

        /* <div class="row">
            <h3>Qual o valor?</h3>
            <input placeholder="Quant." type="text" name="Quantidade" id="Quant">
        </div>
        <div class="row">
            <img class="delete" src="../assets/icon/icons8-esvaziar-o-carrinho-de-compras-100.png">
            <h3>Item indisponível</h3>
        </div> */