function validaCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    let digit = remainder < 2 ? 0 : 11 - remainder;

    if (digit !== parseInt(cpf.charAt(9))) {
        return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    digit = remainder < 2 ? 0 : 11 - remainder;

    if (digit !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

function validaCEP(cep) {
    cep = cep.replace(/\D/g, '');

    if (cep.length !== 8) {
        return false;
    }

    return true;
}

document.getElementById('formulariocadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const cep = document.getElementById('cep').value;

    if (!validaCPF(cpf)) {
        alert('CPF inválido');
        return;
    }

    if (!validaCEP(cep)) {
        alert('CEP inválido');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            alert('Erro ao buscar informações do CEP. Por favor, tente novamente mais tarde.');
        });

    alert('Formulário enviado com sucesso!');
});
