// script.js - versão otimizada

// Função principal do carrossel
function initCertificationsCarousel() {
    const carousel = document.querySelector('.cert-carousel');
    if (!carousel) return;

    const container = document.querySelector('.cert-carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.cert-carousel-prev');
    const nextBtn = document.querySelector('.cert-carousel-next');
    const dotsContainer = document.querySelector('.cert-dots');
    
    let currentIndex = 0;
    let itemWidth = 0;
    let itemsPerView = calculateItemsPerView();

    function calculateItemsPerView() {
        return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < items.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'mx-1', 'cursor-pointer', 'transition', 'bg-[#976a55]');
            dot.style.opacity = i === currentIndex ? '1' : '0.3';
            dot.addEventListener('click', () => goToIndex(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        itemsPerView = calculateItemsPerView();
        itemWidth = 100 / itemsPerView;
        
        items.forEach(item => {
            item.style.width = `${itemWidth}%`;
        });
        
        moveCarousel();
    }

    function moveCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
        updateDots();
    }

    function updateDots() {
        const dots = document.querySelectorAll('.cert-dots div');
        dots.forEach((dot, index) => {
            dot.style.opacity = index === currentIndex ? '1' : '0.3';
        });
    }

    function goToIndex(index) {
        currentIndex = Math.max(0, Math.min(index, items.length - itemsPerView));
        moveCarousel();
    }

    function next() {
        if (currentIndex < items.length - itemsPerView) {
            currentIndex++;
            moveCarousel();
        }
    }

    function prev() {
        if (currentIndex > 0) {
            currentIndex--;
            moveCarousel();
        }
    }

    // Event listeners
    prevBtn?.addEventListener('click', prev);
    nextBtn?.addEventListener('click', next);
    window.addEventListener('resize', updateCarousel);

    // Inicialização
    createDots();
    updateCarousel();
}

// Configurações iniciais quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Animações das barras de progresso
    const animateProgressBars = () => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };

    // Observador para animar quando a seção estiver visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) observer.observe(skillsSection);

    // Scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Inicializa o carrossel
    initCertificationsCarousel();
});