import { cargarEstructura, sideBar } from '/dnd4dummies-pwm/src/app/fetch.js';
import { buildInformativeGlossary } from '/dnd4dummies-pwm/src/app/glossary/glossary-utilities.js';

document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura('/dnd4dummies-pwm/src/app/glossary/components/informative-glossary/informative-glossary.html');
    document.querySelector('.banner__hover-text').textContent = "Combat Section";
    document.querySelector('.information-section__image').src = "/dnd4dummies-pwm/src/assets/images/combat.jpg";
    await buildInformativeGlossary('combat.json');
    await sideBar();
});
