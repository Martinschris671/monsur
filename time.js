document.addEventListener("DOMContentLoaded", function () {
  const statusDot = document.getElementById("status-dot");
  const statusText = document.getElementById("status-text");
  const statusPopup = document.getElementById("status-popup");
  const statusContainer = document.getElementById(
    "availability-status-container"
  );

  const onlineStartTime = 8; // 8 AM
  const onlineEndTime = 22; // 10 PM (22:00)
  const timeZone = "Africa/Lagos"; // Nigerian Time Zone (WAT = GMT+1)

  function updateAvailability() {
    try {
      const now = new Date();
      // Get current hour in Nigerian time
      const nigerianHourString = now.toLocaleTimeString("en-US", {
        timeZone: timeZone,
        hour12: false,
        hour: "2-digit",
      });
      const nigerianHour = parseInt(nigerianHourString, 10);

      const isOnline =
        nigerianHour >= onlineStartTime && nigerianHour < onlineEndTime;

      if (isOnline) {
        statusDot.className = "online"; // Clear previous and set 'online'
        statusText.textContent = "Online";
        statusPopup.textContent = `Available now! (Until 10:00 PM WAT)`;
      } else {
        statusDot.className = "offline"; // Clear previous and set 'offline'
        statusText.textContent = "Offline";
        let nextAvailableTime = `${onlineStartTime}:00 AM WAT`;
        if (nigerianHour >= onlineEndTime) {
          // If it's past 10 PM today
          nextAvailableTime += " tomorrow";
        }
        statusPopup.textContent = `Next available: ${nextAvailableTime}.`;
      }
    } catch (error) {
      console.error("Error getting timezone or updating status:", error);
      statusText.textContent = "Status Unavailable";
      statusPopup.textContent = "Could not determine availability.";
      statusDot.className = ""; // Reset dot class
      statusDot.style.backgroundColor = "grey"; // Fallback color
    }
  }

  // Toggle popup visibility on click
  statusContainer.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent click from closing it immediately if body listener is added
    statusContainer.classList.toggle("active");
  });

  // Optional: Close popup if clicked outside
  document.addEventListener("click", function (event) {
    if (
      !statusContainer.contains(event.target) &&
      statusContainer.classList.contains("active")
    ) {
      statusContainer.classList.remove("active");
    }
  });

  // Also allow closing popup with Escape key when it's focused or active
  statusContainer.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      statusContainer.classList.contains("active")
    ) {
      statusContainer.classList.remove("active");
    }
  });

  // Initial check
  updateAvailability();

  // Update every minute
  setInterval(updateAvailability, 60000);
});
