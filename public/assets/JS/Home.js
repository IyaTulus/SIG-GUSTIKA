
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button'); // Ambil tombol mobile
    const navLinks = document.getElementById('nav-links'); // Ambil div nav links

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('hidden'); // Toggle class 'hidden' Tailwind
            // Jika Anda menggunakan CSS kustom: navLinks.classList.toggle('active');
        });
         // Opsional: Tutup menu jika link diklik
         document.querySelectorAll('#nav-links a').forEach(link => {
             link.addEventListener('click', function() {
                 if (!navLinks.classList.contains('md:flex')) { // Jika bukan mode desktop
                     navLinks.classList.add('hidden'); // Sembunyikan menu mobile
                     // Jika Anda menggunakan CSS kustom: navLinks.classList.remove('active');
                 }
             });
         });
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Cek apakah link ada di dalam nav-links mobile (jika diimplementasikan)
        // dan apakah menu mobile terbuka. Jika iya, mungkin sembunyikan menunya.
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
