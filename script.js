"use strict";

// Variables del juego
let boolean = false;
let sequence = [];
let index_user = 0;
let previous_color = null;
const type_color = ['blue', 'red', 'yellow', 'green'];
const start_button = document.getElementById('start');
const buttons = {
    blue: document.getElementById('blue'),
    red: document.getElementById('red'),
    yellow: document.getElementById('yellow'),
    green: document.getElementById('green')
};


// Event listener para el botón de inicio
start_button.addEventListener('click', play_game);

// Event listeners para los botones de colores
buttons.blue.addEventListener('click', () => start_user(type_color.indexOf('blue'))); //indexOf() devuelve el índice del primer elemento de un array que cumpla con la condición dada
buttons.red.addEventListener('click', () => start_user(type_color.indexOf('red')));
buttons.yellow.addEventListener('click', () => start_user(type_color.indexOf('yellow')));
buttons.green.addEventListener('click', () => start_user(type_color.indexOf('green')));


// Función para iniciar el juego y reinicia las varables. Además un boolean para saber si el juego ha comenzado
function play_game() {
    alert('¡Comienza el juego!');
    sequence = [];
    index_user = 0;
    previous_color = null;
    boolean = true;
    add_color();
    show_sequence();
}

// Función para agregar un color aleatorio a la secuencia 
function add_color() {
    const random_color = Math.floor(Math.random() * type_color.length);
    sequence.push(random_color);
}

// Función para mostrar la secuencia de colores con retraso de un segundo
function show_sequence() {
    sequence.forEach((color, index) => {
        setTimeout(() => {
            effect_color(color);
        }, 1000 * index);
    });
}

// Función para aplicar el efecto de color a los botones
function effect_color(color) {
    const current_button = buttons[type_color[color]];
    current_button.style.opacity = '0.3';
    setTimeout(() => {
        current_button.style.opacity = '1';
    }, 400);
}

// Función para manejar el turno del usuario.
// Verifica si el jugador ha comenzado el juego y si la secuencia es correcta
function start_user(color) {
    if (!boolean) return;

    // Agregar el color anterior al array
    previous_color = color;
    if (color === sequence[index_user]) {
        if (index_user === sequence.length - 1) {
            alert('¡Secuencia correcta, no pares!');
            index_user = 0;
            add_color();
            show_sequence();
        } else {
            index_user++;
        }
    } else {
        alert('¡Secuencia incorrecta, game over :(!');
        if (confirm("¿Otra partida?")) {
            play_game();
        } else {
            boolean = false;
        }
    }
}

