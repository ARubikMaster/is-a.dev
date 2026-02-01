async function getNotes() {
    const container = document.getElementById("status-list");
    
    // Safety check: if the element doesn't exist yet, stop
    if (!container) return;

    try {
        // Create a unique timestamp to force the browser to bypass its cache
        const cacheBuster = new Date().getTime();
        
        // Fetch the local JSON file with the timestamp attached
        const response = await fetch(`notes.json?v=${cacheBuster}`);

        if (!response.ok) {
            throw new Error(`Could not find notes.json (Status: ${response.status})`);
        }

        const data = await response.json();
        
        // Clear the "Loading..." text
        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = "<p>No notes found.</p>";
            return;
        }

        // Loop through the data and build the HTML
        let htmlContent = "";
        data.forEach(item => {
            // Using || '' ensures the page doesn't show "undefined" if a field is missing
            const date = item.date || "No Date";
            const content = item.content || "";
            
            htmlContent += `
                <p class="status-note">
                    <strong>${date}</strong>: ${content}
                </p>
                <hr>`;
        });

        container.innerHTML = htmlContent;

    } catch (error) {
        console.error("Failed to load notes:", error);
        container.innerHTML = `
            <p style="color: #ff6b6b;">
                Error: Could not load notes.<br>
                <small>${error.message}</small>
            </p>`;
    }
}

// This ensures the script waits for the HTML to be fully loaded before running
window.addEventListener('DOMContentLoaded', getNotes);