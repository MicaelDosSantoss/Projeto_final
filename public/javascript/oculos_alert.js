
//#region CREATE
const createOculos = async () => {
    // Garantir que os elementos de input existem antes de tentar acessá-los
    const material = document.getElementById("material");
    const tamanho = document.getElementById("tamanho");
    const genero = document.getElementById("genero");
    const marca = document.getElementById("marca");
    const forma = document.getElementById("forma");
    const valor = document.getElementById("valor");


    const valor_form = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor.value);

    const data = {
        Material: material.value,
        Tamanho: tamanho.value,
        Genero: genero.value,
        Marca: marca.value,
        Forma: forma.value,
        Valor: valor_form
    };

    try {
        const response = await fetch('/oculos', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.Message === "Oculos cadastrado com sucesso!") {
            appendAlert("Óculos cadastrado com sucesso!", "success");
            setTimeout(() => {
                window.location.href = "/oculos?created=true"; // Redireciona após 2 segundos
            }, 2000);
        } else {
            console.error('Erro ao criar óculos:', result.Message);
        }
    } catch (error) {
        console.error('Erro ao realizar a requisição POST:', error);
    }
};
//#endregion

//#region DELETE

//#region UPDATE




//#endregion

 const deleteOculos = async (id) => {
    try {
        const response = await fetch(`/oculos/delete/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        // Verifique se a exclusão foi bem-sucedida
        if (data.deleted) {
            // Adiciona o parâmetro de consulta e recarrega a página
            window.location.href = "/oculos?deleted=true"; // Recarrega a página com o parâmetro 'deleted=true'
        } else {
            console.error('Erro ao deletar óculos:', data.message);
        }
    } catch (error) {
        console.error('Erro ao realizar a requisição DELETE:', error);
    }
};

// Garantir que o DOM foi carregado antes de manipular elementos
document.addEventListener("DOMContentLoaded", function() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    
    // Verificar se o parâmetro 'deleted=true' está na URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('deleted') && urlParams.get('deleted') === 'true') {
        if (alertPlaceholder) {
            
            appendAlert("Óculos deletado com sucesso!", "success");
        }
    }
});

//#endregion


// Função para criar e adicionar o alerta ao DOM
const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '</div>'
    ].join('');

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    if (alertPlaceholder) {
        alertPlaceholder.append(wrapper);
    }

    setTimeout(() => {
        wrapper.remove(); // Remove the alert element from the DOM after 2 seconds
        window.location.href = "/oculos"
    }, 2000); // 2000ms = 2 segundos
};