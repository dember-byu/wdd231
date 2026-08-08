import { directoryData } from '../data/trails.mjs';

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
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.distance}</address>
            <p>${item.difficulty}</p>
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




// --- CONFIGURACIÓN DE LA VENTANA MODAL ---
const modal = document.querySelector('#trail-modal');
const closeModalBtn = document.querySelector('#close-modal');
const modalBody = document.querySelector('#modal-body');

// Función para activar los eventos de clic en los botones "Learn More"
export function setupModalEvents(globalTrailsData) {
    const modalButtons = document.querySelectorAll('.discover-grid button'); // Ajusta el selector si tus botones tienen otra clase

    modalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Obtener el ID de la ruta desde el botón presionado
            const trailId = e.target.getAttribute('data-id');
            
            // Requerimiento: Utilizar un método de arreglo (.find) para procesar datos eficientemente
            const selectedTrail = globalTrailsData.find(t => t.id == trailId);
            
            if (selectedTrail && modal && modalBody) {
                // Inyectamos el contenido extendido dentro del cuerpo del modal
                modalBody.innerHTML = `
                    <h2>${selectedTrail.name}</h2>
                    <img src="${selectedTrail.image}" alt="${selectedTrail.name}" style="width:100%; height:auto; border-radius:8px; margin: 10px 0;">
                    <p><strong>Difficulty Level:</strong> ${selectedTrail.difficulty}</p>
                    <p><strong>Total Distance:</strong> ${selectedTrail.distance}</p>
                    <p style="margin-top: 10px; line-height: 1.5;">
                        <strong>Detailed Information:</strong> This incredible route in Tiraque features stunning high-altitude scenery, local wildlife observation points, and eco-friendly rest areas. Make sure to wear hiking boots, stay hydrated, and follow the trail markers.
                    </p>
                `;
                
                // Método nativo recomendado para asegurar la accesibilidad
                modal.showModal(); 
            }
        });
    });

    // Evento para cerrar el modal al hacer clic en la "X"
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.close();
        });
        
        // Cerrar de forma intuitiva si el usuario hace clic fuera de la caja del modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });
    }
}
