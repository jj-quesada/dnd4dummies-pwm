import { cargarTemplate } from '/src/app/fetch.js';

export async function loadElementListFromJSON(url, arrayPropertyName) {
    let elementList = document.querySelector('.elements-section__list');
    const templateURL = '/src/app/glossary/components/descriptive-glossary-element/descriptive-glossary-element.html';

    // Suponiendo que esta es la URL de tu JSON
    const jsonURL = url;

    try {
        // Obtener los datos del JSON
        const response = await fetch(jsonURL);
        const data = await response.json();

        // Acceder dinámicamente a la propiedad del array usando el nuevo parámetro
        const elementsArray = data[arrayPropertyName];

        // Asegurarse de que el número de elementos a crear no exceda la cantidad de elementos en el array
        const numberOfElements = elementsArray.length;

        // Inicializar un array para almacenar las promesas
        let promises = [];

        // Crear elementos li y cargar el template
        for (let i = 0; i < numberOfElements; i++) {
            let li = document.createElement('li');
            li.classList.add('element');

            // Cargar el template y añadirlo al li
            let promise = cargarTemplate(templateURL).then(content => {
                // Modificar 'content' para incluir 'name' y 'description'
                let nameElement = content.querySelector('.glossary-element__name');
                let descriptionElement = content.querySelector('.glossary-element__description');
                nameElement.textContent = elementsArray[i].name;
                let descriptionText = elementsArray[i].description;
                descriptionElement.textContent = descriptionText.length > 150 ? `${descriptionText.substring(0, 150)}...` : descriptionText;
                content.querySelector('.glossary-element__button').addEventListener('click', function() {
                    interactSectionCard(elementsArray[i].name, jsonURL, arrayPropertyName);
                });

                li.appendChild(content);
                elementList.appendChild(li);
            });

            promises.push(promise);
        }

        // Esperar a que todas las promesas se resuelvan
        await Promise.all(promises);
    } catch (error) {
        console.error('Error al cargar la lista de elementos:', error);
    }
}


export async function cargarSectionCard() {
    document.querySelector('.section-card-container').appendChild(await cargarTemplate('/src/app/glossary/components/section-card/section-card.html'));
    document.querySelector('.section-card-container').style.display = 'none';

    document.querySelector('.card-header__close-icon').addEventListener('click', function() {
        interactSectionCard();
    });
}

async function interactSectionCard(name, jsonURL, arrayPropertyName) {
    if(document.querySelector('.section-card-container').style.display == 'none'){

        await buildSectionCardContent(name, jsonURL, arrayPropertyName);

        document.querySelector('.section-card-container').style.display = 'flex';
    } else {
        document.querySelector('.section-card-container').style.display = 'none';
        const features = document.querySelector('.card-content__list').querySelectorAll('li');
        features.forEach(li => li.remove());
    }
}


async function buildSectionCardContent(name, jsonURL, arrayPropertyName) {
    try {
        const response = await fetch(jsonURL);
        const data = await response.json();

        // Usar el nuevo parámetro para acceder dinámicamente a la propiedad del array
        const targetArray = data[arrayPropertyName];

        // Buscar el objeto cuyo nombre coincide con el argumento 'name'
        const targetObj = targetArray.find(item => item.name === name);

        if (!targetObj) {
            console.log('Objeto no encontrado');
            return;
        }

        const labelElement = document.querySelector('.card-header__label');
        labelElement.textContent = name;

        // Referencia al ul donde se insertarán los li
        const listElement = document.querySelector('.card-content__list');

        const templateContent = await cargarTemplate('/src/app/glossary/components/section-card-feature/section-card-feature.html');

        // Iterar sobre cada propiedad en targetObj
        Object.entries(targetObj).forEach(([key, value], index) => {
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

export async function buildInformativeGlossary(jsonURL){
    const response = await fetch(jsonURL);
    const jsonData = await response.json();

    var container = document.querySelector('.information-section__text-container');

    for (var key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            var section = document.createElement('section');
            section.className = 'information-section__field';
            
            var title = document.createElement('h2');
            title.className = 'information-section__field-title';
            title.textContent = key;
            
            var content = document.createElement('p');
            content.className = 'information-section__field-content';
            content.textContent = jsonData[key];

            section.appendChild(title);
            section.appendChild(content);
            
            container.appendChild(section);
        }
    }
}