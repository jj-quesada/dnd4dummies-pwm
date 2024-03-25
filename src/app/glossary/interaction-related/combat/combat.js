import { cargarEstructura, cargarTemplate } from '/src/app/fetch.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/src/app/glossary/components/informative-glossary/informative-glossary.html');
    document.querySelector('.banner__hover-text').textContent = "Combat Section";
});
