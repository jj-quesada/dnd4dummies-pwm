# dnd4dummies-pwm
**[PWM] - Grupo 5**

# Para la correción del Sprint 2, tomar el contenido de la rama sprint2.

# Lanzar la aplicación

Para lanzar la aplicación web, ejecutar el archivo index.html ubicado en:

**/src/app/index.html**

## Estructura de la aplicación
Las páginas principales de cada sección se encuentran en su carpeta respectiva, siguiendo la estructura:

**/src/app/nombre-de-la-seccion/index.html**

\* (a excepción de character-creator, cuya página principal está en **/src/app/character-creator/character-creator.html**)


Toda página principal está construida a partir de template siguiendo la estructura:
- **Header**
- **Main**
    + A su vez con algún otro componente/template (opcional)
- **Footer**


### Mockups
Los mockups en Figma se ubican en el archivo: **"Mockups Figma.png"**


### Templates
Existen 3 templates que se usan en más de una sección de la web: **"header", "footer" y "character-card"**.
Estos se encuentran en la carpeta:

**/src/app/shared**


### Componentes/Templates de cada sección
Los componentes asociados a cada sección se encuentran siempre en la carpeta "components", siguiendo la estructura:

**/src/app/nombre-de-la-seccion/components**
