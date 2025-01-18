const container = document.querySelector('.fireworks')
const fireworks = new Fireworks.default(container, {
    acceleration: 1.00,
    intensity: 0.00,
});
fireworks.start()

function launchSingleFirework() {
    fireworks.updateSize({width: window.innerWidth, height: window.innerHeight});
    fireworks.launch(1);
    setTimeout(() => {
        launchSingleFirework();
    }, Math.random() * 4000 + 1000);
}

function triggerFireworks() {
    fireworks.updateSize({width: window.innerWidth, height: window.innerHeight});

    let count = 50;

    const interval = setInterval(() => {
        fireworks.launch(1);
        count--;

        if (count === 0) {
            clearInterval(interval);
        }
    }, 50);

    // launch a firework randomly every 1 - 5 seconds
    launchSingleFirework();
}