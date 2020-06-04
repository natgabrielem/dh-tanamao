const submitBtn = document.getElementById('buttonData');

const ACCOUNTS_URL = `https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/accounts`;

submitBtn.addEventListener('click', submitUserData);

async function submitUserData(ev) {
    ev.preventDefault();

    const nome = `${document.getElementById('name').value} ${document.getElementById('lastName').value}`;
    const cpf = `${document.getElementById('CPF').value}`;
    const cep = `${document.getElementById('CEP').value}`;
    const endereco = `${document.getElementById('address').value} ${document.getElementById('number').value} ${document.getElementById('complement').value} ${document.getElementById('city').value}`;
    const telefone = `${document.getElementById('phone').value}`;
    const email = `${document.getElementById('email').value}`
    const senha = `${document.getElementById('password').value}`

    const data = {
        nome: nome,
        cpf: cpf,
        cep: cep,
        endereco: endereco,
        telefone: telefone,
        email: email,
        senha: senha,
    }

    const submit = {
        account: data
    }

    fetch(ACCOUNTS_URL, {
        method: "POST",
        body: JSON.stringify(submit),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then((res) => {
        window.location.replace("../index.html");
    })
}