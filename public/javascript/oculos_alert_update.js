const update = async (oculosId) => {
    const material = document.getElementById('material').value;
    const tamanho = document.getElementById('tamanho').value;
    const marca = document.getElementById('marca').value;
    const genero = document.getElementById('genero').value;
    const forma = document.getElementById('forma').value;
    const valor = document.getElementById('valor').value;

    const updatedOculosData = {
        Material: material,
        Tamanho: tamanho,
        Marca: marca,
        Genero: genero,
        Forma: forma,
        Valor: valor
    };

    try {
        // Agora usamos 'await' para esperar a resposta da requisição
        const response = await fetch(`/oculos/update/${oculosId}`, {
            method: 'PUT',  // Método PUT
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(updatedOculosData) 
        });

        // Verifique se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro na requisição. Código de resposta: ' + response.status);
        }

        // Agora, parseia a resposta JSON
        const result = await response.json();

        if (result.Message === "Atualização feita com sucesso!") {
            appendAlert("Atualização feita com sucesso!", "success");
            setTimeout(() => {
                window.location.href = "/oculos?created=true"; // Redireciona após 2 segundos
            }, 2000);
        } else {
            appendAlert("Erro ao atualizar óculos: " + result.Message, "danger");
        }

    } catch (error) {
        // Tratar erros de requisição
        console.error('Erro ao realizar a requisição PUT:', error);
        appendAlert("Erro ao tentar atualizar os óculos.", "danger");
    }
};

// Função para exibir o alerta
const appendAlert = (message, type) => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    if (alertPlaceholder) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');
        alertPlaceholder.append(wrapper);

        setTimeout(() => {
            wrapper.remove();  // Remove o alerta após 3 segundos
        }, 3000);  // 3000ms = 3 segundos
    }
};
