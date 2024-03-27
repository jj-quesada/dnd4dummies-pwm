import { cargarEstructura, sideBar } from "/dnd4dummies-pwm/src/app/fetch.js";

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura("/dnd4dummies-pwm/src/app/home-page/index-main-component.html");
    await sideBar();
});
