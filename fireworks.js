const container = document.querySelector('.fireworks')
const fireworks = new Fireworks.default(container, {
    acceleration: 1.00,
    intensity: 0.00,
});
fireworks.start()

function triggerFireworks() {
    fireworks.updateSize({width: window.innerWidth - 300, height: window.innerHeight - 300});

    let count = 50;

    const interval = setInterval(() => {
        fireworks.launch(1);
        count--;

        if (count === 0) {
            clearInterval(interval);
            fireworks.updateOptions({intensity: 1.00});
        }
    }, 50);
}