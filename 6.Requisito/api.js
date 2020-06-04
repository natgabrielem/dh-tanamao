// cd 6.Requisito
// json-server --watch db.json 
// http://localhost:3000/data
// https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/products
const modal = document.querySelector('#my-modal');
const closeBtn = document.querySelector('.close');
const modalTxt = document.querySelector('.modal-txt');

const user_cpf = localStorage.getItem('cpf');
const PROD_URL = 'https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/products';
const USER_URL = `https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/accounts?cpf=${user_cpf}`;

var user = {};

async function sendRequest(e) {
    e.preventDefault();

    let descs = document.querySelectorAll('.descricao');
    let qnts = document.querySelectorAll('.qnt');

    var user_pedido = false;
    for (i=0; i<= descs.length-1; i++){
        var desc = descs[i].value;
        var qnt = qnts[i].value;
        if (user_pedido == false){
            user_pedido = `${desc}/${qnt}/`
        } else{
            user_pedido += `${desc}/${qnt}/`
        }
    }

    user_pedido = user_pedido.substring(0, user_pedido.length - 1);

    const gorj = document.querySelector('input[name=gorjeta]:checked').value;
    const pag = document.querySelector('input[name=pagamento]:checked').value;

    const objeto = {
        product: {
            cpf: user_cpf,
            pedido: user_pedido,
            endereco: user.endereco,
            cep: user.cep,
            gorjeta: gorj,
            finalizado: false,
            pagamento: pag,
            nomeUser: user.nome,
            favorito: false
        }
    }

    const request = new Request(PROD_URL, {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: new Headers(
            {
                'Content-Type': 'application/json'
            }
        )
    })

    const response = await fetch(request).catch(() => {
        modalTxt.style.color = "red";
        modalTxt.innerHTML = "Ocorreu um erro!";
        openModal();
        setTimeout(closeModal, 5000);
    });

    if (response.status === 200) {
        openModal();
        setTimeout(closeModal, 5000);
    }
}

async function getUserData() {
    const USER_DATA = await fetch(USER_URL).then(res => res.json());

    user.nome = USER_DATA.accounts[0].nome;
    user.endereco = USER_DATA.accounts[0].endereco;
    user.cep = USER_DATA.accounts[0].cep;
}

getUserData();




// Events
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}