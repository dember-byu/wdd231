import { directoryData } from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
    handleVisits();
    renderCards();
});

// --- LocalStorage Visit Messages Logic ---
function handleVisits() {
    const messageElement = document.getElementById("visitor-message");
    const lastVisit = localStorage.getItem("lastChamberVisit");
    const now = Date.now(); // Current time in milliseconds

    // Store the current visit timestamp immediately for the next session
    localStorage.setItem("lastChamberVisit", now);

    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
        return;
    }

    // Calculate the time difference
    const timeDifference = now - parseInt(lastVisit);
    const msInDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
    const daysBetween = Math.floor(timeDifference / msInDay);

    if (timeDifference < msInDay) {
        messageElement.textContent = "Back so soon! Awesome!";
    } else {
        if (daysBetween === 1) {
            messageElement.textContent = "You last visited 1 day ago.";
        } else {
            messageElement.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }
}

// --- Card Rendering Logic ---
function renderCards() {
    const gridContainer = document.querySelector(".discover-grid");
    gridContainer.innerHTML = ""; // Clear container before rendering

    directoryData.forEach((item, index) => {
        const card = document.createElement("div");
        // Assign generic 'card' class and a unique class based on index for CSS Grid Areas
        card.classList.add("card", `card${index + 1}`);

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more-btn">Learn More</button>
        `;

        gridContainer.appendChild(card);
    });
}

const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    menuToggle.innerHTML = mainNav.classList.contains("open") ? "✖" : "☰";
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = `Last Modified: ${document.lastModified}`;


document.addEventListener("DOMContentLoaded", () => {
    getMembers();
    applyWayfinding();
});

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
