document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura();
});

async function cargarEstructura() {
    let appMain = document.getElementById('main');

    appMain.appendChild(await cargarTemplate('/src/app/shared/header/header.html'));

    appMain.appendChild(await cargarTemplate('/src/app/forum/components/topic-display/topic-display.html'));

    appMain.appendChild(await cargarTemplate('/src/app/forum/components/comment-area/comment-area.html'));

    appMain.appendChild(await cargarTemplate('/src/app/forum/components/comment-section/comment-section.html'));
    
    await loadCommentList();

    appMain.appendChild(await cargarTemplate('/src/app/shared/footer/footer.html'));
}

async function cargarTemplate(url) {
    let response = await fetch(url);
    let text = await response.text();

    let template = document.createElement('template');
    template.innerHTML = text;
    return document.importNode(template.content, true);
}

async function loadCommentList() {
    let commentList = document.querySelector('.comment-section-list');

    const templateURL = '/src/app/forum/components/comment-display/comment-display.html';

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

/*
    <header class="header"></header>

    <main class="details-main">
        
        <section class="topic-display"></section>

        <section class="comment-area"></section>

        <section class="comment-section-container">
            <ul class="comment-section-list">
            </ul>
        </section>

    </main>

    <footer class="footer"></footer>
*/
