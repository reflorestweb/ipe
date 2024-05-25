document.addEventListener('DOMContentLoaded', function() {
    // Função para verificar se a senha é forte o suficiente
    function senhaForte(senha) {
        const minLength = 8;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return senha.length >= minLength && regex.test(senha);
    }

    // Mostrar dica de senha ao focar e desfocar do campo de senha
    function mostrarDicaSenha(input, hint) {
        input.addEventListener('focus', function() {
            hint.style.display = 'block';
        });
        input.addEventListener('blur', function() {
            hint.style.display = 'none';
        });
    }

    // Manipulação do formulário de cadastro
    const cadastroForm = document.querySelector('#cadastroForm');
    if (cadastroForm) {
        const senhaInputCadastro = cadastroForm.querySelector('input[name="senha"]');
        const passwordHintCadastro = document.querySelector('#passwordHintCadastro');
        mostrarDicaSenha(senhaInputCadastro, passwordHintCadastro);

        cadastroForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nomeInput = cadastroForm.querySelector('input[name="nome"]');
            const emailInput = cadastroForm.querySelector('input[name="email"]');
            const senhaInput = cadastroForm.querySelector('input[name="senha"]');
            const confirmarSenhaInput = cadastroForm.querySelector('input[name="confirmarSenha"]');

            // Validação dos campos do formulário
            if (nomeInput.value.trim() === '') {
                alert('Por favor, insira seu nome.');
                return;
            }

            if (emailInput.value.trim() === '') {
                alert('Por favor, insira seu email.');
                return;
            }

            if (senhaInput.value.trim() === '') {
                alert('Por favor, insira sua senha.');
                return;
            }

            if (!senhaForte(senhaInput.value)) {
                alert('A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas e minúsculas, números e caracteres especiais.');
                return;
            }

            if (confirmarSenhaInput.value.trim() === '') {
                alert('Por favor, confirme sua senha.');
                return;
            }

            if (senhaInput.value !== confirmarSenhaInput.value) {
                // Adiciona uma classe CSS para indicar que as senhas não coincidem
                senhaInput.classList.add('senha-nao-coincide');
                confirmarSenhaInput.classList.add('senha-nao-coincide');
                return;
            }

            // Se as senhas coincidirem, remove a classe CSS de senha não coincidente (se existir)
            senhaInput.classList.remove('senha-nao-coincide');
            confirmarSenhaInput.classList.remove('senha-nao-coincide');

            // Aqui você poderia exibir uma mensagem de confirmação ou redirecionar o usuário para outra página
            alert('Conta criada com sucesso! Você será redirecionado para a página de login.');

            // Redireciona o usuário para a página de login após criar a conta
            window.location.href = '/Login/cadastro/index.html';
        });
    }

    // Manipulação do formulário de login
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        const senhaInputLogin = loginForm.querySelector('input[type="password"]');
        const passwordHintLogin = document.querySelector('#passwordHintLogin');
        mostrarDicaSenha(senhaInputLogin, passwordHintLogin);

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nomeInput = loginForm.querySelector('input[type="text"]');
            const emailInput = loginForm.querySelector('input[type="email"]');
            const senhaInput = loginForm.querySelector('input[type="password"]');

            // Validação dos campos do formulário
            if (nomeInput.value.trim() === '') {
                alert('Por favor, insira seu nome.');
                return;
            }

            if (emailInput.value.trim() === '') {
                alert('Por favor, insira seu email.');
                return;
            }

            if (senhaInput.value.trim() === '') {
                alert('Por favor, insira sua senha.');
                return;
            }

            // Redireciona o usuário para a página do dashboard após fazer login
            window.location.href = '/dashboard.html';
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const carrinho = [];

    // Função para adicionar item ao carrinho
    window.adicionarAoCarrinho = () => {
        const select = document.getElementById("plantas");
        const selectedOptions = Array.from(select.selectedOptions);

        selectedOptions.forEach(option => {
            const itemExistente = carrinho.find(item => item.nome === option.value);
            if (itemExistente) {
                itemExistente.quantidade += 1;
            } else {
                carrinho.push({ nome: option.value, quantidade: 1 });
            }
        });

        atualizarCarrinho();
    };

    // Função para remover item do carrinho
    window.removerDoCarrinho = (itemNome) => {
        const itemIndex = carrinho.findIndex(item => item.nome === itemNome);
        if (itemIndex !== -1) {
            carrinho.splice(itemIndex, 1);
        }
        atualizarCarrinho();
    };

    // Função para atualizar a quantidade de um item no carrinho
    window.atualizarQuantidade = (itemNome, novaQuantidade) => {
        const item = carrinho.find(item => item.nome === itemNome);
        if (item) {
            item.quantidade = parseInt(novaQuantidade, 10) || 0;
            if (item.quantidade <= 0) {
                removerDoCarrinho(itemNome);
            } else {
                atualizarCarrinho();
            } 
        }
    };

    // Função para atualizar a exibição do carrinho
    const atualizarCarrinho = () => {
        const carrinhoContainer = document.getElementById("carrinho");
        carrinhoContainer.innerHTML = "";

        carrinho.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.nome}
                <input type="number" value="${item.quantidade}" min="1" onchange="atualizarQuantidade('${item.nome}', this.value)">
                <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
            `;
            carrinhoContainer.appendChild(li);
        });
    };
});
