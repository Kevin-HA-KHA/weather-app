// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0


// Définition des éléments dynamiques
const iconElement = document.querySelector('.weather-icon');
const temperatureElement = document.querySelector('.temperature-value p');
const descriptionElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector(".notification");
const refreshBtn = document.querySelector('.refresh-button');
const kelvin = 273;

// App data
const weather = {};
weather.temperature = {
    unit : "celsius",
};


//Find user location 
function app() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(getPosition, getError); 
    } else {
        notificationElement.innerHTML = "<p>Votre navigateur ne permet pas d'obtenir votre localisation.</p>";
        notificationElement.style.display = "block";
    };
}

function getPosition(position) {
    let latitude = position.coords['latitude'];
    let longitude = position.coords['longitude']; 
    getWeather(latitude, longitude);
};

function getError(errorMessage) {
    notificationElement.innerHTML = `<p>Une erreur s'est produite : ${errorMessage}</p>`;
    notificationElement.style.display = "block";
    setTimeout(() =>{
        notificationElement.style.display = "none";
    }, 5000)
};

//API call function
function getWeather(latitude, longitude) {
    const key = "82005d27a116c2880c8f0fcb866998a0";
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=fr`;
    let data;
    fetch(api)
        .then((response) => {
            data = response.json();
            return data;
        })
        .then((data) => {
            console.log(data);
            weather.temperature.celsius = Math.floor(data.main.temp - kelvin);
            weather.temperature.fahrenheit = celsiusToFahrenheit(weather.temperature.celsius);
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.description = data.weather[0]['description'];
            weather.icon = data.weather[0]['icon'];
        })
        .then(displayData)
    console.log(weather)
};

//Display data in App data 
function displayData() {
    iconElement.innerHTML = `<img src="icons/${weather.icon}.png" alt="">`;
    if (weather.temperature.unit === 'celsius') {
        temperatureElement.innerHTML = `${weather.temperature.celsius}°<span>C</span>`;
    } else {
        temperatureElement.innerHTML = `${weather.temperature.fahrenheit}°<span>F</span>`;
    }
    descriptionElement.innerText = `${weather.description}`;
    locationElement.innerText = `${weather.city}, ${weather.country}`;
}

// events listeners
// switch unit
temperatureElement.addEventListener('click', () => {
    if(weather.temperature.unit === 'celsius') {
        weather.temperature.unit = 'fahrenheit';
        displayData();
    } else {
        weather.temperature.unit = 'celsius';
        displayData();
    }

})

refreshBtn.addEventListener('click', app)

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}


app();
