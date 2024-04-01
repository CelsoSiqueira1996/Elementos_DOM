const listaBotoesContexto = document.querySelectorAll('.app__card-button')
const html = document.querySelector('html');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const displayTempo = document.getElementById('timer');
const musicaBt = document.querySelector('.toggle-checkbox');
const startPauseBt = document.getElementById('start-pause');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioFimDoTempo = new Audio('./sons/beep.mp3');
const imagemStartPause = document.querySelector('.app__card-primary-butto-icon')
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

listaBotoesContexto.forEach((botao,_,lista) => {

    botao.addEventListener('click', () => {

        const contexto = botao.getAttribute('data-contexto');
        html.setAttribute('data-contexto', contexto);
        banner.setAttribute('src', `./imagens/${contexto}.png`);
        switch (contexto) {
            case 'foco':
                tempoDecorridoEmSegundos = 1500;
                titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
                break;
            case 'descanso-curto':
                tempoDecorridoEmSegundos = 300;
                titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
                break;
            case 'descanso-longo':
                tempoDecorridoEmSegundos = 900;
                titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
                break;
            default:
                break;
        }
        mostrarTempo();
        zerar();
        for(let contador = 0; contador < lista.length; contador++) {
            if(lista[contador] === botao) {
                lista[contador].classList.add('active');
            } else {
                lista[contador].classList.remove('active');
            }
        }

    })

});

musicaBt.addEventListener('change', () => {
    if(musicaBt.checked) {
        musica.play();
    } else {
        musica.pause();
        musica.currentTime = 0;
    }
})

startPauseBt.addEventListener('click', iniciarOuPausar);

function contagemRegressiva() {
    if(tempoDecorridoEmSegundos <= 0) {
        audioFimDoTempo.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

function iniciarOuPausar() {
    if(intervaloId) {
        zerar();
        audioPause.play();
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    audioPlay.play();
    imagemStartPause.setAttribute('src', './imagens/pause.png');
    iniciarOuPausarBt.textContent = 'Pausar';
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
    imagemStartPause.setAttribute('src', './imagens/play_arrow.png');
    iniciarOuPausarBt.textContent = 'Começar';
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos*1000);
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();

