document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura();
    // Nota: Ya no es necesario llamar a loadLoreSections aquí, se llamará después de cargar main-page.
});

async function cargarEstructura() {
    let appMain = document.getElementById('main');

    // Cargar el header
    appMain.appendChild(await cargarTemplate('/src/app/shared/header/header.html'));

    // Cargar main-page y después cargar las secciones de lore
    const mainPageContent = await cargarTemplate('./components/main-page/main-page.html');
    appMain.appendChild(mainPageContent);
    await loadLoreSections(); // Llamada explícita aquí

    // Cargar el footer
    appMain.appendChild(await cargarTemplate('/src/app/shared/footer/footer.html'));
}

async function cargarTemplate(url) {
    let response = await fetch(url);
    let text = await response.text();

    let template = document.createElement('template');
    template.innerHTML = text;
    return document.importNode(template.content, true);
}

// Función loadLoreSections() tal como se define en main-page.js
async function loadLoreSections() {
    let loreSections = document.querySelectorAll('.lore .lore__section');

    const templateURL = '/src/app/character-creator/components/lore-section/lore-section.html';

    const promises = Array.from(loreSections).map(section => 
        cargarTemplate(templateURL).then(content => {
            section.appendChild(content);
        })
    );

    await Promise.all(promises);
}
