const container = document.querySelector('.fireworks');
const audio = document.querySelector('audio');
const button = document.querySelector('button');
const firstText = document.querySelector('#first-text');
const secondText = document.querySelector('#second-text');

let intensity = 0;
let interval;
let fireworks;

audio.volume = 0.0;

function startFireworks() {
    fireworks = new Fireworks(container, { 
        particles: 200,
        acceleration: 1.00,
        intensity: intensity
    });
    
    fireworks.start();
}

function start() {
    container.classList.toggle('hide');
    button.classList.toggle('hide');
    firstText.classList.toggle('fade-in');
}

function changeText() {
    firstText.classList.toggle('fade-out');

    setTimeout(() => {
        firstText.classList.toggle('hide');
        secondText.classList.toggle('hide');
    }, 2000);

    secondText.classList.toggle('fade-in');
}

function fadeInVolume() {
    if (audio.volume < 1) {
        audio.volume += 0.2;
    }
}

function fadeOutVolume() {
    if (audio.volume > 0.2) {
        audio.volume += -0.2;
    }
}

audio.addEventListener('timeupdate', () => {
    if (parseFloat(audio.currentTime) > 28.5) {
        fadeOutVolume();
    } else {
        fadeInVolume();
    }
});

button.addEventListener('click', () => {
    start();
    audio.play();
    startFireworks();

    interval = setInterval(() => {
        intensity += 5;
        fireworks.setOptions({ intensity: intensity })
    }, 10000);
});

audio.addEventListener('ended', () => {
    clearInterval(interval);
    fireworks.stop();
    changeText();
});