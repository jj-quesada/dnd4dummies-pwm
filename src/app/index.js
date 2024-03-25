import { cargarEstructura } from "/src/app/fetch.js";

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura("/src/app/home-page/index-main-component.html");
});