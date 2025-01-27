/*
    2C = dos de tréboles
    2D = dos de diamantes
    2H = dos de corazones
    2S = dos de picas
*/

const miModulo = (() => {
    'use strict'

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];   

    //Refenrencias del html
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    btnDetener.disabled = true; //Para que el jugador de entrada no pueda ganar o perder
    btnPedir.disabled = true;

    const puntos           = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divLetters');

    const inicializarJuego = (numJugadores = 2) => {
       deck = crearDeck();
        puntosJugadores = [];

       for(let i = 0; i < numJugadores; i++){
        puntosJugadores.push(0);
       }
        
       puntos.forEach(elem => elem.innerText = 0);
       divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = true;

        console.clear;
    }

    //Esta función crea una baraja
    const crearDeck = () => {
        deck = [];

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

        return _.shuffle(deck); //Revuelve las cartas y las retorna
    }

    //Esta función permite tomar una carta
    const PedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en la baraja';
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }
    // 0 = al primer jugador, el ultimo sera la computadora
    const acumularPuntos = (carta, turno) => {
        
        puntosJugadores[turno]  = puntosJugadores[turno] + valorCarta(carta);
        puntos[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        //<img class="letter" src="assets/cartas/2C.png" alt="">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('letter');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if ((puntosMinimos <= 21 && puntosComputadora <= 21) && puntosMinimos === puntosComputadora) {

                alert('Empate');

            } else if (puntosMinimos <= 21 && (puntosMinimos > puntosComputadora || puntosComputadora > 21)) {

                alert('Ganaste');

            } else if ((puntosMinimos <= 21 && puntosComputadora <= 21) && puntosMinimos < puntosComputadora) {

                alert('Lo siento mucho perdiste');
            } else if (puntosMinimos > 21) {
                alert('Lo siento mucho perdiste');
            }
        }, 100);
    }

    //Turno de la comptadora
    const turnoComputadora = (puntosMinimos) => {
        /* let puntosJugador = 0; */
        let puntosComputadora = 0;
        do {

            const carta = PedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            /* puntosJugador = acumularPuntos(carta, 0); */

            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }

    //Eventos

    btnPedir.addEventListener('click', () => {
        btnDetener.disabled = false;

        const carta = PedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            alert('Blacjack');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled   = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);

    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };
})();