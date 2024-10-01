const apiKey = 'your_api_key_here';
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherDetails = document.getElementById('weather-details');
const weatherIcon = document.getElementById('weather-icon');

// Array of background images
const backgroundImages = [
    'images/background1.jpg',
    'images/background2.jpg',
    'images/background3.jpg',
    // Add more images as needed
];

let currentImageIndex = 0;

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    getWeather(city);
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`City not found: ${city}`);
        }
        const data = await response.json();
        displayWeather(data);
        updateWeatherIcon(data.weather[0].main); // Update the icon based on weather condition
    } catch (error) {
        console.error(error.message);
        weatherDetails.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    if (data.main) {
        weatherDetails.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Condition: ${data.weather[0].description}</p>
        `;
    } else {
        weatherDetails.innerHTML = `<p>City not found. Please try again.</p>`;
    }
}

function updateWeatherIcon(condition) {
    switch (condition.toLowerCase()) {
        case 'clear':
            weatherIcon.style.backgroundImage = 'url(images/sunny.png)';
            break;
        case 'thunderstorm':
            weatherIcon.style.backgroundImage = 'url(images/thunderstorm.png)';
            break;
        case 'snow':
            weatherIcon.style.backgroundImage = 'url(images/snow.png)';
            break;
        // Add more conditions as needed
        default:
            weatherIcon.style.backgroundImage = '';
    }
}

// Function to cycle through background images
function cycleBackgroundImages() {
    setInterval(() => {
        document.body.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    }, 5000); // Change background every 5 seconds
}

// Start the background image cycling
cycleBackgroundImages();
