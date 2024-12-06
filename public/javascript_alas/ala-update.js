const updateAla = async (id) => {
    // Garantir que os elementos de input existem antes de tentar acessá-los
    const Prateleira = document.getElementById("Prateleira");
    const Secao = document.getElementById("Secao");
 

    const data = {
        Prateleira: Prateleira.value,
        Secao: Secao.value,
    };

    try {
        const response = await fetch(`/ala/update/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.Message === "Atualizado com sucesso!") {
            appendAlert("Atualizado com sucesso!!", "success");
            setTimeout(() => {
                window.location.href = "/ala?created=true"; // Redireciona após 2 segundos
            }, 2000);
        } else {
            console.error('Erro ao atualizar ala:', result.Message);
        }
    } catch (error) {
        console.error('Erro ao realizar a requisição PUT:', error);
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
        window.location.href = "/ala"
    }, 2000); // 2000ms = 2 segundos
};