import { cargarEstructura, sideBar } from '/src/app/fetch.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/src/app/authentication/signup/main/main-page.html');
    await confirmInputs();
    await sideBar();

    window.updateImagePreview = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function(e) {
                document.querySelector('.user-profile__img').src = e.target.result;
            };
            
            reader.readAsDataURL(input.files[0]);
        }
    };
});

async function confirmInputs() {
    const form = document.querySelector('.user-info');

    const imageUpload = document.getElementById('imageUpload');

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

        if (imageUpload.files.length > 0) {
            const file = imageUpload.files[0];
            const fileType = file.type;
            const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validImageTypes.includes(fileType)) {
                actualWarnings += `File is not a valid image. Only JPEG and PNG are allowed. <br>`;
                helper = true;
            }
            if (file.size > 10 * 1024 * 1024) { // 10 MB
                actualWarnings += `Image is too large. Must be less than 10MB. <br>`;
                helper = true;
            }
    
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                if (img.width > 1500 || img.height > 1500) {
                    actualWarnings += `Image dimensions are too large. Maximum allowed is 1500x1500. <br>`;
                    helper = true;
                }
            };

            
        }

        if(helper){
            warnings.innerHTML = actualWarnings;
        } else {
            warnings.innerHTML = "Done!";
        }

    });
}
