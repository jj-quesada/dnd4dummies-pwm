document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura();
});

async function cargarEstructura() {
    let appMain = document.getElementById('app');

    appMain.appendChild(await cargarTemplate('./shared/header/header.html'));
    appMain.appendChild(await cargarTemplate('./home-page/index-main-component.html'));
    appMain.appendChild(await cargarTemplate('./shared/footer/footer.html'));
}

async function cargarTemplate(url) {
    let response = await fetch(url);
    let text = await response.text();

    let template = document.createElement('template');
    template.innerHTML = text;
    return document.importNode(template.content, true);
}