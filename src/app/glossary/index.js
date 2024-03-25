import { cargarEstructura } from "/src/app/fetch.js";

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura("./components/main-page/main-page.html");
});