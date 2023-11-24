const formJs = document.querySelector('.formJs');

formJs.addEventListener('submit', function (event) {
    event.preventDefault();

    let nome = document.getElementById('nome').value;
    let aniversario = document.getElementById('aniversario').value;

    console.log('Nome: ' + nome);
    console.log('Niver: ' + aniversario);
})

let campoNome = document.getElementById('nome');

campoNome.addEventListener('invalid', function (event) {
    if (campoNome.validity.valueMissing) {
        campoNome.setCustomValidity('Por favor, preencha o seu nome!');
    } else {
        campoNome.setCustomValidity('');
    }
});

let campoData = document.getElementById('aniversario');
campoData.addEventListener('invalid', function (event) {
    if (campoData.validity.valueMissing) {
        campoData.setCustomValidity('Por favor, preencha a data!');
    } else {
        campoData.setCustomValidity('');
    }
});


formJs.addEventListener('submit', function (event) {
    event.preventDefault();

    let nome = document.getElementById('nome').value;
    let aniversario = document.getElementById('aniversario').value;

    salvarLocalmente(nome, aniversario);

    exibirDados();
});

document.addEventListener('DOMContentLoaded', function() {
    exibirDados();
});

function salvarLocalmente(nome, aniversario) {
    let pessoa = {
        nome: nome,
        aniversario: aniversario
    };

    let pessoasSalvas = localStorage.getItem('pessoas');

    if (pessoasSalvas) {
        let pessoasArray = JSON.parse(pessoasSalvas);
        pessoasArray.push(pessoa);
        localStorage.setItem('pessoas', JSON.stringify(pessoasArray));
    } else {
        let novoArray = [pessoa];
        localStorage.setItem('pessoas', JSON.stringify(novoArray));
    }
}


function exibirDados() {
    let tabela = document.getElementById('tabela');
    tabela.innerHTML = '';

    let pessoasSalvas = localStorage.getItem('pessoas');

    if (pessoasSalvas) {
        let pessoasArray = JSON.parse(pessoasSalvas);

        let tabelaHTML = '<table border="1"><tr><th>Nome</th><th>Aniversário</th><th>Ações</th></tr>';

        pessoasArray.forEach(function (pessoa) {
            tabelaHTML += `<tr><td>${pessoa.nome}</td><td>${pessoa.aniversario}</td>
                <td><button class="formEditor">Editar</button></td>
                <td><button class="formRemove">Remover</button></td>
            </tr>`;
        });

        tabelaHTML += '</table>';
        tabela.innerHTML = tabelaHTML;
        adicionarBotoesEdicao();
        removeItemLista();
    }

    function adicionarBotoesEdicao() {
        const botoesEditar = document.querySelectorAll('.formEditor');

        botoesEditar.forEach(function(botao) {
            botao.addEventListener('click', function(event) {
                const linha = event.target.closest('tr');
                const rowData = Array.from(linha.querySelectorAll('td')).map(cell => cell.textContent);
                document.getElementById('nome').value = rowData[0];
                document.getElementById('aniversario').value = rowData[1];
            });
        });
    }

    function removeItemLista() {
        const botoesRemove = document.querySelectorAll('.formRemove');


        botoesRemove.forEach(function(botao) {
            botao.addEventListener('click', function(event) {
                let pessoasSalvas = localStorage.getItem('pessoas');
                const linha = botao.parentElement.parentElement;
                const nome = linha.firstChild.innerText;
                if (pessoasSalvas) {
                    let pessoasArray = JSON.parse(pessoasSalvas);
                    pessoasArray.forEach((obj, index) => {
                        if (obj.nome === nome) {
                            pessoasArray.splice(index, 1);
                            localStorage.setItem('pessoas', JSON.stringify(pessoasArray));
                            linha.remove();
                        }
                    })
                }
            });
        });
    }
}