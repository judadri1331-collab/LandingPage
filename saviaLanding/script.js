// ============================================
// SAVIA LANDING PAGE - JavaScript Principal
// ============================================
// Archivo completo de funcionalidad para la
// página de aterrizaje de Savia.
// Sin dependencias externas — Vanilla JS puro.
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────────
  // 1. MENÚ MÓVIL
  // ──────────────────────────────────────────

  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  // Crear overlay dinámicamente para el menú móvil
  const menuOverlay = document.createElement('div');
  menuOverlay.classList.add('menu-overlay');
  body.appendChild(menuOverlay);

  /**
   * Abre o cierra el menú móvil alternando las clases necesarias.
   */
  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
    menuOverlay.classList.toggle('active');
  };

  /**
   * Cierra el menú móvil si está abierto.
   */
  const closeMenu = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    body.classList.remove('menu-open');
    menuOverlay.classList.remove('active');
  };

  // Alternar menú al hacer clic en el hamburger
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Cerrar menú al hacer clic en un enlace de navegación
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Cerrar menú al hacer clic en el overlay
  menuOverlay.addEventListener('click', () => {
    closeMenu();
  });

  // Cerrar menú al presionar la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // ──────────────────────────────────────────
  // 2. EFECTO DE SCROLL EN EL HEADER
  // ──────────────────────────────────────────

  const siteHeader = document.querySelector('.site-header');
  const SCROLL_THRESHOLD = 50;

  /**
   * Añade o elimina la clase .scrolled del header
   * según la posición del scroll vertical.
   */
  const handleHeaderScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };

  // Ejecutar inmediatamente por si la página se carga ya desplazada
  handleHeaderScroll();

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ──────────────────────────────────────────
  // 3. SMOOTH SCROLL (Desplazamiento suave)
  // ──────────────────────────────────────────

  const HEADER_OFFSET = 80; // Altura del header fijo en px

  /**
   * Desplaza la vista suavemente hasta un elemento destino,
   * compensando la altura del header fijo.
   * @param {string} targetSelector - Selector CSS del elemento destino.
   */
  const smoothScrollTo = (targetSelector) => {
    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) return;

    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - HEADER_OFFSET;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  // Capturar todos los enlaces ancla internos
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Ignorar enlaces vacíos o que solo son "#"
      if (!href || href === '#') return;

      e.preventDefault();

      // Cerrar el menú móvil si está abierto
      closeMenu();

      // Desplazar suavemente a la sección destino
      smoothScrollTo(href);
    });
  });

  // ──────────────────────────────────────────
  // 4. ANIMACIÓN DE REVELACIÓN POR SCROLL
  //    (Scroll Reveal con IntersectionObserver)
  // ──────────────────────────────────────────

  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Añadir clase .active para activar la animación CSS
            entry.target.classList.add('active');
            // Dejar de observar el elemento una vez revelado
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  // ──────────────────────────────────────────
  // 5. ANIMACIÓN DE HOJAS FLOTANTES (Hero)
  // ──────────────────────────────────────────

  /**
   * Genera hojas flotantes decorativas dentro del contenedor
   * .floating-leaves del hero.
   * @param {number} count - Número de hojas a crear (por defecto 10).
   */
  const createFloatingLeaves = (count = 10) => {
    const container = document.querySelector('.floating-leaves');
    if (!container) return;

    const leafEmojis = ['🍃', '🌿', '🍂'];

    for (let i = 0; i < count; i++) {
      const leaf = document.createElement('span');
      leaf.classList.add('leaf');

      // Seleccionar un emoji aleatorio
      const emoji = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
      leaf.textContent = emoji;

      // Valores aleatorios para variación natural
      const leftPos = Math.random() * 100;                    // Posición horizontal 0-100%
      const duration = 15 + Math.random() * 10;               // Duración 15-25s
      const delay = Math.random() * 10;                       // Retraso 0-10s
      const fontSize = 1 + Math.random() * 1.5;               // Tamaño 1-2.5rem
      const opacity = 0.12 + Math.random() * 0.08;            // Opacidad 0.12-0.20

      // Aplicar estilos en línea
      leaf.style.position = 'absolute';
      leaf.style.left = `${leftPos}%`;
      leaf.style.fontSize = `${fontSize}rem`;
      leaf.style.opacity = opacity;
      leaf.style.animation = `floatLeaf ${duration}s ${delay}s linear infinite`;
      leaf.style.pointerEvents = 'none';
      leaf.style.userSelect = 'none';
      leaf.style.top = '-5%';

      container.appendChild(leaf);
    }
  };

  // Generar las hojas flotantes
  createFloatingLeaves(10);

  // ──────────────────────────────────────────
  // 6. VALIDACIÓN DEL FORMULARIO DE CONTACTO
  // ──────────────────────────────────────────

  const contactForm = document.getElementById('contactForm');

  /**
   * Muestra un mensaje de error para un campo específico.
   * @param {string} fieldId - El ID del campo con error.
   * @param {string} message - El mensaje de error a mostrar.
   */
  const showError = (fieldId, message) => {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const formGroup = field.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.add('error');

    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
    }
  };

  /**
   * Limpia el error de un campo específico.
   * @param {string} fieldId - El ID del campo a limpiar.
   */
  const clearError = (fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const formGroup = field.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.remove('error');

    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    }
  };

  /**
   * Valida una dirección de correo electrónico.
   * @param {string} email - La dirección de correo a validar.
   * @returns {boolean} true si el correo es válido.
   */
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  if (contactForm) {
    // Definición de reglas de validación para cada campo
    const validationRules = {
      nombre: {
        required: true,
        minLength: 2,
        message: 'El nombre debe tener al menos 2 caracteres.',
      },
      email: {
        required: true,
        isEmail: true,
        message: 'Por favor, ingresa un correo electrónico válido.',
      },
      telefono: {
        required: true,
        minLength: 8,
        isDigits: true,
        message: 'El teléfono debe tener al menos 8 dígitos.',
      },
      comuna: {
        required: true,
        minLength: 2,
        message: 'La comuna debe tener al menos 2 caracteres.',
      },
      servicio: {
        required: true,
        isSelect: true,
        message: 'Por favor, selecciona un servicio.',
      },
      mensaje: {
        required: true,
        minLength: 10,
        message: 'El mensaje debe tener al menos 10 caracteres.',
      },
    };

    /**
     * Valida un campo individual según sus reglas.
     * @param {string} fieldId - El ID del campo a validar.
     * @returns {boolean} true si el campo es válido.
     */
    const validateField = (fieldId) => {
      const rules = validationRules[fieldId];
      if (!rules) return true;

      const field = document.getElementById(fieldId);
      if (!field) return true;

      const value = field.value.trim();

      // Validar campo requerido
      if (rules.required && value === '') {
        showError(fieldId, rules.message);
        return false;
      }

      // Validar longitud mínima (no aplica a selects)
      if (rules.minLength && value.length < rules.minLength) {
        showError(fieldId, rules.message);
        return false;
      }

      // Validar formato de email
      if (rules.isEmail && !validateEmail(value)) {
        showError(fieldId, rules.message);
        return false;
      }

      // Validar que solo contenga dígitos
      if (rules.isDigits) {
        const digitsOnly = value.replace(/[\s\-\+\(\)]/g, '');
        if (digitsOnly.length < rules.minLength || !/^\d+$/.test(digitsOnly)) {
          showError(fieldId, rules.message);
          return false;
        }
      }

      // Campo válido: limpiar cualquier error previo
      clearError(fieldId);
      return true;
    };

    // Validación en tiempo real: limpiar errores mientras el usuario escribe
    Object.keys(validationRules).forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (!field) return;

      const eventType = field.tagName === 'SELECT' ? 'change' : 'input';
      field.addEventListener(eventType, () => {
        clearError(fieldId);
      });
    });

    // Manejar envío del formulario
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;

      // Validar todos los campos
      Object.keys(validationRules).forEach((fieldId) => {
        const isFieldValid = validateField(fieldId);
        if (!isFieldValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        // Ocultar formulario y mostrar mensaje de éxito
        contactForm.style.display = 'none';

        const successMessage = document.querySelector('.form-success');
        if (successMessage) {
          successMessage.classList.add('visible');
        }

        // Reiniciar formulario después de 5 segundos y mostrarlo de nuevo
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = '';

          if (successMessage) {
            successMessage.classList.remove('visible');
          }

          // Limpiar todos los errores visuales por si acaso
          Object.keys(validationRules).forEach((fieldId) => {
            clearError(fieldId);
          });
        }, 5000);
      }
    });
  }

  // ──────────────────────────────────────────
  // 7. BOTONES DEL HERO
  // ──────────────────────────────────────────

  // Botón "Solicitar cotización" → desplazar a #contacto
  const cotizacionBtn = document.querySelector('.hero .btn-primary, .hero a[href="#contacto"]');
  if (cotizacionBtn) {
    cotizacionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
      smoothScrollTo('#contacto');
    });
  }

  // Botón "Ver servicios" → desplazar a #servicios
  const serviciosBtn = document.querySelector('.hero .btn-secondary, .hero a[href="#servicios"]');
  if (serviciosBtn) {
    serviciosBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
      smoothScrollTo('#servicios');
    });
  }

  // ──────────────────────────────────────────
  // 8. BOTONES DE TARJETAS DE SERVICIOS
  // ──────────────────────────────────────────

  const serviceButtons = document.querySelectorAll('.btn-service');
  serviceButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
      smoothScrollTo('#contacto');
    });
  });

  // ──────────────────────────────────────────
  // 9. ANIMACIÓN DE CONTADORES
  // ──────────────────────────────────────────

  /**
   * Anima un número desde 0 hasta su valor final.
   * @param {HTMLElement} element - Elemento que contiene el número.
   * @param {number} target - Valor numérico final.
   * @param {number} duration - Duración de la animación en ms.
   */
  const animateCounter = (element, target, duration = 2000) => {
    const startTime = performance.now();
    const startValue = 0;

    // Detectar si el valor original tenía un sufijo (e.g. "50+", "100%")
    const originalText = element.textContent.trim();
    const suffix = originalText.replace(/[\d.,]/g, '');

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Función de easing: ease-out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);

      const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
      element.textContent = currentValue.toLocaleString('es-CL') + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  // Seleccionar todos los contadores (elementos con data-count o clase .stat-number)
  const counters = document.querySelectorAll('[data-count], .stat-number, .counter');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;

            // Obtener el valor objetivo del atributo data-count o del texto
            const targetValue =
              parseInt(el.getAttribute('data-count'), 10) ||
              parseInt(el.textContent.replace(/[^\d]/g, ''), 10) ||
              0;

            if (targetValue > 0) {
              animateCounter(el, targetValue, 2000);
            }

            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  // ──────────────────────────────────────────
  // 10. ESTADO ACTIVO DEL NAVBAR
  // ──────────────────────────────────────────

  /**
   * Determina qué sección está visible y marca el enlace
   * correspondiente en la navegación como activo.
   */
  const handleActiveNavOnScroll = () => {
    const sections = document.querySelectorAll('section[id]');
    const navMenuLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    if (sections.length === 0 || navMenuLinks.length === 0) return;

    const scrollPosition = window.scrollY + HEADER_OFFSET + 100;

    let currentSectionId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Si estamos al final de la página, activar la última sección
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        currentSectionId = lastSection.getAttribute('id');
      }
    }

    // Actualizar clase activa en los enlaces de navegación
    navMenuLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  // Ejecutar al cargar por si la página ya está desplazada
  handleActiveNavOnScroll();

  window.addEventListener('scroll', handleActiveNavOnScroll, { passive: true });

}); // Fin de DOMContentLoaded
