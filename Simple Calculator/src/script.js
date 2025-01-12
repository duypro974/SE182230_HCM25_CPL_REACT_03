const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["*", "/", "-", "+", "="];
const historyContainer = document.querySelector(".history");
const viewHistoryButton = document.querySelector(".view-history");

let output = ""; 
let history = []; 


const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    try {
      
      const result = eval(output); 
      
      if (result === undefined || isNaN(result)) {
        throw new Error("Invalid result"); 
      }

      history.push(`${output} = ${result}`); 
      output = result.toString();
    } catch {
      output = "Error"; 
    }
  } else if (btnValue === "AC") {
    output = ""; 
  } else if (btnValue === "DEL") {
    output = output.slice(0, -1); 
  } else {
    if (output === "" && specialChars.includes(btnValue)) return; 
    output += btnValue; 
  }
  display.value = output; 
};


const toggleHistory = () => {
  if (historyContainer.classList.contains("hidden")) {
    historyContainer.innerHTML = history
      .map((item) => `<p>${item}</p>`)
      .join("");
    historyContainer.classList.remove("hidden");
    historyContainer.style.display = "block";
  } else {
    historyContainer.classList.add("hidden");
    historyContainer.style.display = "none";
  }
};


buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});


viewHistoryButton.addEventListener("click", toggleHistory);
