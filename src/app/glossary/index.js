import { cargarEstructura, sideBar} from "/dnd4dummies-pwm/src/app/fetch.js";

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura("./components/main-page/main-page.html");
    await sideBar();
});