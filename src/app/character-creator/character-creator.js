import { cargarEstructura, cargarTemplate, sideBar } from '/dnd4dummies-pwm/src/app/fetch.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/dnd4dummies-pwm/src/app/character-creator/components/main-page/main-page.html');
    await loadOptionsFromJSON();
    await loadLoreSections();
    await sideBar();
});

async function loadLoreSections() {
    let loreSections = document.querySelectorAll('.lore .lore__section');
    const templateURL = '/dnd4dummies-pwm/src/app/character-creator/components/lore-section/lore-section.html';

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

async function loadOptionsFromJSON() {
    const jsonURL = '/dnd4dummies-pwm/src/app/character-creator/options.json';

    fetch(jsonURL)
        .then(response => response.json()) // Convertimos la respuesta en JSON
        .then(data => {
            // Procesamos cada categoría de datos
            addOptionsToSelect(data.race, '.property--race .property__selector');
            addOptionsToSelect(data.class, '.property--class .property__selector');
            addOptionsToSelect(data.alignment, '.property--alignment .property__selector');
            addOptionsToSelect(data.background, '.property--background .property__selector');
        })
        .catch(error => console.error('Error loading JSON:', error));
}

function addOptionsToSelect(options, selector) {
    const selectElement = document.querySelector(selector);
    if (selectElement) {
        options.forEach((option, index) => {
            const optionElement = document.createElement('option');
            optionElement.textContent = option;
            optionElement.value = option.toLowerCase().replace(/\s+/g, '-');
            optionElement.classList.add(`property__option--${selector.slice(1).replace(/\s+/g, '-')}-${index + 1}`);
            selectElement.appendChild(optionElement);
        });
    }
}
