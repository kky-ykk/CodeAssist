import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [hint, setHint] = useState("Fetching hint...");
    const [title, setTitle] = useState("Fetching title...");
    const [desc, setDes] = useState("Fetching Des...");

    useEffect(() => {
        chrome.storage.local.get("hint", (data) => {   
            setHint(data.hint || "No hint available.");
        });
        chrome.storage.local.get("title", (data) => {
          setTitle(data.title || "No title available.");
        });
        // chrome.storage.local.get("description", (data) => {
        //   setDes(data.description || "No title available.");
        // });
    }, []);

    return (
        <div className="popup">

            <h2>LeetCode AI Hint</h2>
            <h3>{title}</h3>
            {/* <h3>{desc}</h3> */}

            <div className="btnContainer">

                

            </div>
            

            <p>{hint}</p>
        </div>
    );
}

export default App;
