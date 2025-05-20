// tracker.js
(function () {
  "use strict"; // Enforce stricter parsing and error handling

  // --- Your Deployed Google Apps Script Web App URL ---
  const GAS_WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbxf_NSC_gXp0mnbFDO7l_8rkGN3BD44hCxaSSIkbYpfyZ5ZXARMy9sR7lJxS3cqwpzPZg/exec";

  // Function to log the visit
  function logVisit() {
    // Only log visit if not from localhost or a known dev environment
    // and if GAS_WEB_APP_URL is correctly set (it is, as we just pasted it)
    if (
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      fetch(GAS_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors", // We don't need to read the response for a simple increment
        // No body or headers needed for this simple POST to the specific GAS doPost
      })
        .then(() => {
          console.log("Visit ping sent to analytics.");
        })
        .catch((error) => {
          console.error("Error pinging analytics:", error);
        });
    } else {
      console.log("Analytics ping skipped for local development.");
    }
  }

  // Execute the logVisit function when the script loads
  logVisit();
})();
