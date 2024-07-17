const track = document.getElementById("image-track");

let mouseDownAt = 0;
let prevPercentage = 0;

track.onmousedown = e => {
    mouseDownAt = e.clientX;
};

window.onmouseup = () => {
    mouseDownAt = 0;
    prevPercentage = parseFloat(track.dataset.percentage) || 0;
};

window.onmousemove = e => {
    if (mouseDownAt === 0) return;

    const mouseDelta = mouseDownAt - e.clientX;
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
};
