// Selecionando os elementos do DOM
const timeElement = document.querySelector('.digital-clock .time');
const dateElement = document.querySelector('.digital-clock .date');
const hourHand = document.querySelector('.hour-hand');
const minHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

// Função para atualizar o relógio
function updateClock() {
    const now = new Date();
    
    // Relógio Digital
    const time = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const date = now.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    timeElement.textContent = time;
    dateElement.textContent = date.charAt(0).toUpperCase() + date.slice(1);
    
    // Relógio Analógico - Cálculos precisos
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    
    // Cálculo preciso com offset para posicionamento correto
    const preciseHours = (hours % 12) + (minutes / 60);
    const preciseMinutes = minutes + (seconds / 60);
    const preciseSeconds = seconds + (milliseconds / 1000);
    
    // Conversão para graus com offset de 90° (para começar no topo)
    const hoursDegrees = (preciseHours * 30) - 90;
    const minutesDegrees = (preciseMinutes * 6) - 90;
    const secondsDegrees = (preciseSeconds * 6) - 90;
    
    // Aplicação das rotações
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    minHand.style.transform = `rotate(${minutesDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    
    // Otimização da animação
    if (seconds === 0 && milliseconds < 100) {
        secondHand.style.transition = 'none';
    } else {
        secondHand.style.transition = 'all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)';
    }
}

// Iniciar o relógio
updateClock();

// Atualização suave (60fps)
requestAnimationFrame(function animUpdate() {
    updateClock();
    requestAnimationFrame(animUpdate);
});

// Redimensionamento da janela
window.addEventListener('resize', updateClock);