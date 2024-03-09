document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura();

});

async function cargarEstructura() {
    let appMain = document.getElementById('main');

    appMain.appendChild(await cargarTemplate('/dnd4dummies-pwm/src/app/shared/header/header.html'));
    await cargarLoginPopup();

    appMain.appendChild( await cargarTemplate('./components/main-page/main-page.html'));

    await loadLoreSections();

    appMain.appendChild(await cargarTemplate('/dnd4dummies-pwm/src/app/shared/footer/footer.html'));
}

async function cargarTemplate(url) {
    let response = await fetch(url);
    let text = await response.text();

    let template = document.createElement('template');
    template.innerHTML = text;
    return document.importNode(template.content, true);
}

async function cargarLoginPopup() {
    document.querySelector('.login-popup-container').appendChild(await cargarTemplate('/dnd4dummies-pwm/src/app/authentication/login/login-popup.html'));
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
