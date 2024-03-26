import { cargarEstructura, sideBar  } from '/src/app/fetch.js';
import { loadElementListFromJSON, cargarSectionCard} from '/src/app/glossary/glossary-utilities.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/src/app/glossary/components/descriptive-glossary/descriptive-glossary.html');
    document.querySelector('.banner__hover-text').textContent = "Adventuring Gear Section";
    await loadElementListFromJSON('adventuring-gear.json', 'adventuring-gear');
    await cargarSectionCard();
    await sideBar();
});
