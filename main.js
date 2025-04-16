document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Typing animation
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.querySelector('.scroll-to-top a');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });

    // Project Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.querySelector('.projects-grid');

    // Sample project data - replace with your actual projects
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Website',
            description: 'A fully responsive e-commerce platform with user authentication, product catalog, and payment integration.',
            image: 'img/projects/ecommerce.png',
            tags: ['Bootstrap HTML', 'flask', 'MongoDB'],
            category: 'web',
            demoLink: 'https://example.com/demo',
            codeLink: 'https://github.com/yourusername/ecommerce'
        },
        {
            id: 2,
            title: 'Data Visualization Dashboard',
            description: 'Interactive dashboard for visualizing complex datasets with filtering and export capabilities.',
            image: 'img/projects/dashboard.png',
            tags: ['Python', 'D3.js', 'Flask', 'Pandas'],
            category: 'data',
            demoLink: 'https://example.com/dashboard',
            codeLink: 'https://github.com/yourusername/dashboard'
        },
        {
            id: 3,
            title: 'Machine Learning Model',
            description: 'Predictive model for Diagnosing patients with over 85% accuracy.',
            image: 'img/projects/ml.jpg',
            tags: ['Python', 'Scikit-learn', 'TensorFlow', 'Jupyter'],
            category: 'data',
            demoLink: 'https://example.com/ml-model',
            codeLink: 'https://github.com/yourusername/ml-model'
        },
        {
            id: 4,
            title: 'Portfolio Website',
            description: 'Personal portfolio website showcasing projects and skills.',
            image: 'img/projects/portfolio.jpg',
            tags: ['HTML', 'CSS', 'JavaScript'],
            category: 'web',
            demoLink: 'https://wanjau.netlify.app/',
            codeLink: 'https://github.com/wanjau2/portfolio'
        },
        {
            id: 5,
            title: 'Task Management App',
            description: 'A productivity application for managing tasks, projects, and deadlines.',
            image: 'img/projects/taskapp.png',
            tags: ['HTML', 'Firebase', 'CSS'],
            category: 'web',
            demoLink: 'https://todotracker2.netlify.app/',
            codeLink: 'https://github.com/wanjau2/Task-tracker'
        },
        {
            id: 6,
            title: 'Gas Detection System',
            description: 'An IOT based system for detecting gas leaks in buildings.Sends the owners alerts on their phones when a gas leak is detected.',
            image: 'img/projects/opensource.png',
            tags: ['javaScript', 'Flask', 'python','Arduino'],
            category: 'other',
            demoLink: 'https://example.com/opensource',
            codeLink: 'https://github.com/e-mutai/Gas-Detection'
        }
    ];

    // Function to create project cards
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = `project-card ${project.category}`;
        card.setAttribute('data-aos', 'fade-up');
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoLink}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                    <a href="${project.codeLink}" target="_blank"><i class="fab fa-github"></i> View Code</a>
                </div>
            </div>
        `;
        
        // Add click event to open modal
        card.addEventListener('click', () => openProjectModal(project));
        
        return card;
    }

    // Function to filter projects
    function filterProjects(category) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // First remove all cards for animation purposes
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            }, 300);
        });
    }

    // Initialize projects
    function initProjects() {
        if (!projectsGrid) return;
        
        // Clear existing projects
        projectsGrid.innerHTML = '';
        
        // Add project cards to the grid
        projects.forEach(project => {
            projectsGrid.appendChild(createProjectCard(project));
        });
        
        // Show all projects initially
        filterProjects('all');
    }

    // Add click event to filter buttons
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Filter projects
                const category = button.getAttribute('data-filter');
                filterProjects(category);
            });
        });
    }

    // Project Modal Functionality
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');
    
    function openProjectModal(project) {
        if (!modal) return;
        
        // Set modal content
        const modalImage = modal.querySelector('.modal-image img');
        const modalTitle = modal.querySelector('.modal-body h2');
        const modalTags = modal.querySelector('.modal-tags');
        const modalDescription = modal.querySelector('.modal-description');
        const modalLinks = modal.querySelector('.modal-links');
        
        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalTitle.textContent = project.title;
        
        modalTags.innerHTML = '';
        project.tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            modalTags.appendChild(span);
        });
        
        modalDescription.textContent = project.description;
        
        modalLinks.innerHTML = `
            <a href="${project.demoLink}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
            <a href="${project.codeLink}" target="_blank"><i class="fab fa-github"></i> View Code</a>
        `;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal when clicking on close button
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside of modal content
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Update form attributes for FormSubmit service
        contactForm.setAttribute('action', 'https://formsubmit.co/eugenewanjau@gmail.com');
        contactForm.setAttribute('method', 'POST');
        
        // Create hidden inputs for FormSubmit configuration
        const hiddenSubject = document.createElement('input');
        hiddenSubject.type = 'hidden';
        hiddenSubject.name = '_subject';
        hiddenSubject.value = 'New Portfolio Contact Message';
        contactForm.prepend(hiddenSubject);
        
        const hiddenCaptcha = document.createElement('input');
        hiddenCaptcha.type = 'hidden';
        hiddenCaptcha.name = '_captcha';
        hiddenCaptcha.value = 'false';
        contactForm.prepend(hiddenCaptcha);
        
        const hiddenTemplate = document.createElement('input');
        hiddenTemplate.type = 'hidden';
        hiddenTemplate.name = '_template';
        hiddenTemplate.value = 'table';
        contactForm.prepend(hiddenTemplate);

        // Add honeypot field to prevent spam
        const honeypotField = document.createElement('input');
        honeypotField.type = 'text';
        honeypotField.name = '_honey';
        honeypotField.style.display = 'none';
        contactForm.prepend(honeypotField);
        
        // Set redirect to thanks.html page
        const hiddenNext = document.createElement('input');
        hiddenNext.type = 'hidden';
        hiddenNext.name = '_next';
        hiddenNext.value = 'https://wanjau.netlify.app/thanks.html';
        contactForm.prepend(hiddenNext);
    }

    // Initialize projects
    initProjects();
});