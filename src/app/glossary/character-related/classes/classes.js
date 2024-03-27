import { cargarEstructura, sideBar } from '/dnd4dummies-pwm/src/app/fetch.js';
import { loadElementListFromJSON, cargarSectionCard } from '/dnd4dummies-pwm/src/app/glossary/glossary-utilities.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/dnd4dummies-pwm/src/app/glossary/components/descriptive-glossary/descriptive-glossary.html');
    document.querySelector('.banner__hover-text').textContent = "Classes Section";
    await loadElementListFromJSON('classes.json', 'classes');
    await cargarSectionCard();
    await sideBar();
});

