function novoItem(){
    const form = document.getElementsByClassName("formulario")[0];
    const div = document.createElement("div");
    div.innerHTML = `
        <label for="desc" class="descr">Item</label>
        <input type="text" name="nome" class="campo">
        <label for="campo">Descrição</label>
        <textarea name="campo" cols="22" id="form1" rows="3" class="campo"></textarea>
        <label for="nome" id="campo">Quantidade</label>
        <input type="text" name="nome" class="campo-qtd">
    `;
    div.className = 'form-group';
    form.appendChild(div)
}

