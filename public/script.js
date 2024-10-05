document.addEventListener('DOMContentLoaded', (event) => {
    const realTimeButton = document.getElementById('realTimeButton');
    const timeDisplay = document.getElementById('timeDisplay');
    let intervalId;

    realTimeButton.addEventListener('change', function() {
        if (this.checked) {
            intervalId = setInterval(() => {
                const currentTime = new Date().toLocaleTimeString();
                timeDisplay.textContent = `Current Time: ${currentTime}`;
            }, 1000);
        } else {
            clearInterval(intervalId);
            timeDisplay.textContent = '';
        }
    });
});

