document.addEventListener("DOMContentLoaded", () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const summaryContainer = document.getElementById("summary-display");

    if (urlParams.has("firstName")) {
        
        const getDecodedParam = (param) => urlParams.get(param) || "Not provided";

        summaryContainer.innerHTML = `
            <ul>
                <li><strong>First Name:</strong> ${getDecodedParam("firstName")}</li>
                <li><strong>Last Name:</strong> ${getDecodedParam("lastName")}</li>
                <li><strong>Email Address:</strong> ${getDecodedParam("email")}</li>
                <li><strong>Mobile Phone:</strong> ${getDecodedParam("phone")}</li>
                <li><strong>Business Name:</strong> ${getDecodedParam("organization")}</li>
                <li><strong>Membership Level:</strong> ${getDecodedParam("membershipLevel").toUpperCase()}</li>
                <li><strong>Submission Timestamp:</strong> ${getDecodedParam("timestamp")}</li>
            </ul>
        `;
    } else {
        summaryContainer.innerHTML = `<p class="error-msg">No submission data found. Please complete the registration form first.</p>`;
    }

    
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("last-modified").textContent = `Last Modification: ${document.lastModified}`;
});
