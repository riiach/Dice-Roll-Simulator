const dice = document.querySelector(".dice");
const rollBtn = document.querySelector(".roll-btn");
const historyList = document.querySelector(".history-list");
const logo = document.querySelector(".logo");
const resetBtn = document.querySelector(".reset");

const srcArray = [
    "./Assets/Dice1.png",
    "./Assets/Dice2.png",
    "./Assets/Dice3.png",
    "./Assets/Dice4.png",
    "./Assets/Dice5.png",
    "./Assets/Dice6.png"
];

let rollHistory = [];

document.addEventListener("DOMContentLoaded", () => {
    const expandBtn = document.querySelector(".expand");
    const historyContainer = document.querySelector(".history-container");
    const expandImg = expandBtn.querySelector("img");

    expandBtn.addEventListener("click", () => {
        historyContainer.classList.toggle("expanded");
        if (historyContainer.classList.contains("expanded")) {
            expandImg.src = "Assets/Shrink.svg";
        } else {
            expandImg.src = "Assets/Expand.svg";
        }
    });
});

const hideBtn = document.querySelector(".hide");
const historyContainer = document.querySelector(".history-container");
const overlay = document.querySelector(".history-overlay");

hideBtn.addEventListener("click", () => {
    if (rollHistory.length === 0) {
        console.log("History is empty. Cannot hide.");
        return;
    }

    historyContainer.classList.toggle("hidden");
    overlay.style.display = historyContainer.classList.contains("hidden") ? "block" : "none";

    const hideIcon = hideBtn.querySelector("img");
    hideIcon.src = historyContainer.classList.contains("hidden") ? "Assets/Unhide.svg" : "Assets/Hide.svg";
});

resetBtn.addEventListener("click", () => {
    rollHistory = [];
    historyList.innerHTML = "";
    historyContainer.classList.remove("hidden");
    overlay.style.display = "none";

    const hideIcon = hideBtn.querySelector("img");
    hideIcon.src = "Assets/Hide.svg";
});

rollBtn.addEventListener("click", () => {
    rollDice();
    updateHistory();
});

function rollDice() {
    const randomIndex = Math.floor(Math.random() * srcArray.length); 
    const rolledNumber = randomIndex + 1;

    dice.src = srcArray[randomIndex];

    rollHistory.push(rolledNumber);
}

function updateHistory() {
    historyList.innerHTML = "";

    rollHistory.forEach((roll, index) => {
        const listDiv = document.createElement("div");
        listDiv.classList.add("roll-history");

        const rollText = document.createElement("span");
        rollText.textContent = `Roll ${index + 1}: `;

        const rollImage = document.createElement("img");
        rollImage.src = srcArray[roll - 1];
        rollImage.classList.add("history-dice");

        listDiv.appendChild(rollText);
        listDiv.appendChild(rollImage);
        historyList.appendChild(listDiv);
    });
}

function reLoad() {
    location.reload();
}

logo.addEventListener("click", reLoad);

