document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura();
});

async function cargarEstructura() {
    let appMain = document.getElementById('main');

    appMain.appendChild(await cargarTemplate('/src/app/shared/header/header.html'));

    appMain.appendChild(await cargarTemplate('/src/app/glossary/components/descriptive-glossary/descriptive-glossary.html'));

    await loadElementList();


    appMain.appendChild(await cargarTemplate('/src/app/shared/footer/footer.html'));
}

async function cargarTemplate(url) {
    let response = await fetch(url);
    let text = await response.text();

    let template = document.createElement('template');
    template.innerHTML = text;
    return document.importNode(template.content, true);
}

async function loadElementList() {
    let elementList = document.querySelector('.elements-section__list');

    const templateURL = '/src/app/glossary/components/descriptive-glossary-element/descriptive-glossary-element.html';

    // Inicializar un array para almacenar las promesas
    let promises = [];

    // Crear 4 elementos li, asignarles la clase 'element' y cargar el template
    for (let i = 0; i < 4; i++) {
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