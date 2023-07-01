function adicionarContato() {
    const nome = document.getElementById('nome').value;
    
    const telefone = document.getElementById('telefone').value;

    if (nome.trim() === '' || telefone.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const regexNumeroTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;

    if (regexNumeroTelefone.test(telefone) === false) {
        alert('Por favor, insira um número de telefone válido no formato (XX) XXXXX-XXXX.');
        return;
    }   

    const listaContatos = document.getElementById('lista-contatos');

    const novoContato = document.createElement('li');

    novoContato.innerHTML = '<span>' + nome + '</span>: ' + telefone;
    
    listaContatos.appendChild(novoContato);

    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';
}
