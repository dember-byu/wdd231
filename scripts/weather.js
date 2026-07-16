// // SELECT HTML ELEMENTS IN THE DOCUMENT
const myTown = document.querySelector('#town');
const myDecription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

// // CREATE REQUIRED VARIABLES FOR THE URL
const myKey = "88a18aaca352d3de6f62103b0d9792bf"; // Mantén tu API Key completa aquí
const myLat = "51.31271111790702"
const myLong = "9.486704907933825"

// // CONSTRUCT A FULL PATH USING TEMPLATE LITERALS
const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`

// // TRY TO GRAB THE CURRENT WEATHER DATA
async function apiFetch() {
            try {
                const response = await fetch(myURL);
                 if (response.ok) {
                const data = await response.json();
                console.log(data); 
                displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}




function displayResults(data) {
    console.log('hello')
    myTown.innerHTML = data.name
    myDecription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;F`
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    myGraphic.setAttribute('src', iconsrc)
    myGraphic.setAttribute('alt', data.weather[0].description)

}

apiFetch();