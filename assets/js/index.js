/**
 * Este script ha sido creado por Miko.
 *
 * Discord: miko.afk
 * Instagram: miko_2007
 */

console.clear();
console.log("%cBienvenido/a a la consola! :D", "font-size:3rem;");
console.log(
    "%cAquí se mostrarán datos de la página",
    "font-size:1rem;color:#ff4;"
);
console.log("");

/* Definimos los elementos generales de la página. */
const buttonBackToMenu = document.getElementById("button-back");
const buttonMenuOptions = document.getElementById("button-options");
const buttonMenuOptionsList = document.getElementById("options-list");
const blackScreen = document.getElementById("black-screen");

/* Variables modificables, estás son para funciones dentro de la página y cambian constantemente. */
let menuOptionsIsOpened = false;
let actualSectionOpen = localStorage.getItem("actualSectionOpen") || "menu";

console.log("⭐ Cargando última página visitada:", actualSectionOpen);

/* Cargamos los sonidos de la página. */
const clickSound = new Howl({
    src: ["/assets/audio/click-short.ogg"],
    html5: true,
    preload: true,
});

const clickConfirmationSound = new Howl({
    src: ["/assets/audio/click-short-confirm.ogg"],
    html5: true,
    preload: true,
});

const backButtonSound = new Howl({
    src: ["/assets/audio/back-button-hover.ogg"],
    html5: true,
    preload: true,
});

/* Eventos de la página y botones. */
window.addEventListener("error", (e) =>
    console.error("💥 Ocurrió un error en la página", e)
);
window.addEventListener("load", (e) => {
    console.log("%c✅ La página terminó de cargarse", "color:yellowgreen;");
    showBlackScreen(false);
    showSection(actualSectionOpen);
});
window.addEventListener("resize", (e) =>
    document.getElementById(actualSectionOpen).scrollIntoView()
);
document.addEventListener("mousemove", parallaxBackground);
buttonBackToMenu.addEventListener("click", backToMenu);
buttonMenuOptions.addEventListener("click", toggleButtonMenu);

/* Función base para mostrar y ocultar ciertos elementos de la página */
function showElement(element, show) {
    if (show) {
        element.classList.add("visible");
        element.classList.remove("invisible");
        return;
    }

    element.classList.add("invisible");
    element.classList.remove("visible");
}

/* Mostrar pantalla negra de carga */
function showBlackScreen(show) {
    showElement(blackScreen, show);
}

/* Mostrar botón para ir al menu */
function showButtonBack(show) {
    showElement(buttonBackToMenu, show);
}

/* Mostrar secciones de la página */
async function showSection(idSection) {
    const section = document.getElementById(idSection);

    showBlackScreen(true);
    await wait(500);
    idSection !== "menu" ? showButtonBack(true) : showButtonBack(false);
    section.scrollIntoView();
    await wait(500);
    showBlackScreen(false);

    actualSectionOpen = idSection;
    localStorage.setItem("actualSectionOpen", actualSectionOpen);
}

/* Función para regresar al menu principal */
function backToMenu() {
    backButtonSound.play();
    showButtonBack(false);
    showSection("menu");
}

/* Mostrar/Ocultar opciones del menu principal */
async function toggleButtonMenu(e) {
    clickSound.play();

    if (menuOptionsIsOpened) {
        buttonMenuOptions.style = "";

        for (let i = 0; i < buttonMenuOptionsList.children.length; i++) {
            await wait(i * 90);
            buttonMenuOptionsList.children[i].style = "";
        }

        return (menuOptionsIsOpened = false);
    }

    buttonMenuOptions.style.transform = "translateX(-12rem)";

    for (let i = 0; i < buttonMenuOptionsList.children.length; i++) {
        await wait(i * 90);
        buttonMenuOptionsList.children[i].style.transform = "translateX(17rem)";
    }

    return (menuOptionsIsOpened = true);
}

/* Efecto parallax del fondo */
function parallaxBackground(e) {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    const offsetX = mouseX * 20;
    const offsetY = mouseY * 20;

    document.body.style.backgroundPosition = `calc(50% + ${offsetX}px) calc(50% + ${offsetY}px)`;
}

/* Función de ayuda para esperar cierto tiempo antes de ejecutar una acción, es equivalente a un setTimeout() */
async function wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
}
