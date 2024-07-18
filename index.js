const track = document.getElementById("image-track");

let mouseDownAt = 0;
let prevPercentage = 0;
let isTouchDevice = false;

function handleDown(clientX) {
    mouseDownAt = clientX;
}

function handleUp() {
    mouseDownAt = 0;
    prevPercentage = parseFloat(track.dataset.percentage) || 0;
}

function handleMove(clientX) {
    if (mouseDownAt === 0) return;

    const mouseDelta = mouseDownAt - clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -50;
    const nextPercentage = prevPercentage + percentage;

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

// Mouse events
track.onmousedown = e => handleDown(e.clientX);
window.onmouseup = handleUp;
window.onmousemove = e => handleMove(e.clientX);

// Touch events
track.ontouchstart = e => {
    isTouchDevice = true;
    handleDown(e.touches[0].clientX);
};
window.ontouchend = handleUp;
window.ontouchmove = e => {
    if (isTouchDevice) {
        handleMove(e.touches[0].clientX);
    }
};
