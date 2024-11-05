const imageSources = [
    // Add the image URLs you want to preload
];

const htmlSources = [
    // Add the HTML pages to preload
];

let loadedCount = 0;

// Function to check if all resources are loaded
function checkAllResourcesLoaded() {
    if (loadedCount === imageSources.length + htmlSources.length) {
        document.getElementById('loader').style.display = 'none'; // Hide loader
        // Optionally redirect or perform any final actions
    }
}

// Function to update percentage
function updatePercentage() {
    const percentageText = document.getElementById('percentage');
    const totalResources = imageSources.length + htmlSources.length;
    const percentage = Math.round((loadedCount / totalResources) * 100);
    percentageText.textContent = `${percentage}%`;
}

// Load each image
imageSources.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        loadedCount++;
        updatePercentage();
        checkAllResourcesLoaded();
    };
    img.onerror = () => {
        console.error(`Error loading image: ${src}`);
        loadedCount++;
        updatePercentage();
        checkAllResourcesLoaded();
    };
});

// Load each HTML page
htmlSources.forEach(src => {
    fetch(src)
        .then(response => {
            if (!response.ok) throw new Error(`Error loading HTML: ${src}`);
            return response.text();
        })
        .then(html => {
            sessionStorage.setItem(src, html);
            loadedCount++;
            updatePercentage();
            checkAllResourcesLoaded();
        })
        .catch(error => {
            console.error(error);
            loadedCount++;
            updatePercentage();
            checkAllResourcesLoaded();
        });
});

// Optional: Fallback redirect after a timeout
setTimeout(() => {
    document.getElementById('loader').style.display = 'none'; // Hide loader after timeout
}, 20000); // 20 seconds timeout
