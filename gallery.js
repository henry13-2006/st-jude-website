t // Gallery page functionality

document.addEventListener('DOMContentLoaded', function() {
    loadSavedImages();
});

function loadSavedImages() {
    const savedImages = JSON.parse(localStorage.getItem('stjude_images')) || [];
    const gallery = document.getElementById('image-gallery');

    // Clear existing images
    gallery.innerHTML = '';

    // Add saved images
    savedImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.name;
        imgElement.style.objectFit = 'cover';
        imgElement.style.borderRadius = '10px';
        imgElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        gallery.appendChild(imgElement);
    });

    // If no images, show message
    if (savedImages.length === 0) {
        gallery.innerHTML = '<p style="text-align: center; color: #fff; font-size: 1.2rem;">No images uploaded yet.</p>';
    }
}
