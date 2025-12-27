// Main functionality for St. Jude's website

document.addEventListener('DOMContentLoaded', function() {
    // Load saved news and images on page load
    loadSavedNews();
    loadSavedImages();
});

function loadSavedNews() {
    const savedNews = JSON.parse(localStorage.getItem('stjude_news')) || [];
    const newsGrid = document.querySelector('.news-grid');

    // Clear existing news
    newsGrid.innerHTML = '';

    // Add saved news
    savedNews.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h4>${news.title}</h4>
            <p>${news.content}</p>
            <small>${news.date}</small>
        `;
        newsGrid.appendChild(newsItem);
    });

    // If no news, show default
    if (savedNews.length === 0) {
        newsGrid.innerHTML = `
            <div class="news-item">
                <h4>School Reopening</h4>
                <p>Exciting updates on our new academic year. Stay tuned for more details.</p>
            </div>
            <div class="news-item">
                <h4>Extracurricular Activities</h4>
                <p>Join our sports and clubs for a well-rounded experience.</p>
            </div>
            <div class="news-item">
                <h4>Academic Achievements</h4>
                <p>Celebrating the success of our students in recent examinations.</p>
            </div>
        `;
    }
}

function loadSavedImages() {
    try {
        const savedImages = JSON.parse(localStorage.getItem('stjude_images')) || [];
        const gallery = document.getElementById('image-gallery');
        const slideshow = document.getElementById('slideshow');

        console.log('Loading images function called, images:', savedImages.length);

        // Clear existing images
        if (gallery) gallery.innerHTML = '';
        if (slideshow) slideshow.innerHTML = '';

        // Add all saved images to gallery
        if (gallery) {
            savedImages.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.src;
                imgElement.alt = image.name;
                imgElement.style.width = '200px';
                imgElement.style.height = '150px';
                imgElement.style.objectFit = 'cover';
                imgElement.style.margin = '10px';
                imgElement.style.borderRadius = '10px';
                gallery.appendChild(imgElement);
            });
        }

        // Add latest 4 images to slideshow
        const latestImages = savedImages.slice(-4);
        console.log('Slideshow images:', latestImages.length);
        if (slideshow) {
            latestImages.forEach(image => {
                const slideImg = document.createElement('img');
                slideImg.src = image.src;
                slideImg.alt = image.name;
                slideshow.appendChild(slideImg);
            });
        }

        // If no images, show message
        if (savedImages.length === 0) {
            if (gallery) gallery.innerHTML = '<p style="color: white;">No images uploaded yet.</p>';
            if (slideshow) slideshow.innerHTML = '<p style="color: white;">No images yet.</p>';
        } else {
            // Start slideshow with latest 4
            startSlideshow(latestImages.length);
        }
    } catch (error) {
        console.error('Error loading images:', error);
        alert('Error loading images: ' + error.message);
    }
}

function startSlideshow(imageCount) {
    let currentIndex = 0;
    const slideshow = document.getElementById('slideshow');

    setInterval(() => {
        currentIndex = (currentIndex + 1) % imageCount;
        slideshow.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 7000); // Change image every 7 seconds
}
