/* ===================================
   Interactive Components - CHINOUE
   =================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ============ MENU CARD INTERACTION ============

    const menuCards = document.querySelectorAll('.menu__card');
    const menuModal = document.getElementById('menu-modal');

    menuCards.forEach(card => {
        card.addEventListener('click', function () {
            // Instead of expanding the card, we'll open the full menu modal
            // This provides a better experience than small accordion-style cards
            openModal(menuModal);
        });
    });


    // ============ MODAL SYSTEM ============

    const modals = document.querySelectorAll('.modal');
    const galleryItems = document.querySelectorAll('.gallery__item');
    const galleryModal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');

    // Generic open modal
    function openModal(modalEl) {
        modalEl.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    // Generic close modal
    function closeModal(modalEl) {
        modalEl.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    // Gallery Specific
    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const img = this.querySelector('.gallery__img');
            const caption = this.querySelector('.gallery__caption');

            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalCaption.textContent = caption.textContent;
            openModal(galleryModal);
        });
    });

    // Close buttons and overlays
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal__close');
        const overlay = modal.querySelector('.modal__overlay');

        if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
        if (overlay) overlay.addEventListener('click', () => closeModal(modal));
    });

    // ESC key to close all modals
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });


    // ============ CONTACT FORM LOGIC ============

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value
            };

            // Mock submission
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#4CAF50';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

});
