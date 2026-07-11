
const dataURL = "data/members.json";
const container = document.querySelector("#directory-container");


async function getMembers() {
    try {
        const response = await fetch(dataURL);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error("Error retrieving data from the server.");
            container.innerHTML = `<p class="error">The directory could not be loaded at this time.</p>`;
        }
    } catch (error) {
        console.error("Error inside the Fetch request:", error);
    }
}


function displayMembers(members) {
    container.innerHTML = ""; 

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <div class="card-logo-area">
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            </div>
            <div class="card-info-area">
                <h3>${member.name}</h3>
                <p class="address-text">${member.address}</p>
                <p class="phone-text">${member.phone}</p>
                <p class="url-text">
                    <a href="${member.website}" target="_blank" rel="noopener">
                        ${member.website.replace('https://', '').replace('http://', '').replace('www.', '')}
                    </a>
                </p>
            </div>
        `;
        container.appendChild(card);
    });
}


const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");

gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});


const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    menuToggle.innerHTML = mainNav.classList.contains("open") ? "✖" : "☰";
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


document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = `Last Modified: ${document.lastModified}`;


document.addEventListener("DOMContentLoaded", () => {
    getMembers();
    applyWayfinding();
});
