function redirectToGallery() {
    document.querySelector(".log-out-button").classList.remove('hidden');
    const container = document.getElementById('login-container');
    container.classList.add('hidden');

    createGalleryPage();
}

function redirectToLogin() {
    document.querySelector(".log-out-button").classList.add('hidden');
    const galleryWrapper = document.querySelector('.wrapper');
    if (galleryWrapper) {
        galleryWrapper.remove();
    }

    const container = document.getElementById('login-container');
    container.classList.remove('hidden');
}