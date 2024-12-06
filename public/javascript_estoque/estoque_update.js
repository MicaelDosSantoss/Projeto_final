const updateLocalizacao = async (id) => {
    // Garantir que os elementos de input existem antes de tentar acessá-los
    const Id_oculos = document.getElementById("Id_oculos");
    const Id_Ala = document.getElementById("Id_Ala");
    const status = document.getElementById("status");

    const data = {
        Id_oculos: Id_oculos.value,
        Id_Ala: Id_Ala.value,
        status: status.value
    };

    try {
        // Corrigir a URL da requisição PUT
        const response = await fetch(`/estoque/update/${id}`, {  // Remover o prefixo extra "estoque/update/"
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Verificar se a resposta é válida
        if (!response.ok) {
            // Se a resposta não for 2xx, logue o erro
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const result = await response.json();  // Converter resposta para JSON

        if (result.Message === "Atualizado com sucesso!") {
            appendAlert("Atualizado com sucesso!", "success");
            setTimeout(() => {
                window.location.href = "/estoque?updated=true";  // Redireciona após 2 segundos
            }, 2000);
        } else {
            console.error('Erro ao atualizar:', result.Message);
            appendAlert("Erro ao atualizar", "danger");
        }
    } catch (error) {
        console.error('Erro ao realizar a requisição PUT:', error);
        appendAlert("Erro na requisição", "danger");
    }
};

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
        window.location.href = "/estoque"
    }, 2000); // 2000ms = 2 segundos
};
