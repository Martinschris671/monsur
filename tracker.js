// tracker.js
(function () {
  "use strict";

  const GAS_WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbxf_NSC_gXp0mnbFDO7l_8rkGN3BD44hCxaSSIkbYpfyZ5ZXARMy9sR7lJxS3cqwpzPZg/exec";

  async function logVisit() {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.log("Analytics ping skipped for local development.");
      return;
    }

    let ipAddress = "N/A";
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      if (ipResponse.ok) {
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;
      } else {
        console.warn("Could not fetch IP address:", ipResponse.status);
      }
    } catch (error) {
      console.warn("Error fetching IP address:", error);
    }

    const visitData = {
      ipAddress: ipAddress,
      pageURL: window.location.href,
      userAgent: navigator.userAgent,
      referrer: document.referrer || "Direct",
    };

    try {
      const response = await fetch(GAS_WEB_APP_URL, {
        method: "POST",
        mode: "cors", // Required for sending JSON and reading response
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitData),
        // redirect: 'follow' // Optional, GAS usually handles redirects internally
      });

      if (response.ok) {
        // const result = await response.json(); // If you need to read response
        // console.log('Analytics ping successful:', result);
        console.log("Analytics ping sent.");
      } else {
        console.error(
          "Analytics ping failed:",
          response.status,
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error pinging analytics:", error);
    }
  }

  // Debounce or ensure it runs only once per page load effectively
  if (document.readyState === "complete") {
    logVisit();
  } else {
    window.addEventListener("load", logVisit, { once: true });
  }
})();
