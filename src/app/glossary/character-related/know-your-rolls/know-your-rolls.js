import { cargarEstructura } from '/src/app/fetch.js';
import { buildInformativeGlossary } from '/src/app/glossary/glossary-utilities.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/src/app/glossary/components/informative-glossary/informative-glossary.html');
    document.querySelector('.banner__hover-text').textContent = "Know Your Rolls Section";
    document.querySelector('.information-section__image').src = "/src/assets/images/knowyourrolls.jpg";
    await buildInformativeGlossary('knowyourrolls.json');
});
