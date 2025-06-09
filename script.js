document.addEventListener('DOMContentLoaded', function() {
    // --- Carrossel de Imagens ---
    const carousel = document.querySelector('.carrosel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const images = document.querySelectorAll('.carrosel img');
    
    let currentIndex = 0;
    const totalImages = images.length;
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });
    
    let carouselInterval = setInterval(() => {
        currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }, 5000); // Rotação a cada 5 segundos
    
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval); // Pausa no hover
    });
    
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000); // Retoma ao sair do hover
    });
    
    // --- Botão Voltar ao Topo ---
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 400) { // Aparece apos 400px de scroll
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // --- Rolagem Suave para Links de Navegação ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignora links vazios
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Ajusta o scroll para compensar o header fixo
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Fecha o menu hamburger em telas menores após clicar no link
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // --- Função Global para Rolagem de Seção (usada pelo botão "Saiba Mais") ---
    window.scrollToSection = function(id) {
        const element = document.querySelector('.' + id) || document.getElementById(id);
        if (element) {
            const headerOffset = document.querySelector('.header').offsetHeight;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    // --- Formulário de Newsletter ---
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmailInput = document.getElementById('newsletter-email');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio padrao do formulario
            
            if (newsletterEmailInput.value && newsletterEmailInput.value.includes('@') && newsletterEmailInput.value.length > 5) {
                alert('Obrigado por assinar nossa newsletter! Em breve, novidades em seu e-mail.');
                newsletterEmailInput.value = ''; // Limpa o campo
            } else {
                alert('Por favor, insira um endereço de e-mail válido para assinar.');
            }
        });
    }

    // --- Menu Hamburger (Mobile) ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // --- Animação de entrada para elementos do Hero (apenas uma vez ao carregar) ---
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaButton = document.querySelector('.cta-button');

    // Adiciona classes de animação ao carregar a página
    heroTitle.classList.add('animate-in');
    heroSubtitle.classList.add('animate-in', 'delay-1');
    ctaButton.classList.add('animate-in', 'delay-2');

    // --- Animação de Elementos ao Rolar (simulando "reveal on scroll") ---
    const sectionsToAnimate = document.querySelectorAll('.section-title, .about-text, .feature-item, .main-title, .main-description, .carousel-container, .grid-item, .history-title, .history-text, .cta-content h2, .cta-content p, .newsletter-form, .footer-about, .footer-links, .footer-contact, .icons');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% do elemento visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, observerOptions);

    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

});