const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const items = document.querySelectorAll('.item')
const dots = document.querySelectorAll('.dot')
const numberIndicator = document.querySelector('.numbers')
const list = document.querySelector('.list')

let active = 0;
const total = items.length
let timer;



function update(direction){
    document.querySelector('.item.active').classList.remove('active')
    document.querySelector('.dot.active').classList.remove('active')

    if(direction > 0){
        active = active + 1

        if(active === total){
            active = 0
        }
    } 
    
    else if(direction < 0){
        active = active -1

        if(active < 0){
            active = total -1
        }
    }

    items[active].classList.add('active')
    dots[active].classList.add('active')
}

clearInterval(timer)
    timer = setInterval(() =>{
        update(1)
    }, 4000);



prevButton.addEventListener('click', () => {
    update(-1)
})

nextButton.addEventListener('click', () => {
    update(1)
})





const formulario = document.getElementById("meuFormulario");
const mensagemStatus = document.getElementById("mensagemStatus");
const botaoEnviar = formulario.querySelector('input[type="submit"]');

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    botaoEnviar.disabled = true;
    botaoEnviar.value = "ENVIANDO...";
    mensagemStatus.textContent = "";

    try {
        const resposta = await fetch(formulario.action, {
            method: "POST",
            body: new FormData(formulario),
            headers: {
                "Accept": "application/json"
            }
        });

        const resultado = await resposta.json();

        console.log("Resposta FormSubmit:", resultado);

        // Detecta possíveis respostas de erro
        const erro =
            resposta.ok === false ||
            resultado.success === false ||
            resultado.success === "false" ||
            resultado.sucesso === false ||
            resultado.sucesso === "falso";

        if (erro) {
            throw new Error(
                resultado.message ||
                resultado.mensagem ||
                "Não foi possível enviar a mensagem."
            );
        }

        mensagemStatus.textContent =
            "Mensagem enviada com sucesso! Obrigado pelo contato.";

        mensagemStatus.style.color = "#d1d6a6";

        formulario.reset();

    } catch (erro) {

        console.error("Erro no formulário:", erro);

        mensagemStatus.textContent =
            erro.message || "Não foi possível enviar a mensagem.";

        mensagemStatus.style.color = "#ff9999";

    } finally {

        botaoEnviar.disabled = false;
        botaoEnviar.value = "ENVIAR";
    }
});




