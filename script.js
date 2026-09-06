// Lista de frases que vão ficar alternando
const frases = ["Estudante de ADS  ", "Desenvolvedor Python  ", "Curioso por Tecnologia  "];
let indexFrase = 0;
let indexLetras = 0;
let fraseAtual = "";
let letrasAtuais = "";
let apagando = false;

function digitar() {
    fraseAtual = frases[indexFrase];

    if (!apagando) {
        // Adiciona uma letra por vez
        letrasAtuais = fraseAtual.slice(0, ++indexLetras);
    } else {
        // Remove uma letra por vez
        letrasAtuais = fraseAtual.slice(0, --indexLetras);
    }

    // Injeta o texto dentro do span no HTML
    const elemento = document.getElementById("texto-digitado");
    if (elemento) {
        elemento.textContent = letrasAtuais;
    }

    // Velocidade da digitação (mais rápido ao apagar)
    let velocidade = apagando ? 50 : 100;

    // Se terminou de digitar a frase inteira
    if (!apagando && letrasAtuais === fraseAtual) {
        velocidade = 1500; // Pausa no final da frase antes de apagar
        apagando = true;
    } else if (apagando && letrasAtuais === "") {
        apagando = false;
        indexFrase = (indexFrase + 1) % frases.length; // Passa para a próxima frase
        velocidade = 500; // Pausa antes de começar a digitar a próxima
    }

    setTimeout(digitar, velocidade);
}

// Inicia o efeito assim que a página carrega
window.onload = digitar;
// --- LÓGICA DO BOTÃO VOLTAR AO TOPO ---

const botaoTopo = document.getElementById("btn-topo");

// Escuta o evento de rolagem da página
window.onscroll = function() {
    // Se a página for rolada mais de 300 pixels para baixo, mostra o botão
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        botaoTopo.classList.add("mostrar");
    } else {
        // Se voltar para o topo, esconde o botão novamente
        botaoTopo.classList.remove("mostrar");
    }
};

// Ao clicar no botão, leva o usuário de volta ao topo com um efeito suave
botaoTopo.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // "smooth" faz a rolagem ser suave em vez de um corte seco
    });
});
// --- LÓGICA DA SAUDAÇÃO E RELÓGIO DIGITAL ---

function atualizarRelogioESaudacao() {
    const agora = new Date();
    
    // Obtém as horas, minutos e segundos formatados com dois dígitos
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');
    
    // Atualiza o texto do relógio na tela
    const elementoRelogio = document.getElementById("relogio-digital");
    if (elementoRelogio) {
        elementoRelogio.textContent = `${horas}:${minutos}:${segundos}`;
    }

    // Define a saudação baseada na hora atual
    let saudacao = "Olá!";
    let emoji = "👋";
    const horaAtual = agora.getHours();

    if (horaAtual >= 5 && horaAtual < 12) {
        saudacao = "Bom dia, bem-vindo!";
        emoji = "🌅";
    } else if (horaAtual >= 12 && horaAtual < 18) {
        saudacao = "Boa tarde, bem-vindo!";
        emoji = "☀️";
    } else {
        saudacao = "Boa noite, bem-vindo!";
        emoji = "🌙";
    }

    // Injeta a saudação e o emoji nos elementos do HTML
    const elementoSaudacao = document.getElementById("texto-saudacao");
    const elementoEmoji = document.getElementById("emoji-saudacao");
    
    if (elementoSaudacao && elementoEmoji) {
        elementoSaudacao.textContent = saudacao;
        elementoEmoji.textContent = emoji;
    }
}

// window.onload para o efeito de digitar, 
// setInterval para rodar essa função a cada 1 segundo (1000 milissegundos)
setInterval(atualizarRelogioESaudacao, 1000);

// Executa uma vez logo no início para não esperar 1 segundo antes de aparecer as horas
atualizarRelogioESaudacao();

