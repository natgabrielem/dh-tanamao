const submitBtn = document.getElementById('entrar');

submitBtn.addEventListener('click', logIn);

async function logIn() {
    const email = document.getElementById('user');
    const password = document.getElementById('password');
    const keepLogged = document.getElementById('mantConect');

    const EMAIL_URL = `https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/accounts?email=${email.value}`;
    const PASS_URL = `https://v2-api.sheety.co/fb4178391bf957b00e2366c59a397b7c/dbTanamao/accounts?senha=${password.value}`;

    const res1 = await fetch(EMAIL_URL).then(res => res.json());
    const res2 = await fetch(PASS_URL).then(res => res.json());

    const temp1 = res1.accounts[0];
    const temp2 = res2.accounts[0];

    if (temp1 == null || temp2 == null) {
        return alert('Dados incorretos');
    }

    const id1 = temp1.id;
    const id2 = temp2.id;

    if (id1 != id2) {
        return alert('Dados incorretos');
    }

    if (id1 === id2) {
        const cpf = temp1.cpf;
        localStorage.setItem('cpf', cpf);
        localStorage.setItem('id', id1);
        window.location.replace('./2.Menu/menu.html');
    }

    if (keepLogged.value === 'on') {
        localStorage.setItem('password', password.value);   
    }
}