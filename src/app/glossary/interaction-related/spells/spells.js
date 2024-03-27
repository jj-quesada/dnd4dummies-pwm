import { cargarEstructura, sideBar } from '/dnd4dummies-pwm/src/app/fetch.js';
import { loadElementListFromJSON, cargarSectionCard } from '/dnd4dummies-pwm/src/app/glossary/glossary-utilities.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/dnd4dummies-pwm/src/app/glossary/components/descriptive-glossary/descriptive-glossary.html');
    document.querySelector('.banner__hover-text').textContent = "Spells";
    await loadElementListFromJSON('spells.json', 'allSpells');
    await cargarSectionCard();
    await sideBar();
});
