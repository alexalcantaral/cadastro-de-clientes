document.addEventListener('DOMContentLoaded', () => {
    const botaoAdicionar = document.querySelector("#botao-adicionar");
    const modalAdicionar = document.querySelector('#modal-adicionar');
    const fecharModalAdicionar = document.querySelector('#fechar-modal');
    const formAdicionarCliente = document.querySelector('#form-adicionar-cliente');
    const tabelaBody = document.querySelector('#tabela-registro tbody');

    const botaoRemover = document.querySelector("#botao-remover");
    const modalRemover = document.querySelector('#modal-remover');
    const fecharModalRemover = document.querySelector('#fechar-modal-remover');
    const formRemoverCliente = document.querySelector('#form-remover-cliente');

    function salvarDadosLocalStorage(clientes) {
        localStorage.setItem('clientes', JSON.stringify(clientes));
    }

    function carregarDadosLocalStorage() {
        return JSON.parse(localStorage.getItem('clientes')) || [];
    }

    function renderizarTabela() {
        const clientes = carregarDadosLocalStorage();
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

    // Abertura e fechamento do modal de adicionar
    botaoAdicionar.addEventListener('click', () => {
        modalAdicionar.style.display = 'block';
    });

    fecharModalAdicionar.addEventListener('click', () => {
        modalAdicionar.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modalAdicionar) {
            modalAdicionar.style.display = 'none';
        }
    });

    // Submissão do formulário de adicionar cliente
    formAdicionarCliente.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.querySelector('#nome').value;
        const idade = document.querySelector('#idade').value;
        const telefone = document.querySelector('#telefone').value;
        const cidade = document.querySelector('#cidade').value;
        const id = document.querySelector('#id').value;

        const clientes = carregarDadosLocalStorage();

        clientes.push({ nome, idade, telefone, cidade, id });

        salvarDadosLocalStorage(clientes);

        renderizarTabela();

        modalAdicionar.style.display = 'none';
        formAdicionarCliente.reset();
    });

    // Abertura e fechamento do modal de remover
    botaoRemover.addEventListener('click', () => {
        modalRemover.style.display = 'block';
    });

    fecharModalRemover.addEventListener('click', () => {
        modalRemover.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modalRemover) {
            modalRemover.style.display = 'none';
        }
    });

    // Submissão do formulário de remover cliente
    formRemoverCliente.addEventListener('submit', (event) => {
        event.preventDefault();

        const tipoRemover = document.querySelector('#opcao-remover').value;
        const valorRemover = document.querySelector('#valor-remover').value.trim();
        let clientes = carregarDadosLocalStorage();

        if (tipoRemover === 'nome') {
            const clientesFiltrados = clientes.filter(cliente => cliente.nome.toLowerCase() !== valorRemover.toLowerCase());

            if (clientesFiltrados.length === clientes.length) {
                alert('Nenhum cliente encontrado com esse nome.');
            } else {
                clientes = clientesFiltrados;
                salvarDadosLocalStorage(clientes);
                renderizarTabela();
                alert(`Cliente com nome "${valorRemover}" removido com sucesso!`);
            }
        } else if (tipoRemover === 'id') {
            const clientesFiltrados = clientes.filter(cliente => cliente.id !== valorRemover);

            if (clientesFiltrados.length === clientes.length) {
                alert('Nenhum cliente encontrado com esse ID.');
            } else {
                clientes = clientesFiltrados;
                salvarDadosLocalStorage(clientes);
                renderizarTabela();
                alert(`Cliente com ID "${valorRemover}" removido com sucesso!`);
            }
        }

        modalRemover.style.display = 'none';
        formRemoverCliente.reset();
    });

    renderizarTabela();
});
