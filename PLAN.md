Actúa como un desarrollador Frontend Senior experto en Next.js (App Router), Tailwind CSS y Supabase. Necesito que crees un sitio web para el club de tenis "Fortin Racket Club". Por favor, crea primero la estructura de archivos en el proyecto, configura el archivo de configuración de Tailwind con los colores requeridos y comenzaremos a implementar etapa por etapa siguiendo el archivo PLAN.md

### ESTRUCTURA DE COMPONENTES Y SECCIONES A DESARROLLAR:

Por favor, genera el código estructurado en componentes limpios para las siguientes secciones:

1. Navigation Bar (Header):
   - Logo a la izquierda ("Fortin Racket Club" con acento #142d4b).
   - Menú central: Inicio, ¿Quienes somos?, Reservas, Socios, Actividades, Contacto.
   - Comportamiento: Transparente y superpuesto sobre el Hero.

2. Hero Section:
   - Slider/Carrusel (usa un estado de React básico para las flechas laterales).
   - Imagen de fondo a pantalla completa, overlay oscuro, título "Fortin Racket Club" en mayúsculas grandes, párrafo descriptivo y un botón ovalado #142d4b ("Saber más").

3. Servicios Grilla:
   - Layout de 4 tarjetas verticales con esquinas superiores redondeadas (Hover effect de elevación).
   - Items: Reserva de canchas, Entrenamientos personales, Escuela infantil y Actividades. Cada uno con imagen, texto corto y enlace "Saber más".

4. Empieza hoy! Clases personalizadas:
   - Bloque asimétrico de 2 columnas de ancho completo. Izquierda: Imagen de tenista recortada. Derecha: Lista numerada estilizada (01, 02, 03) para Clases individuales, Clases Grupales y Clases sociales, con breve descripción en cada una y texto con hipervínculo "Saber más".

5. Torneo & Calendario:
   - Bloque simétrico de 3 columnas de ancho completo:
     - Columna #93d419 (Izquierda): título "Fortín Club Cup", Lista de beneficios con checkmarks (✓) y botón ovalado #142d4b ("Saber más").
     - Columna #142d4b (Centro): Agenda de partidos dinámicos traídos desde Supabase (Campos: Fecha, Jugadores, Cancha). Incluye botón ovalado #93d419 ("Ver más").
     - Columna Derecha: Imagen estática de jugador de tenis en acción.

6. Beneficios Grilla ("Full Comfort para Miembros"):
   - Disposición de rejilla (Grid) que rodee una imagen central fija de una raqueta y pelotas. 
   - 6 bloques simétricos con iconos #142d4b para: 2 canchas, coaches profesionales, torneos, guardarropa, campos de entrenamiento y Barbacoa.

7. CTA Banner & Patrocinadores Carousel:
   - Banner horizontal con fondo de cancha de polvo de ladrillo, texto promocional de Primera clase GRATIS! e incluye botón ovalado #142d4b ("Saber más").
   - Debajo, un carrusel estático e infinito en color #142d4b con logotipos de patrocinadores en blanco.

8. Entrenadores (Integración Supabase):
   - Sección con fondo color #f7f7f7. Grilla que renderice las tarjetas de los coaches en gris claro con: foto, nombres, cargos y breve descripción. Los datos deben consumirse desde una tabla `coaches` en Supabase.

9. Planes de Socio:
    - Grid de 4 columnas de precios (Principiante $29, AdvAvanzado $59, Profesional $90, Full $120).
    - La tarjeta "Full" debe estar destacada, tendrá una imágen de fondo de una raqueta con una pelota de tennis y por encima un color #142d4b con 75% de opacidad, y un badge rojo que diga "Recomendado". 
    - Todas las tarjetas tendrán: Lista de ventajas con "X" grises o "✓" verdes según el plan y botón ovalado #142d4b "Comprar" o #f7f7f7 en el caso del destacado.

10. Reserva de canchas:
    - Grid asimétrico con una imágenes de estilo de vida del club a la izquierda y una caja #142d4b destacada que exponga en grande el horario (09:00 - 23:00) y el precio por hora ($999)
    - Debajo ocupando todo el ancho de las 2 grillas de arriba se encuentra la sección de reservar cancha. Con un botón de reservar en #142d4b en los horarios que esten disponibles y en los horarios no disponibles el botón será gris y no clickeable.

11. Estadísticas contador:
    - Fila blanca minimalista con contadores estáticos grandes: 2 Canchas, 10 Coaches, 124 Socios, 18 Torneos Organizados.

12. Testimonials:
    - Sección con un icono de comillas gigantes en #142d4b, slider de texto de reseñas de usuarios y la foto circular del autor del testimonio.

13. Newsletter & Footer:
    - Barra de suscripción con input de email y botón verde sobre fondo con una imágen de raquetas cruzadas y por encima un color #142d4b con 75% opacidad.
    - Footer de 3 columnas: 1) Info corporativa + Teléfono + Redes. 2) Links internos rápidos + Botón "Contacto" que te lleva al whatsapp. 3) Grid de fotos recientes tipo Instagram (6 imágenes). Fondo: #142d4b
    - Sub-footer con fondo #0d1d30 con copyright a la izquierda, y a la derecha un botón funcional con el ícono de una pelota de tenis y un texto "Volver al inicio" que haga scroll suave hacia arriba.