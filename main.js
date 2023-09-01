const html = document.querySelector('html');
const btn = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const imgPlayPause = document.querySelector(".app__card-primary-butto-icon");
const img = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const musicaFocoInput = document.querySelector('#alternar-musica');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const somPlay = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somBeep = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
//let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

btn[0].addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    btn[0].classList.add('active');
})

btn[1].addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    btn[1].classList.add('active');
})

btn[2].addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    btn[2].classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo();
    btn.forEach(function (contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    img.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal da uma respirada? <br> <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfície <br> <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
    }
}

const contagemRegresiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somBeep.play();
        alert('tempo finalizado');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos--;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        zerar();
        somPause.play();
        return;
    }
    somPlay.play();
    intervaloId = setInterval(contagemRegresiva, 1000);
    // o setInterval chamara a função contagemRegresiva a cada 1000 ms ou 1s.
    iniciarOuPausarBt.textContent = 'Pausar';
    imgPlayPause.setAttribute('src', './imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar'
    imgPlayPause.setAttribute('src', './imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
