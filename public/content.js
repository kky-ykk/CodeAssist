
//-------------------------------------------------------------------------------------------------------
function injectHint() {
    console.log("Injecting hint...");

    // Container for Hint Button & Levels
    let hintContainer = document.createElement("div");
    hintContainer.style.cssText = "position: fixed; bottom: 50px; left: 90%; display: inline-block; text-align: center;width:75px";

    // Main Hint Button
    let hintButton = document.createElement("button");
    hintButton.innerText = `💡 Get Hint!`;
    hintButton.className = "addedBot";
    hintButton.style.cssText = `
        background: rgb(234 170 76);
        width:75px;
        padding: 6px; 
        border-radius: 4px; 
        font-size: 10px; 
        color: black; 
        cursor: pointer; 
        border: none;
        display: block;
        margin-top: 0px;
    `;

    // Hidden Level Buttons
    let levelContainer = document.createElement("div");
    levelContainer.style.cssText = `
        position: absolute; 
        bottom: 100%;  /* Moves the buttons above */
        left: 50%;
        transform: translateX(-50%);
        background: white; 
        width:75px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
        border-radius: 4px; 
        display: none; 
        flex-direction: column; 
        padding: 3px;  /* 2px padding */
        transition: opacity 0.2s ease-in-out;
    `;

    // Create Level Buttons
    ["Level-1", "Level-2", "Level-3"].forEach(level => {
        let levelBtn = document.createElement("button");
        levelBtn.innerText = level;
        levelBtn.style.cssText = `
            padding: 6px 8px; 
            background: black; 
            border: none; 
            cursor: pointer; 
            font-size: 10px; 
            text-align: left; 
            width: 100%;
            font-weight:bold
        `;
        
        // Send the selected level when clicked
        levelBtn.addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "fetchHint",problem: getProblemDetails(), level });
        });

        levelContainer.appendChild(levelBtn);
    });

    // Show level buttons on hover
    hintContainer.addEventListener("mouseenter", () => {
        levelContainer.style.display = "flex";
        levelContainer.style.opacity = "1";
    });

    // Hide levels when not hovering
    hintContainer.addEventListener("mouseleave", () => {
        levelContainer.style.display = "none";
        levelContainer.style.opacity = "0";
    });

    // Append elements
    hintContainer.appendChild(levelContainer);
    hintContainer.appendChild(hintButton);
    document.body.appendChild(hintContainer);

    console.log("Hint button injected!");
}

// Get the problem details
const getProblemName = () => {
    const url = window.location.href;
    const match = /\/problems\/([^/]+)/.exec(url);
    return match ? match[1] : "Unknown Problem";
};

function getProblemDetails() {
    let title = getProblemName();
    let description = document.querySelector("meta[name=description]").content || "No description available.";
    return { title, description };
}

// Send problem data to the background script
chrome.runtime.sendMessage({ action: "fetchHint", problem: getProblemDetails() }, (response) => {
    if (chrome.runtime.lastError) {
        console.log("Error sending message:", chrome.runtime.lastError);
    } else if (response && response.hint) {
        console.log("Hint received:", response.hint);
        injectHint();
    } else {
        console.log("No hint received.");
    }
});
