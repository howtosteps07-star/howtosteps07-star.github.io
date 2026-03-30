const fetchAppData = async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};

const renderServices = (services) => {
    const container = document.getElementById('services-container');
    if (!container) return;

    services.forEach((service, index) => {
        const card = document.createElement('div');
        card.className = 'bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 gs-reveal';
        card.innerHTML = `
            <div class="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-6 text-brand-dark">
                <i data-lucide="${service.icon}" class="w-6 h-6"></i>
            </div>
            <h3 class="text-lg font-semibold text-brand-dark leading-snug">${service.title}</h3>
        `;
        container.appendChild(card);
    });
};

const renderFeatures = (features) => {
    const container = document.getElementById('features-container');
    if (!container) return;

    features.forEach((feature) => {
        const item = document.createElement('div');
        item.className = 'text-center gs-reveal';
        item.innerHTML = `
            <div class="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6">
                <i data-lucide="${feature.icon}" class="w-8 h-8 text-brand-accent"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-200">${feature.title}</h3>
        `;
        container.appendChild(item);
    });
};

const renderReviews = (reviews) => {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    reviews.forEach((review) => {
        const card = document.createElement('div');
        card.className = 'bg-brand-light p-8 rounded-2xl border border-gray-100 gs-reveal';
        
        let starsHtml = '';
        for(let i=0; i<review.stars; i++) {
            starsHtml += '⭐️';
        }

        card.innerHTML = `
            <div class="text-xl mb-4 tracking-widest">${starsHtml}</div>
            <p class="text-gray-600 italic leading-relaxed text-lg">"${review.text}"</p>
        `;
        container.appendChild(card);
    });
};

const renderCompanyInfo = (company) => {
    const contactContainer = document.getElementById('contact-info-container');
    if (contactContainer) {
        contactContainer.innerHTML = `
            <a href="tel:${company.phoneRaw}" class="flex items-center gap-4 group">
                <div class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                    <i data-lucide="phone" class="w-5 h-5 text-gray-300 group-hover:text-brand-dark transition-colors"></i>
                </div>
                <div>
                    <p class="text-sm text-gray-400 mb-1">Telefon</p>
                    <p class="text-lg font-medium text-white">${company.phone}</p>
                </div>
            </a>
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <i data-lucide="map-pin" class="w-5 h-5 text-gray-300"></i>
                </div>
                <div>
                    <p class="text-sm text-gray-400 mb-1">Adress</p>
                    <p class="text-lg font-medium text-white">${company.address}</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <i data-lucide="file-text" class="w-5 h-5 text-gray-300"></i>
                </div>
                <div>
                    <p class="text-sm text-gray-400 mb-1">Organisationsnummer</p>
                    <p class="text-lg font-medium text-white">${company.orgNr}</p>
                </div>
            </div>
        `;
    }

    const footerInfo = document.getElementById('footer-info');
    if (footerInfo) {
        footerInfo.innerHTML = `
            <li class="text-gray-400 text-sm flex items-center gap-2">
                <i data-lucide="phone" class="w-4 h-4 text-brand-accent"></i>
                <a href="tel:${company.phoneRaw}" class="hover:text-white transition-colors">${company.phone}</a>
            </li>
            <li class="text-gray-400 text-sm flex items-center gap-2">
                <i data-lucide="map-pin" class="w-4 h-4 text-brand-accent"></i>
                <span>${company.address}</span>
            </li>
            <li class="text-gray-400 text-sm flex items-center gap-2">
                <i data-lucide="file-text" class="w-4 h-4 text-brand-accent"></i>
                <span>Org.nr: ${company.orgNr}</span>
            </li>
        `;
    }
};

const initMobileMenu = () => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    if (!btn || !menu) return;

    const toggleMenu = () => {
        menu.classList.toggle('hidden');
    };

    btn.addEventListener('click', toggleMenu);

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
};

const initForm = () => {
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin mx-auto"></i>';
        
        setTimeout(() => {
            form.reset();
            btn.innerHTML = originalText;
            lucide.createIcons();
            successMsg.classList.remove('hidden');
            
            setTimeout(() => {
                successMsg.classList.add('hidden');
            }, 5000);
        }, 1500);
    });
};

const initAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = document.querySelectorAll(".gs-reveal");
    
    revealElements.forEach((elem) => {
        gsap.fromTo(elem, 
            { autoAlpha: 0, y: 30 }, 
            {
                duration: 1, 
                autoAlpha: 1, 
                y: 0, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
};

const init = async () => {
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    const appData = await fetchAppData();
    
    if (appData) {
        renderServices(appData.services);
        renderFeatures(appData.features);
        renderReviews(appData.reviews);
        renderCompanyInfo(appData.company);
    }
    
    lucide.createIcons();
    initMobileMenu();
    initForm();
    
    setTimeout(() => {
        initAnimations();
    }, 100);
};

document.addEventListener('DOMContentLoaded', init);
