import { cargarEstructura, cargarTemplate, sideBar } from '/dnd4dummies-pwm/src/app/fetch.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/dnd4dummies-pwm/src/app/forum/components/topic-page-main/topic-page-main.html');
    await loadCommentList();
    await sideBar();
});

async function loadCommentList() {
    let commentList = document.querySelector('.comment-section-list');

    const templateURL = '/dnd4dummies-pwm/src/app/forum/components/comment-display/comment-display.html';

    // Inicializar un array para almacenar las promesas
    let promises = [];

    // Crear 4 elementos li, asignarles la clase 'comment' y cargar el template
    for (let i = 0; i < 4; i++) {
        let li = document.createElement('li');
        li.classList.add('comment');

        // Añadir el li al ul
        commentList.appendChild(li);

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

