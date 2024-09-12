const botaoAdicionar = document.querySelector("#botao-adicionar");
const botaoExibir = document.querySelector("#botao-exibir");
const botaoAtualizar = document.querySelector("#botao-atualizar");
const botaoRemover = document.querySelector("#botao-remover");
const selecionarOpcao = document.querySelector("#selecionar-opcao");
const buscarNome = document.querySelector("#buscar-nome");

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('#modal-adicionar');
    const fecharModal = document.querySelector('#fechar-modal');
    const formAdicionarCliente = document.querySelector('#form-adicionar-cliente');
    const tabelaBody = document.querySelector('#tabela-registro tbody');

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

    botaoAdicionar.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    fecharModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

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

        modal.style.display = 'none';
        formAdicionarCliente.reset();
    });

    renderizarTabela();
});
