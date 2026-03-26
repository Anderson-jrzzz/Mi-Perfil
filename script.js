document.addEventListener('DOMContentLoaded', () => {
    // --- 0. Animated Background (Canvas) ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    
    let words = [
        'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Git', 'SQL',
        'Frontend', 'Backend', 'Fullstack', 'Cloud', 'API', 'Docker', 'Agile',
        'TypeScript', 'DevOps', 'Cybersecurity', 'AI', 'Machine Learning',
        'Debug', 'Deploy', 'Algorithm', 'Database', 'JSON', 'Framework'
    ];

    let particles = [];
    const particleCount = 40;

    class WordParticle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.word = words[Math.floor(Math.random() * words.length)];
            this.fontSize = Math.random() * 15 + 10;
            this.speed = Math.random() * 0.5 + 0.2;
            this.opacity = Math.random() * 0.4 + 0.1;
        }

        draw() {
            ctx.font = `${this.fontSize}px 'Poppins'`;
            ctx.fillStyle = `rgba(0, 210, 255, ${this.opacity})`;
            ctx.fillText(this.word, this.x, this.y);
        }

        update() {
            this.y -= this.speed;
            if (this.y < -20) {
                this.y = canvas.height + 20;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new WordParticle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    resize();
    createParticles();
    animate();

    // --- 1. Mobile Menu Toggle ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // --- 2. Navbar Shadow on Scroll ---
    const header = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
            header.style.padding = '0.5rem 0';
            header.style.backgroundColor = 'rgba(11, 14, 20, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            header.style.padding = '1rem 0';
            header.style.backgroundColor = 'rgba(11, 14, 20, 0.9)';
        }
    });

    // --- 3. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. Scroll Animations (Intersection Observer) ---
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // --- 5. Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = '¡Enviado!';
            submitBtn.style.backgroundColor = '#2ecc71';
            submitBtn.disabled = true;
            
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // --- 6. Project Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-project-title');
    const modalContent = document.getElementById('modal-project-content');
    const closeBtn = document.querySelector('.close-modal');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const openBtn = card.querySelector('.open-modal');
        if (openBtn) {
            openBtn.addEventListener('click', () => {
                const title = card.querySelector('h3').innerText;
                const details = card.querySelector('.project-details').innerHTML;
                
                modalTitle.innerText = title;
                modalContent.innerHTML = details;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            });
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Extra CSS for JS Animations
const style = document.createElement('style');
style.innerHTML = `
    .hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    .nav-active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        right: 0;
        height: 92vh;
        top: 8vh;
        background-color: rgba(11, 14, 20, 0.98);
        width: 100%;
        align-items: center;
        justify-content: space-around;
        transform: translateX(0%);
        transition: transform 0.5s ease-in;
        z-index: 1000;
    }

    @keyframes navLinkFade {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0px); }
    }

    .toggle .line1 { transform: rotate(-45deg) translate(-5px, 6px); }
    .toggle .line2 { opacity: 0; }
    .toggle .line3 { transform: rotate(45deg) translate(-5px, -6px); }
`;
document.head.appendChild(style);
