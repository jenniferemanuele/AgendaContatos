let editingContactIndex = -1;

function adicionarContato() {
    // Obter valores dos campos de entrada
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;

    // Validação dos campos de entrada
    if (nome.trim() === '' || telefone.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const regexNumeroTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;

    if (regexNumeroTelefone.test(telefone) === false) {
        alert('Por favor, insira um número de telefone válido no formato (XX) XXXXX-XXXX');
        return;
    }

    const listaContatos = document.getElementById('lista-contatos');

    if (editingContactIndex === -1) {
        // Criar novo elemento <li> para o contato
        const novoContato = document.createElement('li');
        novoContato.innerHTML = '<span>' + nome + '</span>: ' + telefone;

        const editarLink = document.createElement('a');
        editarLink.href = '#';
        editarLink.innerText = 'Editar';
        editarLink.onclick = function() {
            exibirDialogEdicao(nome, telefone, listaContatos, novoContato);
        };
        novoContato.appendChild(editarLink);

        const removerLink = document.createElement('a');
        removerLink.href = '#';
        removerLink.innerText = 'Remover';
        removerLink.className = 'remove-button';
        removerLink.onclick = function() {
            removerContato(novoContato);
        };
        novoContato.appendChild(removerLink);

        // Adicionar o novo contato à lista de contatos
        listaContatos.appendChild(novoContato);
    } else {
        const contatoEditado = listaContatos.childNodes[editingContactIndex];
        contatoEditado.innerHTML = '<span>' + nome + '</span>: ' + telefone;

        const editarLink = document.createElement('a');
        editarLink.href = '#';
        editarLink.innerText = 'Editar';
        editarLink.onclick = function() {
            exibirDialogEdicao(nome, telefone, listaContatos, contatoEditado);
        };
        contatoEditado.appendChild(editarLink);

        editingContactIndex = -1;
    }

    // Limpar os campos de entrada
    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';

    // Ordenar a lista de contatos em ordem alfabética
    ordenarContatos();
}

function exibirDialogEdicao(nome, telefone, listaContatos, contato) {
    editingContactIndex = Array.from(listaContatos.childNodes).indexOf(contato);

    document.getElementById('edit-nome').value = nome;
    document.getElementById('edit-telefone').value = telefone;

    const dialog = document.getElementById('edit-dialog');
    dialog.style.display = 'block';
}

function fecharDialogEdicao() {
    editingContactIndex = -1;
    document.getElementById('edit-dialog').style.display = 'none';
}

function salvarEdicao() {
    const novoNome = document.getElementById('edit-nome').value;
    const novoTelefone = document.getElementById('edit-telefone').value;

    if (novoNome.trim() === '' || novoTelefone.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const regexNumeroTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;

    if (regexNumeroTelefone.test(novoTelefone) === false) {
        alert('Por favor, insira um número de telefone válido no formato (XX) XXXXX-XXXX.');
        return;
    }

    const listaContatos = document.getElementById('lista-contatos');
    const contatoEditado = listaContatos.childNodes[editingContactIndex];
    contatoEditado.innerHTML = '<span>' + novoNome + '</span>: ' + novoTelefone;

    const editarLink = document.createElement('a');
    editarLink.href = '#';
    editarLink.innerText = 'Editar';
    editarLink.onclick = function() {
        exibirDialogEdicao(novoNome, novoTelefone, listaContatos, contatoEditado);
    };
    contatoEditado.appendChild(editarLink);

    editingContactIndex = -1;
    fecharDialogEdicao();
}

function removerContato(contato) {
    if (confirm('Tem certeza de que deseja remover este contato?')) {
        const listaContatos = document.getElementById('lista-contatos');
        listaContatos.removeChild(contato);
    }
}

function ordenarContatos() {
    const listaContatos = document.getElementById('lista-contatos');
    const contatos = Array.from(listaContatos.getElementsByTagName('li'));

    contatos.sort(function(a, b) {
        const nomeA = a.firstChild.innerText.toLowerCase();
        const nomeB = b.firstChild.innerText.toLowerCase();
        if (nomeA < nomeB) return -1;
        if (nomeA > nomeB) return 1;
        return 0;
    });

    listaContatos.innerHTML = '';
    contatos.forEach(function(contato) {
        listaContatos.appendChild(contato);
    });
} 

function pesquisarContatos() {
    const inputPesquisa = document.getElementById('pesquisa');
    const termoPesquisa = inputPesquisa.value.toLowerCase();
    const listaContatos = document.getElementById('lista-contatos');
    const contatos = Array.from(listaContatos.getElementsByTagName('li'));

    contatos.forEach(function(contato) {
        const nomeContato = contato.firstChild.innerText.toLowerCase();
        if (nomeContato.includes(termoPesquisa)) {
            contato.style.display = 'block';
        } else {
            contato.style.display = 'none';
        }
    });
}
