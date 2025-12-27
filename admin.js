// Admin functionality for St. Jude's admin page

document.addEventListener('DOMContentLoaded', function() {
    // Event listeners
    document.getElementById('login-btn').addEventListener('click', loginAdmin);
    document.getElementById('add-news-btn').addEventListener('click', addNews);
    document.getElementById('upload-image-btn').addEventListener('click', uploadImage);
    document.getElementById('logout-btn').addEventListener('click', logoutAdmin);
});

function loginAdmin() {
    const password = document.getElementById('admin-password').value;
    if (password === 'admin123') { // Demo password
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        alert('Login successful!');
    } else {
        alert('Incorrect password!');
    }
}

function addNews() {
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;

    if (title && content) {
        const news = { title, content, date: new Date().toLocaleDateString() };
        let savedNews = JSON.parse(localStorage.getItem('stjude_news')) || [];
        savedNews.unshift(news); // Add to beginning
        localStorage.setItem('stjude_news', JSON.stringify(savedNews));

        // Clear form
        document.getElementById('news-title').value = '';
        document.getElementById('news-content').value = '';
        alert('News added successfully! Check the content page to see the update.');
    } else {
        alert('Please fill in both title and content.');
    }
}

function uploadImage() {
    const fileInput = document.getElementById('image-upload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            console.log('Image data length:', imageData.length);
            try {
                let savedImages = JSON.parse(localStorage.getItem('stjude_images')) || [];
                savedImages.push({ src: imageData, name: file.name });
                localStorage.setItem('stjude_images', JSON.stringify(savedImages));
                console.log('Images saved:', savedImages.length);
                alert('Image uploaded successfully! Size: ' + (imageData.length / 1024).toFixed(2) + ' KB. Redirecting to content page...');
                window.location.href = 'content.html';
            } catch (error) {
                alert('Error saving image: ' + error.message);
            }
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file.');
    }
}

function logoutAdmin() {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('admin-password').value = '';
}

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
    const savedImages = JSON.parse(localStorage.getItem('stjude_images')) || [];
    // For demo, just log or could display in a gallery
    console.log('Saved images:', savedImages);
    // Could add a gallery section if needed
}
