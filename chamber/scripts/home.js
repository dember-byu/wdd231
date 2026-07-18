// LAB SELECTORS ADAPTED TO THE HOMEPAGE
const myTown = document.querySelector('#town');
const myDecription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

// API KEY CONFIGURATION
const dataURL = "data/members.json";
const myKey = "88a18aaca352d3de6f62103b0d9792bf"; 

// Official coordinates for Cochabamba, Bolivia
const myLat = "-17.3950";
const myLong = "-66.1693";

// CONSTRUCT FULL PATHS USING TEMPLATE LITERALS (Using metric system for Bolivia)
const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;


// 1. MOBILE MENU (Hamburger)
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    menuToggle.innerHTML = mainNav.classList.contains("open") ? "✖" : "☰";
});


// 2. ACTIVE LINK (Wayfinding) 
function applyWayfinding() {
    const currentURL = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("#main-nav ul li a");
    
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentURL || (currentURL === "" && link.getAttribute("href") === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}


// 3. CURRENT WEATHER (Your original apiFetch function with error handling)
async function apiFetch() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error retrieving current weather:", error);
    }
}

function displayResults(data) {
    if (myTown) myTown.innerHTML = data.name;
    if (myDecription) myDecription.innerHTML = data.weather[0].description.toUpperCase();
    if (myTemperature) myTemperature.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    
    if (myGraphic) {
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        myGraphic.setAttribute('src', iconsrc);
        myGraphic.setAttribute('alt', data.weather[0].description);
    }
}


// 4. REQUIRED 3-DAY FORECAST 
async function fetchForecast() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error al obtener el pronóstico:", error);
    }
}

function displayForecast(data) {
    const forecastInfo = document.querySelector("#forecast-info");
    if (!forecastInfo) return;

    forecastInfo.innerHTML = "";
    const usedDays = [];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.getDate();
        const today = new Date().getDate();

// Omit the current day to ensure it strictly displays the next 3 future days
        if (day !== today && !usedDays.includes(day) && usedDays.length < 3) {
            usedDays.push(day);

            const p = document.createElement("p");
            p.className = "forecast-day-row";
            p.style.margin = "8px 0";
            p.innerHTML = `
                <strong>${weekdays[date.getDay()]}</strong>: 
                ${Math.round(item.main.temp)}°C - <span style="text-transform: capitalize; color: #666;">${item.weather[0].description}</span>
            `;
            forecastInfo.appendChild(p);
        }
    });
}



// --- 5. FEATURED MEMBERS (Random Spotlights)
async function getSpotlightMembers() {
    try {
        const response = await fetch(dataURL);
        if (response.ok) {
            const members = await response.json();
            
            const eligibleMembers = members.filter(m => 
                m.membershipLevel === 3 || 
                m.membershipLevel === 2
            );
            
            const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
            const selectedMembers = shuffled.slice(0, 3);

            displaySpotlights(selectedMembers);
        }
    } catch (error) {
        console.error("Error loading spotlight data:", error);
    }
}

function displaySpotlights(members) {
    const container = document.querySelector("#spotlight-container");
    if (!container) return;
    container.innerHTML = ""; 

    members.forEach(member => {
        const card = document.createElement("div");
        card.className = "spotlight-card";
        
        const levelLabel = (member.membershipLevel === 3) ? "Gold Member" : "Silver Member";

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p class="spotlight-level">⭐ ${levelLabel}</p>
            <div class="spotlight-logo-wrap">
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="80">
            </div>
            <p class="spotlight-tagline"><em>"${member.tagline}"</em></p>
            <div class="spotlight-details">
                <p>📍 ${member.address}</p>
                <p>📞 ${member.phone}</p>
                <p>🌐 <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            </div>
        `;
        container.appendChild(card);
    });
}


// 6. FOOTER 
if (document.querySelector("#current-year")) {
    document.querySelector("#current-year").textContent = new Date().getFullYear();
}
if (document.querySelector("#last-modified")) {
    document.querySelector("#last-modified").textContent = `Last Modified: ${document.lastModified}`;
}


document.addEventListener("DOMContentLoaded", () => {
    applyWayfinding();
    apiFetch(); 
    fetchForecast();
    getSpotlightMembers();
});
