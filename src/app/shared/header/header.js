document.addEventListener('DOMContentLoaded', async function() {
    await cargarLoginPopup();

});

async function cargarTemplate(url) {
    let response = await fetch(url);
    let text = await response.text();

    let template = document.createElement('template');
    template.innerHTML = text;
    return content = document.importNode(template.content, true);
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