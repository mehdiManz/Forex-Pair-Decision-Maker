document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("forexForm");
  const tableBody = document.querySelector("#forexTable tbody");

  // Load existing data from localStorage on page load
  const storedData = JSON.parse(localStorage.getItem("forexPairs")) || [];
  storedData.forEach((pair) => addRow(pair));

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const baseCurrency = document.getElementById("baseCurrency").value;
    const baseCurrencyStrength = document.getElementById(
      "baseCurrencyStrength"
    ).value;
    const quoteCurrency = document.getElementById("quoteCurrency").value;
    const quoteCurrencyStrength = document.getElementById(
      "quoteCurrencyStrength"
    ).value;
    const pinBar = document.getElementById("pinBar").value;
    const bollinger = document.getElementById("bollinger").value;
    const roomToRun = document.getElementById("roomToRun").value;

    const currencyPair = {
      baseCurrency,
      baseCurrencyStrength,
      quoteCurrency,
      quoteCurrencyStrength,
      pinBar,
      bollinger,
      roomToRun,
    };

    addRow(currencyPair);
    saveToLocalStorage(currencyPair);

    form.reset();
  });

  function addRow(pair) {
    const row = document.createElement("tr");

    const currencyCell = document.createElement("td");
    currencyCell.textContent = `${pair.baseCurrency}/${pair.quoteCurrency}`;
    row.appendChild(currencyCell);

    const baseCurrencyStrengthCell = document.createElement("td");
    baseCurrencyStrengthCell.textContent = pair.baseCurrencyStrength.replace(
      "-",
      " "
    );
    baseCurrencyStrengthCell.classList.add(pair.baseCurrencyStrength);
    row.appendChild(baseCurrencyStrengthCell);

    const quoteCurrencyStrengthCell = document.createElement("td");
    quoteCurrencyStrengthCell.textContent = pair.quoteCurrencyStrength.replace(
      "-",
      " "
    );
    quoteCurrencyStrengthCell.classList.add(pair.quoteCurrencyStrength);
    row.appendChild(quoteCurrencyStrengthCell);

    const pinBarCell = document.createElement("td");
    pinBarCell.textContent = pair.pinBar;
    row.appendChild(pinBarCell);

    const bollingerCell = document.createElement("td");
    bollingerCell.textContent = pair.bollinger;
    row.appendChild(bollingerCell);

    const roomToRunCell = document.createElement("td");
    roomToRunCell.textContent = pair.roomToRun;
    row.appendChild(roomToRunCell);

    const decisionCell = document.createElement("td");

    // Determine trade decision
    if (
      (pair.baseCurrencyStrength.includes("green") &&
        pair.quoteCurrencyStrength.includes("green")) ||
      (pair.baseCurrencyStrength.includes("red") &&
        pair.quoteCurrencyStrength.includes("red"))
    ) {
      decisionCell.textContent = "No Trade";
      decisionCell.classList.add("trade-no");
    } else {
      // Check other conditions for trade decision
      if (
        pair.pinBar === "Yes" &&
        pair.bollinger === "Yes" &&
        pair.roomToRun === "Yes"
      ) {
        decisionCell.textContent = "Trade";
        decisionCell.classList.add("trade-yes");
      } else {
        decisionCell.textContent = "No Trade";
        decisionCell.classList.add("trade-no");
      }
    }
    row.appendChild(decisionCell);

    const actionsCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", function () {
      row.remove(); // Remove row from the table
      removeFromLocalStorage(pair);
    });

    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  }

  function saveToLocalStorage(pair) {
    // Retrieve existing data from localStorage
    const storedData = JSON.parse(localStorage.getItem("forexPairs")) || [];

    // Add new pair to the existing data
    storedData.push(pair);

    // Save updated data back to localStorage
    localStorage.setItem("forexPairs", JSON.stringify(storedData));
  }

  function removeFromLocalStorage(pair) {
    // Retrieve existing data from localStorage
    const storedData = JSON.parse(localStorage.getItem("forexPairs")) || [];

    // Find index of pair to remove
    const index = storedData.findIndex((item) => isEqual(item, pair));

    // Remove pair from the stored data
    if (index !== -1) {
      storedData.splice(index, 1);

      // Save updated data back to localStorage
      localStorage.setItem("forexPairs", JSON.stringify(storedData));
    }
  }

  function isEqual(pair1, pair2) {
    // Check equality based on all properties
    return (
      pair1.baseCurrency === pair2.baseCurrency &&
      pair1.baseCurrencyStrength === pair2.baseCurrencyStrength &&
      pair1.quoteCurrency === pair2.quoteCurrency &&
      pair1.quoteCurrencyStrength === pair2.quoteCurrencyStrength &&
      pair1.pinBar === pair2.pinBar &&
      pair1.bollinger === pair2.bollinger &&
      pair1.roomToRun === pair2.roomToRun
    );
  }
});
