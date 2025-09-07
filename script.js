document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animation Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Active Nav Link on Scroll Observer ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav .right a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    sections.forEach(section => sectionObserver.observe(section));


    // --- Contact Form Submission ---
    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('form-status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        statusEl.textContent = 'Sending...';
        statusEl.style.color = 'var(--primary-text-color)';

        // Simulate network delay
        setTimeout(() => {
            statusEl.textContent = 'Message sent successfully!';
            statusEl.style.color = '#38a169'; // Green color for success
            form.reset();

            // Remove the success message after a few seconds
            setTimeout(() => {
                statusEl.textContent = '';
            }, 5000);

        }, 1500);
    });

});
