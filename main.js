
lucide.createIcons();


const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
        navbar.classList.replace('border-white/5', 'border-white/10');
    } else {
        navbar.classList.remove('shadow-lg');
        navbar.classList.replace('border-white/10', 'border-white/5');
    }
});


function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', reveal);


const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Skickar...`;
        lucide.createIcons();
        

        setTimeout(() => {
            btn.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i> Skickat!`;
            btn.classList.replace('bg-brand-500', 'bg-green-500');
            lucide.createIcons();
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.replace('bg-green-500', 'bg-brand-500');
                lucide.createIcons();
            }, 3000);
        }, 1500);
    });
}
