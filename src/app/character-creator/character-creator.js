import { cargarEstructura, cargarTemplate, sideBar } from '/src/app/fetch.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/src/app/character-creator/components/main-page/main-page.html');
    await loadLoreSections();
    await sideBar();
});

async function loadLoreSections() {
    let loreSections = document.querySelectorAll('.lore .lore__section');
    const templateURL = '/src/app/character-creator/components/lore-section/lore-section.html';

    // Definir los nombres para cada user-text__label
    const labels = ['Personality Traits', 'Ideals', 'Bonds', 'Flaws'];

    const promises = Array.from(loreSections).map((section, index) => 
        cargarTemplate(templateURL).then(content => {
            // Encuentra el elemento user-text__label en el contenido del template
            let label = content.querySelector('.user-text__label');
            if (label) {
                // Modifica el texto del label según el índice de la iteración
                label.textContent = labels[index];
            }
            // Añade el contenido modificado al section
            section.appendChild(content);
        })
    );

    await Promise.all(promises);
}
