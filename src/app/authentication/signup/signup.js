import { cargarEstructura, sideBar } from '/src/app/fetch.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/src/app/authentication/signup/main/main-page.html');
    await confirmInputs();
    await sideBar();

});

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
            console.log("PUA?APAOOA");
        } 

        if (password.value !== confirmPassword.value) {
            actualWarnings += `The passwords are not the same. <br>`;
            helper = true;
            console.log(password.value);
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