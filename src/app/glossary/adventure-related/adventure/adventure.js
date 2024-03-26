<<<<<<< HEAD
import { cargarEstructura, sideBar } from '/src/app/fetch.js';
=======
import { cargarEstructura } from '/src/app/fetch.js';
import { buildInformativeGlossary } from '/src/app/glossary/glossary-utilities.js';
>>>>>>> json-hell

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/src/app/glossary/components/informative-glossary/informative-glossary.html');
    document.querySelector('.banner__hover-text').textContent = "Adventure Section";
<<<<<<< HEAD
    await sideBar();
=======
    document.querySelector('.information-section__image').src = "/src/assets/images/adventure.jpg";
    await buildInformativeGlossary('adventure.json');
>>>>>>> json-hell
});
