export async function cargarEstructura(url) {
    let appMain = document.getElementById('app');

    appMain.appendChild(await cargarTemplate('/src/app/shared/header/header.html'));
    await cargarLoginPopup();
    appMain.appendChild(await cargarTemplate(url));
    appMain.appendChild(await cargarTemplate('/src/app/shared/footer/footer.html'));
}

export async function cargarTemplate(url) {
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
    document.querySelector('.side-bar__login-logo-image').addEventListener('click', function() {
        interactLoginPopup();
        document.querySelector('.side-bar').classList.remove("visible");
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

export async function sideBar() {
    const nav = document.querySelector('.side-bar');

    document.querySelector('.abrir').addEventListener("click", () => {
        nav.classList.add("visible");
        document.querySelector('.login-popup-container').style.display = 'none';
    })

    document.querySelector('.cerrar').addEventListener("click", () => {
        nav.classList.remove("visible");
    })

    document.addEventListener("mousedown", (event) => {
        const target = event.target;
        if (!nav.contains(target) && target !== document.querySelector('.abrir')) {
            nav.classList.remove("visible");
        }
    });
}
