/*
    2C = dos de tréboles
    2D = dos de diamantes
    2H = dos de corazones
    2S = dos de picas
*/

(() => {
    'use strict'


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0;
    let puntosComputadora = 0;


    //Refenrencias del html
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    btnDetener.disabled = true; //Para que el jugador de entrada no pueda ganar o perder

    const puntos = document.querySelectorAll('small');

    const divCartasJugador = document.querySelector('#player-letters');
    const divCartasComputadora = document.querySelector('#computer-letters');


    //Esta función crea una baraja
    const crearDeck = () => {

        for (let i = 2; i <= 10; i++) { //Se crean las barajas de 2 a 10
            for (let tipo of tipos) {
                deck.push(i + tipo); //Se crean las barajas de una forma completa con todos los tipos de carta
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo); //Se crean las cartas especiales
            }
        }

        deck = _.shuffle(deck); //Revuelve las cartas
        return deck;
    }

    crearDeck();

    //Esta función permite tomar una carta
    const PedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en la baraja';
        }

        const carta = deck.pop();

        return carta;
    }

    //PedirCarta();

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }

    //Turno de la comptadora
    const turnoComputadora = (puntosMinimos) => {

        do {

            const carta = PedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntos[1].innerText = puntosComputadora;

            //<img class="letter" src="assets/cartas/2C.png" alt="">
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('letter');

            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if ((puntosJugador <= 21 && puntosComputadora <= 21) && puntosJugador === puntosComputadora) {

                alert('Empate');

            } else if (puntosJugador <= 21 && (puntosJugador > puntosComputadora || puntosComputadora > 21)) {

                alert('Ganaste');

            } else if ((puntosJugador <= 21 && puntosComputadora <= 21) && puntosJugador < puntosComputadora) {

                alert('Lo siento mucho perdiste');
            } else if (puntosJugador > 21) {
                alert('Lo siento mucho perdiste');
            }
        }, 100);
    }

    //Eventos

    btnPedir.addEventListener('click', () => {
        btnDetener.disabled = false;

        const carta = PedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);
        puntos[0].innerText = puntosJugador;

        //<img class="letter" src="assets/cartas/2C.png" alt="">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('letter');

        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            alert('Blacjack');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
        }
    });

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);

    });

    btnNuevo.addEventListener('click', () => {

        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;
        puntos[0].innerHTML = 0;
        puntos[1].innerHTML = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = true;

        console.clear;
    });
})();