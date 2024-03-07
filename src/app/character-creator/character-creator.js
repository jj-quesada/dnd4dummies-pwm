document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura();

});

async function cargarEstructura() {
    let appMain = document.getElementById('main');

    appMain.appendChild(await cargarTemplate('/src/app/shared/header/header.html'));

    appMain.appendChild( await cargarTemplate('./components/main-page/main-page.html'));

    await loadLoreSections();

    appMain.appendChild(await cargarTemplate('/src/app/shared/footer/footer.html'));
}

async function cargarTemplate(url) {
    let response = await fetch(url);
    let text = await response.text();

    let template = document.createElement('template');
    template.innerHTML = text;
    return document.importNode(template.content, true);
}


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
