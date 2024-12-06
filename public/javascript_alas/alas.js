const deleteAlas = async (id) => {
    try {
        const response = await fetch(`/ala/delete/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        console.log(data)
        // Verifique se a exclusão foi bem-sucedida
        if (data.deleted) {
            // Adiciona o parâmetro de consulta e recarrega a página
            window.location.href = "/ala?deleted=true"; // Recarrega a página com o parâmetro 'deleted=true'
        } else {
            console.error('Erro ao deletar ala:', data.message);
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
            
            appendAlert("Ala deletada com sucesso!", "success");
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
        window.location.href = "/ala"
    }, 2000); // 2000ms = 2 segundos
};