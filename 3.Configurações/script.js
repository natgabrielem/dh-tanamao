const modal = document.querySelector('#my-modal');
const closeBtn = document.querySelector('.close');
const modalTxt = document.querySelector('.modal-txt');

const id = localStorage.getItem('id');

const ACCOUNTS_URL = `https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/accounts/${id}`;

const saveBtn = document.getElementById('buttonData');

saveBtn.addEventListener('click', editUserData);

function editUserData() {
    const nome = document.getElementById('name').value;
    const endereco = document.getElementById('adress').value;
    const telefone = document.getElementById('phone').value;
    const dinheiro = document.getElementById('dinheiro').checked;
    let payOpt = '';

    if (dinheiro) {
        payOpt = 'dinheiro';
    } else {
        payOpt = 'picpay';
    }

    let data = {
        account: {}
    }

    if (nome !== '') {
        data.account.nome = nome;
    }

    if (endereco !== '') {
        data.account.endereco = endereco;
    }
    
    if (telefone !== '') {
        data.account.telefone = telefone;
    }

    fetch(ACCOUNTS_URL, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then((res) => {
        if (res.status === 200) {
            openModal();
            setTimeout(closeModal, 5000);
        }
    }).catch(() => {
        modalTxt.style.color = "red";
        modalTxt.innerHTML = "Ocorreu um erro!";
        openModal();
        setTimeout(closeModal, 5000);
    })
}

// Events
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'flex';
  modal.style.alignItems = 'center'
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