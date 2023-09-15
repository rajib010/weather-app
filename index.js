'use strict';

const apiKey = "0eec9bef2caeada76a3516e2ace14828";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const inputField = document.querySelector(".inputField");
const searchBtn = document.querySelector("#searchBtn");

const weatherIcon = document.querySelector(".weatherIcon");

async function checkWeather(city) {
    try {
        //fetch the api
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        //check for errors
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            //convert data into json format
            const data = await response.json();

            console.log(data);
            //render data into html document
            document.querySelector("#location").textContent = data.name;
            document.querySelector("#temperature").textContent = Math.round(data.main.temp);
            document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
            document.querySelector(".wind").textContent = data.wind.speed;

            //check the weather condition and put the image accordingly
            switch (data.weather[0].main) {
                case 'Clouds':
                    weatherIcon.src = "images/clouds.png";
                    break;
                case 'Clear':
                    weatherIcon.src = "images/clear.png";
                    break;
                case 'Drizzle':
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case 'Mist':
                    weatherIcon.src = "images/mist.png"; // Use "mist" instead of "Mist" for consistency
                    break;
                case 'Rain':
                    weatherIcon.src = "images/rain.png";
                    break;
                case 'Snow':
                    weatherIcon.src = "images/snow.png";
                    break;
                default:
                    weatherIcon.src = "images/unknown.png"; // You might want to add a default image for unknown weather
            }

            //Determine the visibility of the weather div
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

//run the function
searchBtn.addEventListener("click", () => {
    checkWeather(inputField.value);
});

//search using the enter key also..
inputField.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        checkWeather(inputField.value);
    }
});
