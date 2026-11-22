Plataforma Web de Material Académico — Colegio El Kairo (Prototipo TRL5)

Prototipo funcional desarrollado para la **Fase 4 - Desarrollo de la propuesta ingenieril** del curso **Proyecto de Grado (202016907A\_2204)** - Universidad Nacional Abierta y a Distancia (UNAD)

*Autor:* Jaider Javier Henriquez Chima  
*Tutor:* Orlando Gomez Barboza

\---------------------------------------------------------------------------------------------------------------------------------------------

1\. Descripción general

Aplicación web ligera diseñada para centralizar, organizar, clasificar, buscar y consultar materiales académicos del **Colegio El Kairo** (guías PDF, talleres, lecturas, presentaciones y enlaces educativos), respondiendo a los requerimientos funcionales (`RF-01` a `RF-08`) y no funcionales (`RNF-01` a `RNF-06`) definidos en el documento maestro

2\. Arquitectura y tecnologías utilizadas

Para garantizar sostenibilidad de, cero costo de licenciamiento, portabilidad y facilidad de mantenimiento (`RNF-05`), se implementó una arquitectura web cliente de tres capas lógicas:

*Capa de presentación:*HTML5 semántico y CSS3 responsivo (Grid/Flexbox) con soporte de navegación por teclado y alto contraste (`RNF-01`, `RNF-03`, `RNF-04`).

*Capa lógica:* JavaScript (ES6+) modular para filtrado multicriterio, validación de formularios, control de acceso básico y gestión de estados activo/inactivo (`RF-01` a `RF-08`, `RNF-02`).

*Capa de persistencia:* Almacenamiento estructurado en formato JSON mediante `localStorage` del navegador, precargado con datos de demostración sin información personal real (`RNF-06`).

3\. Instrucciones de instalación y ejecución

No requiere instalación de servidores externos, bases de datos complejas ni dependencias adicionales:

1. Descargue o clone este repositorio en su equipo.
2. Abra la carpeta prototipo\_elkairo.
3. Haga doble clic sobre el archivo index.html para abrirlo en cualquier navegador web moderno como Chrome, Edge, Firefox o Safari

4\. Credenciales de acceso administrativo (Demostración)

Para probar las funciones de registro, edición y activación/desactivación de materiales (`RF-05`, `RF-06`, `RNF-02`):

Usuario: docente
Contraseña: elkairo2026


Nota: Credenciales ficticias exclusivas para validación del prototipo en entorno simulado TRL5, cumpliendo con la Ley 1581 de 2012 y el requerimiento RNF-06*

