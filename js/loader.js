/* ===================================
   Loader Animation Script
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loader');
    const body = document.body;

    // Prevent scrolling during loader
    body.classList.add('no-scroll');

    // Auto-hide loader after 3 seconds
    setTimeout(() => {
        loader.classList.add('hidden');
        body.classList.remove('no-scroll');

        // Remove loader from DOM after fade-out
        setTimeout(() => {
            if (loader && loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 1200); // Match the CSS transition duration

    }, 3000); // 3-second display time
});
