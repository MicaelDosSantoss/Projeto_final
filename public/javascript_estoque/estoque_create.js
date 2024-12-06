const createLocalizacao = async () => {
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
        const response = await fetch('/estoque/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.Message === "criado com sucesso!") {
            appendAlert("Criado com sucesso!", "success");
            setTimeout(() => {
                window.location.href = "/estoque?created=true"; // Redireciona após 2 segundos
            }, 2000);
        } else {
            console.error('Erro ao criar ala:', result.Message);
        }
    } catch (error) {
        console.error('Erro ao realizar a requisição POST:', error);
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