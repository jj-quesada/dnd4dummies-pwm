import { cargarEstructura, cargarTemplate } from '/src/app/fetch.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/src/app/glossary/components/descriptive-glossary/descriptive-glossary.html');
    document.querySelector('.banner__hover-text').textContent = "Weapons Section";
    await loadElementList();
});

async function loadElementList() {
    let elementList = document.querySelector('.elements-section__list');

    const templateURL = '/src/app/glossary/components/descriptive-glossary-element/descriptive-glossary-element.html';

    // Inicializar un array para almacenar las promesas
    let promises = [];

    // Crear 4 elementos li, asignarles la clase 'element' y cargar el template
    for (let i = 0; i < 4; i++) {
        let li = document.createElement('li');
        li.classList.add('element');

        // Añadir el li al ul
        elementList.appendChild(li);

        // Cargar el template y añadirlo al li
        let promise = cargarTemplate(templateURL).then(content => {
            li.appendChild(content);
        });

        // Añadir la promesa al array de promesas
        promises.push(promise);
    }

    // Esperar a que todas las promesas se resuelvan
    await Promise.all(promises);
}