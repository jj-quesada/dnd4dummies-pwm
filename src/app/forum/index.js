import { cargarEstructura, cargarTemplate } from '/src/app/fetch.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/src/app/forum/components/main-page/main-page.html');
    await loadTopicList();
});

async function loadTopicList() {
    let topicList = document.querySelector('.topic-list');

    const templateURL = '/src/app/forum/components/topic-preview/topic-preview.html';

    // Inicializar un array para almacenar las promesas
    let promises = [];

    // Crear 4 elementos li, asignarles la clase 'topic' y cargar el template
    for (let i = 0; i < 4; i++) {
        let li = document.createElement('li');
        li.classList.add('topic');

        // Añadir el li al ul
        topicList.appendChild(li);

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
