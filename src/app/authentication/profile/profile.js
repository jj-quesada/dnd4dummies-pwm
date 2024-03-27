import { cargarEstructura, cargarTemplate, sideBar } from '/dnd4dummies-pwm/src/app/fetch.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/dnd4dummies-pwm/src/app/authentication/profile/main/main-page.html');
    await loadCardList();
    await sideBar();
});

async function loadCardList() {
    let cardList = document.querySelector('.character-list');

    const templateURL = '/dnd4dummies-pwm/src/app/shared/character-card/character-card.html';

    // Inicializar un array para almacenar las promesas
    let promises = [];

    // Crear 4 elementos li, asignarles la clase 'element' y cargar el template
    for (let i = 0; i < 4; i++) {
        let li = document.createElement('li');
        li.classList.add('card');

        // Añadir el li al ul
        cardList.appendChild(li);

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