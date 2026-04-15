// Get stored incidents or empty array
let incidents = JSON.parse(localStorage.getItem("incidents")) || [];

// DISPLAY INCIDENTS (index.html)
const list = document.getElementById("incident-list");

if (list) {
    list.innerHTML = incidents.map((item, index) => `
        <div class="incident">
            <h3>${item.title}</h3>
            <p><strong>Category:</strong> ${item.category}</p>
            <p>${item.description}</p>
            <p><strong>Location:</strong> ${item.lat || "N/A"}, ${item.lng || ""}</p>
        </div>
    `).join("");
}

// ADD INCIDENT (add.html)
const form = document.getElementById("incident-form");

if (form) {
    form.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;

    navigator.geolocation.getCurrentPosition((position) => {

        const newIncident = {
            title,
            category,
            description,
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        incidents.push(newIncident);
        localStorage.setItem("incidents", JSON.stringify(incidents));

        alert("Incident added!");
        window.location.href = "index.html";

    }, () => {

        const newIncident = {
            title,
            category,
            description,
            lat: null,
            lng: null
        };

        incidents.push(newIncident);
        localStorage.setItem("incidents", JSON.stringify(incidents));

        alert("Incident added without location!");
        window.location.href = "index.html";
    });
});
}