document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura();
});

async function cargarEstructura() {
    let appMain = document.getElementById('main-topic-details');

    appMain.appendChild(await cargarTemplate('/src/app/shared/header/header.html'));
    await cargarLoginPopup();

    appMain.appendChild(await cargarTemplate('/src/app/forum/components/topic-page-main/topic-page-main.html'));
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

async function cargarLoginPopup() {
    document.querySelector('.login-popup-container').appendChild(await cargarTemplate('/src/app/authentication/login/login-popup.html'));
    document.querySelector('.login-popup-container').style.display = 'none';

    document.querySelector('.upper-bar__login-logo-image').addEventListener('click', function() {
        interactLoginPopup();
    });
    document.querySelector('.login-container__close-icon').addEventListener('click', function() {
        interactLoginPopup();
    });
}

function interactLoginPopup() {
    if(document.querySelector('.login-popup-container').style.display == 'none'){
        document.querySelector('.login-popup-container').style.display = 'flex';
    } else {
        document.querySelector('.login-popup-container').style.display = 'none';
    }
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
