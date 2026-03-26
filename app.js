document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initApp();
});

async function initApp() {
    try {
        const response = await fetch('content.json');
        const data = await response.json();
        
        renderServices(data.services);
        renderReviews(data.reviews);
        initAnimations();
        initNavigation();
        initForm();
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

function renderServices(services) {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = services.map(service => `
        <div class="service-card group p-8 bg-white border border-slate-100 rounded-2xl hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
            <div class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
                <i data-lucide="${service.icon}" class="w-6 h-6"></i>
            </div>
            <h3 class="text-xl font-medium mb-3">${service.title}</h3>
            <p class="text-slate-500 text-sm leading-relaxed">${service.desc}</p>
        </div>
    `).join('');
    
    lucide.createIcons();
}

function renderReviews(reviews) {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    container.innerHTML = reviews.map(review => `
        <div class="space-y-6">
            <div class="flex gap-1">
                ${Array(review.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-white text-white"></i>').join('')}
            </div>
            <p class="text-xl font-light italic leading-relaxed opacity-90">"${review.text}"</p>
            <div class="flex items-center gap-4">
                <div class="w-8 h-[1px] bg-white/30"></div>
                <span class="text-sm font-medium uppercase tracking-widest text-white/60">${review.author}</span>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

function initNavigation() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.menu-link');

    const toggleMenu = (show) => {
        mobileMenu.style.transform = show ? 'translateX(0)' : 'translateX(100%)';
        document.body.style.overflow = show ? 'hidden' : '';
    };

    mobileBtn?.addEventListener('click', () => toggleMenu(true));
    closeBtn?.addEventListener('click', () => toggleMenu(false));
    
    links.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });


    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('py-2', 'shadow-sm');
            nav.classList.remove('h-20');
        } else {
            nav.classList.remove('py-2', 'shadow-sm');
            nav.classList.add('h-20');
        }
    });
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);


    gsap.from('.hero-text > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });


    gsap.from('.hero-image', {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    });


    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                onEnter: () => el.classList.add('active')
            }
        });
    });


    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '#services-grid',
            start: "top 80%"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    });
}

function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Skickar...';
        btn.disabled = true;


        setTimeout(() => {
            btn.innerText = 'Meddelande Skickat!';
            btn.classList.add('bg-green-600');
            form.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('bg-green-600');
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}
