document.addEventListener('DOMContentLoaded', () => {
    const botaoAdicionar = document.querySelector("#botao-adicionar");
    const botaoRemover = document.querySelector("#botao-remover");
    const modalAdicionar = document.querySelector('#modal-adicionar');
    const modalRemover = document.querySelector('#modal-remover');
    const fecharModalAdicionar = document.querySelector('#fechar-modal');
    const fecharModalRemover = document.querySelector('#fechar-modal-remover');
    const formAdicionarCliente = document.querySelector('#form-adicionar-cliente');
    const formRemoverCliente = document.querySelector('#form-remover-cliente');
    const tabelaBody = document.querySelector('#tabela-registro tbody');

    function salvarDadosLocalStorage(clientes) {
        localStorage.setItem('clientes', JSON.stringify(clientes));
    }

    function carregarDadosLocalStorage() {
        return JSON.parse(localStorage.getItem('clientes')) || [];
    }

    function gerarNovoId(clientes) {
        const ids = clientes.map(cliente => cliente.id);
        const idsDisponiveis = [];

        for (let i = 1; i <= ids.length + 1; i++) {
            if (!ids.includes(i)) {
                idsDisponiveis.push(i);
            }
        }

        if (idsDisponiveis.length > 0) {
            return idsDisponiveis[0];
        } else {
            return ids.length + 1;
        }
    }

    function renderizarTabela() {
        const clientes = carregarDadosLocalStorage();

        clientes.sort((a, b) => a.id - b.id);

        tabelaBody.innerHTML = '';

        clientes.forEach(cliente => {
            const novaLinha = tabelaBody.insertRow();
            novaLinha.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.idade}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.cidade}</td>
                <td>${cliente.id}</td>
            `;
        });
    }

    botaoAdicionar.addEventListener('click', () => {
        modalAdicionar.style.display = 'block';
    });

    botaoRemover.addEventListener('click', () => {
        modalRemover.style.display = 'block';
    });

    fecharModalAdicionar.addEventListener('click', () => {
        modalAdicionar.style.display = 'none';
    });

    fecharModalRemover.addEventListener('click', () => {
        modalRemover.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modalAdicionar) {
            modalAdicionar.style.display = 'none';
        }
        if (event.target === modalRemover) {
            modalRemover.style.display = 'none';
        }
    });

    formAdicionarCliente.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.querySelector('#nome').value;
        const idade = document.querySelector('#idade').value;
        const telefone = document.querySelector('#telefone').value;
        const cidade = document.querySelector('#cidade').value;

        const clientes = carregarDadosLocalStorage();

        const novoId = gerarNovoId(clientes);

        clientes.push({ nome, idade, telefone, cidade, id: novoId });

        salvarDadosLocalStorage(clientes);

        renderizarTabela();

        modalAdicionar.style.display = 'none';
        formAdicionarCliente.reset();
    });

    formRemoverCliente.addEventListener('submit', (event) => {
        event.preventDefault();

        const opcao = document.querySelector('#opcao-remover').value;
        const valor = document.querySelector('#valor-remover').value;

        let clientes = carregarDadosLocalStorage();

        if (opcao === 'nome') {
            clientes = clientes.filter(cliente => cliente.nome.toLowerCase() !== valor.toLowerCase());
        } else if (opcao === 'id') {
            clientes = clientes.filter(cliente => cliente.id !== parseInt(valor, 10));
        }

        salvarDadosLocalStorage(clientes);

        renderizarTabela();

        modalRemover.style.display = 'none';
        formRemoverCliente.reset();
    });

    const botaoAtualizar = document.querySelector("#botao-atualizar");
    const modalAtualizar = document.querySelector('#modal-atualizar');
    const fecharModalAtualizar = document.querySelector('#fechar-modal-atualizar');
    const formAtualizarCliente = document.querySelector('#form-atualizar-cliente');

    botaoAtualizar.addEventListener('click', () => {
        modalAtualizar.style.display = 'block';
    });

    fecharModalAtualizar.addEventListener('click', () => {
        modalAtualizar.style.display = 'none';
    });

    formAtualizarCliente.addEventListener('submit', (event) => {
        event.preventDefault();

        const id = parseInt(document.querySelector('#id-atualizar').value, 10);
        const nome = document.querySelector('#nome-atualizar').value;
        const idade = document.querySelector('#idade-atualizar').value;
        const telefone = document.querySelector('#telefone-atualizar').value;
        const cidade = document.querySelector('#cidade-atualizar').value;

        let clientes = carregarDadosLocalStorage();
        const clienteIndex = clientes.findIndex(cliente => cliente.id === id);

        if (clienteIndex !== -1) {
            // Atualiza as informações do cliente
            if (nome) clientes[clienteIndex].nome = nome;
            if (idade) clientes[clienteIndex].idade = idade;
            if (telefone) clientes[clienteIndex].telefone = telefone;
            if (cidade) clientes[clienteIndex].cidade = cidade;

            salvarDadosLocalStorage(clientes);
            renderizarTabela();
        } else {
            alert('Cliente não encontrado.');
        }

        modalAtualizar.style.display = 'none';
        formAtualizarCliente.reset();
    });


    renderizarTabela();
});
