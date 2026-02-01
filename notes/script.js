async function getNotes() {
    const container = document.getElementById("status-list");

    try {
        // Fetch the local JSON file
        const response = await fetch('notes.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Clear the "Loading" message
        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = "<p>No notes found.</p>";
            return;
        }

        // Loop through and build the HTML
        let htmlContent = "";
        data.forEach(item => {
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
            <p style="color: red;">
                Error: Could not load notes.json.<br>
                Make sure you are running a local server (like Live Server).
            </p>`;
    }
}

// Run the function when the page loads
getNotes();