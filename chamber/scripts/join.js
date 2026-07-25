document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            
            mainNav.classList.toggle("open");
            
            // (☰ to ✕)
            if (mainNav.classList.contains("open")) {
                menuToggle.textContent = "✕";
                menuToggle.setAttribute("aria-label", "Close Navigation Menu");
            } else {
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-label", "Open Navigation Menu");
            }
        });
    }


    const timestampField = document.getElementById("form-timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const openButtons = document.querySelectorAll(".open-modal-btn");
    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal(); 
            }
        });
    });

    const closeButtons = document.querySelectorAll(".close-modal-btn");
    closeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const modal = e.target.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });


    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("last-modified").textContent = `Last Modification: ${document.lastModified}`;
});
