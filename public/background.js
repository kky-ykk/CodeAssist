chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ G_API_KEY: "API" });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("message :",message);
    if (message.action === "fetchHint") {
        chrome.storage.local.get("G_API_KEY", (data) => {
            if (!data.G_API_KEY) {
                console.error("API Key not found in storage!");
                return;
            }

            fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${data.G_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        { 
                            role: "user", 
                            parts: [
                                { text: `Give a helpful **hint** (not solution) for the following LeetCode problem:\n\nTitle: ${message.problem.title}\n\nDescription: ${message.problem.description}` }
                            ] 
                        }
                    ]
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("data fetched :",data);
                if (data.candidates && data.candidates.length > 0) {
                    chrome.storage.local.set({ hint: data.candidates[0].content.parts[0].text,title:message.problem.title,description:message.problem.description});
                    sendResponse({ hint:data.candidates[0].content.parts[0].text });
                } else {
                    chrome.storage.local.set({ hint: "No hint available at the moment." });
                }
            })
            .catch(error => {
                console.log("Error fetching Gemini AI hint:", error)
                sendResponse({ hint: "Error fetching hint." });
            });
        });

        return true;
    }
});
