import { cargarEstructura, cargarTemplate } from '/src/app/fetch.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/src/app/glossary/components/descriptive-glossary/descriptive-glossary.html');
    document.querySelector('.banner__hover-text').textContent = "Alignments Section";
    await loadElementList();
    await cargarSectionCard();
});

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

async function interactSectionCard(name = '') {
    if(document.querySelector('.section-card-container').style.display == 'none'){

        await buildSectionCardContent(name);

        document.querySelector('.section-card-container').style.display = 'flex';
    } else {
        document.querySelector('.section-card-container').style.display = 'none';
        const features = document.querySelector('.card-content__list').querySelectorAll('li');
        features.forEach(li => li.remove());
    }
}

async function buildSectionCardContent(name = '') {
    // Supongamos que esta es la URL de tu JSON
    const jsonURL = 'classes.json';

    try {
        const response = await fetch(jsonURL);
        const data = await response.json();

        // Buscar el objeto cuyo nombre coincide con el argumento name
        const classObj = data.classes.find(clase => clase.name === name);

        if (!classObj) {
            console.log('Clase no encontrada');
            return;
        }

        const labelElement = document.querySelector('.card-header__label');
        labelElement.textContent = name;

        // Referencia al ul donde se insertarán los li
        const listElement = document.querySelector('.card-content__list');

        const templateContent = await cargarTemplate('/src/app/glossary/components/section-card-feature/section-card-feature.html');

        // Iterar sobre cada propiedad en object.details
        Object.entries(classObj.details).forEach(([key, value], index) => {

            const liElement = document.importNode(templateContent, true);

            // Definir el id y el name del input basado en la propiedad actual
            const featureId = `feature_${index}`;

            liElement.querySelector('.feature__accordion').id = featureId;
            liElement.querySelector('.feature__accordion').name = 'accordion'; // Asegurar que todos tengan el mismo nombre si son parte de un acordeón
            liElement.querySelector('.feature__name').setAttribute('for', featureId);
            liElement.querySelector('.feature__name').textContent = parseKey(key);
            liElement.querySelector('.feature__description').innerHTML = typeof value === 'object' ? JSON.stringify(value) : value;

            // Añadir este template modificado como elemento li en el ul
            listElement.appendChild(liElement);
        });
    } catch (error) {
        console.error('Error al construir el contenido de la sección:', error);
    }
}

function parseKey(text) {
    // Dividir el texto por guiones bajos para obtener las palabras
    const words = text.split('_');

    // Convertir la primera letra de cada palabra a mayúscula y el resto a minúsculas
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    // Unir las palabras con espacios para formar la frase
    const readableText = capitalizedWords.join(' ');

    return readableText;
}