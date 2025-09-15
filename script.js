document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animation Observer ---
    // Creates an IntersectionObserver that adds the 'show' class 
    // to elements when they come into view.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {  // Checks if element is visible in viewport
                entry.target.classList.add('show'); // Adds animation/visibility
            }
        });
    });

    // Selects all elements with class 'hidden' and observes them
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Active Nav Link on Scroll Observer ---
    // Tracks which section is currently visible and highlights 
    // the corresponding navigation link.
    const sections = document.querySelectorAll('section[id]'); // All sections with IDs
    const navLinks = document.querySelectorAll('nav .right a'); // All nav links on right

    // Observer for detecting active section
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {  // Section is visible
                navLinks.forEach(link => {
                    link.classList.remove('active'); // Remove 'active' from all links
                    // Match nav link href with section id
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active'); // Highlight current section link
                    }
                });
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of section is visible

    // Observe each section
    sections.forEach(section => sectionObserver.observe(section));


    // --- Contact Form Submission ---
    // Handles form submission with a fake delay and success message
    const form = document.getElementById('contact-form'); // Form element
    const statusEl = document.getElementById('form-status'); // Status message element

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents page reload on form submission
        
        // Display "sending" message
        statusEl.textContent = 'Sending...';
        statusEl.style.color = 'var(--primary-text-color)';

        // Simulate network delay (1.5 seconds)
        setTimeout(() => {
            // Show success message
            statusEl.textContent = 'Message sent successfully!';
            statusEl.style.color = '#38a169'; // Green color for success
            form.reset(); // Clear form inputs

            // Remove the success message after 5 seconds
            setTimeout(() => {
                statusEl.textContent = '';
            }, 5000);

        }, 1500);
    });

});
