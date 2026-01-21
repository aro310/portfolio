        // --- 1. PARTICULES (Optimisé) ---
        const canvas = document.getElementById('bgCanvas');
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let particlesArray = [];
        const numberOfParticles = 70;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = 'rgba(0, 171, 240, 0.6)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        initParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                // Liens entre particules proches
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(0, 171, 240, ' + (1 - distance / 100) * 0.2 + ')';
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // --- 2. TYPEWRITER EFFECT ---
        const texts = [
        "Développeur Full-Stack Junior",
        "Développeur Python",
        "Créateur d’applications web & desktop modernes"
    ];

    const element = document.getElementById("typed");

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentText = texts[textIndex];

        if (!isDeleting) {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        } else {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        }

        let speed = isDeleting ? 100 : 200;

        // Quand le texte est complètement écrit
        if (!isDeleting && charIndex === currentText.length) {
            speed = 6000; // pause
            isDeleting = true;
        }

        // Quand le texte est complètement effacé
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500;
        }

        setTimeout(typeWriter, speed);
    }

    typeWriter();


        // --- 3. SCROLL REVEAL & NAVBAR ACTIVE ---
        let sections = document.querySelectorAll('section');
        let navLinks = document.querySelectorAll('header nav a');
        let revealElements = document.querySelectorAll('.reveal-on-scroll');
        let countersActivated = false;
        let statsSection = document.querySelector('.stats-section');

        window.onscroll = () => {
            let top = window.scrollY;

            // Active Navbar Link
            sections.forEach(sec => {
                let offset = sec.offsetTop - 150;
                let height = sec.offsetHeight;
                let id = sec.getAttribute('id');

                if(top >= offset && top < offset + height) {
                    navLinks.forEach(links => {
                        links.classList.remove('active');
                        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                    });
                }
            });

            // Sticky Header
            let header = document.querySelector('header');
            header.classList.toggle('sticky', top > 100);

            // Reveal Animation
            revealElements.forEach(el => {
                let windowHeight = window.innerHeight;
                let elementTop = el.getBoundingClientRect().top;
                let elementVisible = 100;
                if (elementTop < windowHeight - elementVisible) {
                    el.classList.add('show-animate');
                }
            });

            // Counters Activation
            if (statsSection.getBoundingClientRect().top < window.innerHeight && !countersActivated) {
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const increment = target / 50;
                    let count = 0;
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            counter.innerText = target;
                            clearInterval(timer);
                        } else {
                            counter.innerText = Math.ceil(count);
                        }
                    }, 40);
                });
                countersActivated = true;
            }
        };

        window.onload = () => {
            typeWriter();
        }