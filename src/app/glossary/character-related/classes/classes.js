document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura();
});

async function cargarEstructura() {
    let appMain = document.getElementById('main');

    appMain.appendChild(await cargarTemplate('/src/app/shared/header/header.html'));

    await cargarLoginPopup();

    appMain.appendChild(await cargarTemplate('/src/app/glossary/components/descriptive-glossary/descriptive-glossary.html'));
    document.querySelector('.banner__hover-text').textContent = "Classes Section";

    await loadElementListFromJSON();

    await cargarSectionCard();

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

async function loadElementList() {
    let elementList = document.querySelector('.elements-section__list');

    const templateURL = '/src/app/glossary/components/descriptive-glossary-element/descriptive-glossary-element.html';

    // Inicializar un array para almacenar las promesas
    let promises = [];

    // Crear 4 elementos li, asignarles la clase 'element' y cargar el template
    for (let i = 0; i < 10; i++) {
        let li = document.createElement('li');
        li.classList.add('element');

        // Añadir el li al ul
        elementList.appendChild(li);

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

async function loadElementListFromJSON() {
    let elementList = document.querySelector('.elements-section__list');
    const templateURL = '/src/app/glossary/components/descriptive-glossary-element/descriptive-glossary-element.html';

    // Suponiendo que esta es la URL de tu JSON
    const jsonURL = 'classes.json';

    try {
        // Obtener los datos del JSON
        const response = await fetch(jsonURL);
        const data = await response.json();

        // Asegurarse de que el número de elementos a crear no exceda la cantidad de clases en el JSON
        const numberOfElements = Math.min(12, data.classes.length);

        // Inicializar un array para almacenar las promesas
        let promises = [];

        // Crear elementos li y cargar el template
        for (let i = 0; i < numberOfElements; i++) {
            let li = document.createElement('li');
            li.classList.add('element');

            // Cargar el template y añadirlo al li
            let promise = cargarTemplate(templateURL).then(content => {
                // Aquí, se asume que puedes modificar 'content' para incluir 'name' y 'description'
                // Esto depende de cómo estés implementando cargarTemplate y cómo puedas modificar el content antes de añadirlo
                let nameElement = content.querySelector('.glossary-element__name');
                let descriptionElement = content.querySelector('.glossary-element__description');
                nameElement.textContent = data.classes[i].name;
                let descriptionText = data.classes[i].description;
                descriptionElement.textContent = descriptionText.length > 150 ? `${descriptionText.substring(0, 150)}...` : descriptionText;

                content.querySelector('.glossary-element__button').addEventListener('click', function() {
                    interactSectionCard(data.classes[i].name, descriptionText);
                });

                li.appendChild(content);
                // Añadir el li al ul después de cargar el contenido para evitar FOUC (Flash of Unstyled Content)
                elementList.appendChild(li);
            });

            // Añadir la promesa al array de promesas
            promises.push(promise);
        }

        // Esperar a que todas las promesas se resuelvan
        await Promise.all(promises);
    } catch (error) {
        console.error('Error al cargar la lista de elementos:', error);
    }
}

async function cargarSectionCard() {
    document.querySelector('.section-card-container').appendChild(await cargarTemplate('/src/app/glossary/components/section-card/section-card.html'));
    document.querySelector('.section-card-container').style.display = 'none';

    document.querySelector('.card-header__close-icon').addEventListener('click', function() {
        interactSectionCard();
    });
}

function interactSectionCard(name = '', description = '') {
    if(document.querySelector('.section-card-container').style.display == 'none'){

        if(name && description) {
            document.querySelector('.card-header__label').textContent = name;
            // Asumiendo que tienes un elemento para la descripción en tu section-card que necesitas definir
            //document.querySelector('.card-content__description').textContent = description;

            const firstFeatureLabel = document.querySelector('.card-content__list .feature__name');
            if (firstFeatureLabel) {
                firstFeatureLabel.textContent = "Description";
            }
    
            // Actualizar el contenido de la descripción del primer feature
            const firstFeatureDescription = document.querySelector('.card-content__list .feature__description');
            if (firstFeatureDescription) {
                firstFeatureDescription.textContent = description;
            }
        }

        document.querySelector('.section-card-container').style.display = 'flex';
    } else {
        document.querySelector('.section-card-container').style.display = 'none';
    }
}