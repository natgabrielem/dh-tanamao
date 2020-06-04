function novoItem(){
    const form = document.getElementsByClassName("form-total")[0];
    const div = document.createElement("div");
    div.innerHTML = `
        <label for="nome">Item</label>
        <input placeholder='Nome e Descrição' name="nome" class="descricao"></input>
        <label for="quantidade" id="campo">Quantidade</label>
        <input type="text" name="quantidade" class="qnt" value="1">
    `;
    div.className = 'form-group';
    form.appendChild(div)
}

