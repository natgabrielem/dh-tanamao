function novoItem(){
    const form = document.getElementsByClassName("formulario")[0];
    const div = document.createElement("div");
    div.innerHTML = `
        <label for="desc" class="descr">Item</label>
        <label for="campo">Descrição</label>
        <textarea placeholder='Descrição' name="campo" cols="50" class="descricao" rows="3"
            class="campo"></textarea>
        <label for="nome" id="campo">Quantidade</label>
        <input placeholder="Qnt." type="text" name="nome" class="campo-qtd qnt">
    `;
    div.className = 'form-group';
    form.appendChild(div)
}

