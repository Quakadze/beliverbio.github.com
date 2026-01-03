const texts = [
    "I'll always be lonely."
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let deletingDelay = 50;
let pauseDelay = 1500;

function typeEffect() {
    const currentText = texts[textIndex];
    const typingElement = document.getElementById('typing-text');
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = deletingDelay;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = pauseDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500;
    }
    
    setTimeout(typeEffect, typingDelay);
}

document.getElementById('info-btn').addEventListener('click', toggleBio);
document.getElementById('close-bio').addEventListener('click', toggleBio);

function toggleBio() {
    const bioPanel = document.getElementById('bio-panel');
    bioPanel.classList.toggle('active');
}

const audio = document.getElementById('background-music');
const playBtn = document.getElementById('play-btn');
const muteBtn = document.getElementById('mute-btn');
let isPlaying = false;
let isMuted = false;

playBtn.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

muteBtn.addEventListener('click', function() {
    if (isMuted) {
        audio.muted = false;
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        audio.muted = true;
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
    isMuted = !isMuted;
});

document.addEventListener('click', function(event) {
    const bioPanel = document.getElementById('bio-panel');
    const infoBtn = document.getElementById('info-btn');
    
    if (bioPanel.classList.contains('active') && 
        !bioPanel.contains(event.target) && 
        event.target !== infoBtn && 
        !infoBtn.contains(event.target)) {
        bioPanel.classList.remove('active');
    }
});

window.addEventListener('load', function() {
    setTimeout(typeEffect, 1000);
});