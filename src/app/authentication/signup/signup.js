document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura();
    await confirmInputs();
});

async function cargarEstructura() {
    let appMain = document.getElementById('main');

    appMain.appendChild(await cargarTemplate('/src/app/shared/header/header.html'));
    await cargarLoginPopup();
    appMain.appendChild(await cargarTemplate('./main/main-page.html'));
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

async function confirmInputs() {
    const form = document.querySelector('.user-info');

    const password = document.querySelector('.parameter__text--password');
    const confirmPassword = document.querySelector('.parameter__text--confirm-password');

    const email = document.querySelector('.parameter__text--email');
    const confirmEmail = document.querySelector('.parameter__text--confirm-email');

    const birthdate = document.querySelector('.parameter__text--birth-date');

    const warnings = document.querySelector('.warnings');

    form.addEventListener('submit', e=>{
        e.preventDefault();

        let helper = false; 
        let actualWarnings = "";
        let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        let actualTime = new Date();
        let minimumYear = parseInt(actualTime.getFullYear() - 18);

        let userTime = new Date(birthdate.value);
        let userYear = parseInt(userTime.getFullYear());
        
        if(!regexEmail.test(email.value) || !regexEmail.test(confirmEmail.value)){
            actualWarnings += `That email is not valid. <br>`;
            helper = true;
        }
        
        if (email.value !== confirmEmail.value) {
            actualWarnings += `The emails are not the same. <br>`;
            helper = true;
        } 

        if (password.value !== confirmPassword.value) {
            actualWarnings += `The passwords are not the same. <br>`;
            helper = true;
        }

        if(userYear > minimumYear){
            actualWarnings += `You are underage. <br>`;
            helper = true;
        }

        if(helper){
            warnings.innerHTML = actualWarnings;
        } else {
            warnings.innerHTML = "Done!";
        }

    });
}