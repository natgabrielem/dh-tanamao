// cd 6.Requisito
// json-server --watch db.json 
const url = 'http://localhost:3000/data';

async function sendRequest(e) {
    e.preventDefault();

    const user_cpf = localStorage.getItem('cpf');

    let descs = document.querySelectorAll('.descricao');
    let qnts = document.querySelectorAll('.qnt');
    var user_pedido = [];
    for (i=0; i<= descs.length-1; i++){
        var desc = descs[i].value;
        var qnt = qnts[i].value;
        user_pedido.push({descricao: desc, quantidade: qnt});
    }

    const user_address = localStorage.getItem('endereco');
    const user_cep = localStorage.getItem('cep');
    const gorj = document.querySelector('input[name=gorjeta]:checked').value;
    const pag = document.querySelector('input[name=pagamento]:checked').value;
    const user_name = localStorage.getItem("nome");
    
    const objeto = {
        cpf: user_cpf,
        pedido: user_pedido,
        endereco: user_address,
        cep: user_cep,
        gorjeta: gorj,
        finalizado: false,
        pagamento: pag,
        nome: user_name
    }

    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: new Headers(
            {
                'Content-Type': 'application/json'
            }
        )
    })

    const response = await fetch(request);
}