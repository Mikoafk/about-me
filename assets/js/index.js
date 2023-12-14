const lb = document.getElementById("loader-black");
const bb = document.getElementById("button-back");
const bo = document.getElementById("button-options");
const ol = document.getElementById("options-list");
const clickSound = new Howl({
    src: ["/assets/audio/click-short.ogg"],
    html5: true,
});
const musicBackground = new Howl({
    src: ["http://radio.plaza.one/mp3"],
    html5: true,
    preload: true,
});

musicBackground.play();

window.addEventListener("error", (e) => {
    console.log(e);
});

document.addEventListener("DOMContentLoaded", () => {
    let toggle_bo = true;

    bo.addEventListener("click", (e) => {
        clickSound.play();

        if (toggle_bo == false) {
            bo.style = "";

            for (let i = 0; i < ol.children.length; i++) {
                setTimeout(() => {
                    ol.children[i].style = "";
                }, i * 90);
            }

            return (toggle_bo = true);
        }

        bo.style.transform = "translateX(-12rem)";

        for (let i = 0; i < ol.children.length; i++) {
            setTimeout(() => {
                ol.children[i].style.transform = "translateX(17rem)";
            }, i * 90);
        }

        toggle_bo = false;
    });
});

function backToMenu() {
    clickSound.play();
    bb.style = "opacity: 0;pointer-events: none;";
    goTo("menu");
}

function goTo(id) {
    const el = document.getElementById(id);

    if (id !== "menu") bb.style = "opacity: 1;pointer-events: all;";

    lb.style = "opacity: 1;pointer-events: all;";

    setTimeout(() => {
        el.scrollIntoView();
        lb.style = "opacity: 0;pointer-events: none;";
    }, 1000);
}
