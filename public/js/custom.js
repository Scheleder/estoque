function deleteSale(id) {
    if (confirm("Deseja excluir a Venda?")) {
        window.location.assign("/sale/remove/" + id);
    }
}
function deleteProduct(id) {
    if (confirm("Deseja excluir o Produto?")) {
        window.location.assign("/product/remove/" + id);
    }
}

function deletePayment(id) {
    if (confirm("Deseja excluir o Pagamento?")) {
        window.location.assign("/payment/remove/" + id);
    }
}

function deleteClient(id) {
    if (confirm("Deseja excluir o Cliente?")) {
        window.location.assign("/client/remove/" + id);
    }
}

function editValuePix(id) {
    let value = prompt("Novo valor: R$ ");
    var newValue = value.replace(/[^0-9.,]/g, '').replace(',', '.');
    parseFloat(newValue);
    if (newValue > 0) {
        location = '/client/' + id + '?pix=' + newValue;
    }
}

function editValuePayment(id) {
    let value = prompt("Novo valor: ");
    var newValue = value.replace(/[^0-9.,]/g, '').replace(',', '.');
    parseFloat(newValue);
    if (newValue > 0) {
        window.location.assign("/payment/update/" + id + "," + newValue);
    }
}

function editValueSale(id) {
    let value = prompt("Novo valor: ");
    var newValue = value.replace(/[^0-9.,]/g, '').replace(',', '.');
    parseFloat(newValue);
    if (newValue > 0) {
        window.location.assign("/sale/update/" + id + "," + newValue);
    }
}
function selecionarCliente(id) {
    if (id) {
        location = '/client/' + id;
    }
}

function tipoVenda(produtos, client) {
    if (produtos) {
        location = '/sale/new/' + client;
    }
}

function view(id) {
    window.location.assign("/product/" + id);
}

function editSale(id) {
    window.location.assign("/sale/edit/" + id);
}

function openSale(id) {
    window.location.assign("/sale/" + id);
}

function formatPhone (input, index) {
    const element = document.getElementById(index);
    const phone = input.toString();
    const whats = ' (' + phone.substr(0, 2) + ') ' + phone.substr(2, 5) + ' ' + phone.substr(7, 4);
    element.textContent = whats;
}

function handlePhone (event) {
    let input = event.target
    input.value = phoneMask(input.value)
}

function phoneMask (value) {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
}

function formatCPF (input) {
    const element = document.getElementById('cpf');
    const cpf = input.toString();
    const formated = cpf.substr(0, 3) + '.' + cpf.substr(3, 3) + '.' + cpf.substr(6, 3) + '-' + cpf.substr(9,
    2);
    element.value = formated;
}

function handleCPF (value) {
    let input = event.target
    input.value = cpfMask(input.value)
}

function cpfMask (value) {
    if (!value) return ""
    value = value.replace(/\D/g, "")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return value
}

function openWhats (number) {
    if (number == '') {
        alert("Não há número!");
        return;
    }
    const cellphoneNumber = number.toString();
    const formattedCellphoneNumber = cellphoneNumber.replace('(', '').replace(')', '').replace(' ', '').replace(
        '-', '')
    const url = `https://api.whatsapp.com/send?phone=55${formattedCellphoneNumber}`
    window.open(url, '_blank').focus()
}

$(document).ready(function() {
    $("#js-example-basic-single").select2({
        placeholder: "Pesquisar Clientes...",
        allowClear: true
    });
    $("#js-example-basic-single").val(null).trigger('change');
});

