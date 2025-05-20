document.addEventListener("DOMContentLoaded", () => {
  const monthYearEl = document.getElementById("month-year");
  const calendarGridEl = document.getElementById("calendar-grid");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const timeSlotsSectionEl = document.getElementById("time-slots-section");
  const selectedDateDisplayEl = document.getElementById(
    "selected-date-display"
  );
  const timeSlotsListEl = document.getElementById("time-slots-list");
  const toggle12hBtn = document.getElementById("toggle-12h");
  const toggle24hBtn = document.getElementById("toggle-24h");

  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDate = new Date();
  let selectedDate = null;
  let selectedTimeFormat = "12h"; // '12h' or '24h'
  let selectedTimeSlotEl = null;

  // --- SIMULATED AVAILABILITY DATA ---
  // Key: YYYY-MM-DD, Value: Array of available time slots (HH:MM 24-hour format)
  // Add more dates and times as needed for testing
  const availabilityData = {
    // Example: Add availability for specific future dates
    // Make sure these dates are in the future relative to when you test
    // [getISODateString(new Date(Date.now() + 3 * 86400000))]: ["09:00", "09:30", "10:00", "14:00", "14:30"],
    // [getISODateString(new Date(Date.now() + 5 * 86400000))]: ["11:00", "11:30", "16:00"],
    // [getISODateString(new Date(Date.now() + 6 * 86400000))]: ["09:00", "10:30", "11:00", "11:30", "16:00", "16:30", "17:00"]
  };

  // Dynamically add some availability for the next few weekdays
  function addDynamicAvailability() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today
    let count = 0;
    let currentCheckDate = new Date(today);

    while (count < 5) {
      // Add availability for the next 5 weekdays
      currentCheckDate.setDate(currentCheckDate.getDate() + 1); // Move to next day
      const dayOfWeek = currentCheckDate.getDay(); // 0 = Sun, 6 = Sat

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // If it's a weekday
        const dateStr = getISODateString(currentCheckDate);
        if (!availabilityData[dateStr]) {
          // Only add if not already defined
          // Example slots - vary them slightly
          if (count % 2 === 0) {
            availabilityData[dateStr] = [
              "09:00",
              "09:45",
              "10:30",
              "14:00",
              "14:45",
              "15:30",
            ];
          } else {
            availabilityData[dateStr] = [
              "10:00",
              "11:00",
              "11:30",
              "16:00",
              "16:30",
            ];
          }
        }
        count++;
      }
    }
  }
  addDynamicAvailability();

  // --- Helper Functions ---
  function getISODateString(date) {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  }

  function formatDateForDisplay(date) {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }); // e.g., Thu, Apr 17
  }

  function formatTime(timeStr, format) {
    // timeStr is HH:MM
    const [hours, minutes] = timeStr.split(":");
    const h = parseInt(hours);
    if (format === "12h") {
      const ampm = h >= 12 ? "pm" : "am";
      const h12 = h % 12 || 12; // Convert 0 to 12
      return `${h12}:${minutes}${ampm}`;
    } else {
      return `${hours}:${minutes}`; // Already 24h
    }
  }

  function isDateInPast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare dates only, ignore time
    return date < today;
  }

  function isToday(date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  }

  // --- Core Rendering ---
  function renderCalendar() {
    calendarGridEl.innerHTML = ""; // Clear previous grid
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYearEl.textContent = `${monthNames[month]} ${year}`;

    // Add Day Headers
    dayHeaders.forEach((day) => {
      const dayEl = document.createElement("div");
      dayEl.classList.add("calendar-day-header");
      dayEl.textContent = day;
      calendarGridEl.appendChild(dayEl);
    });

    // Calculate calendar days
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon...
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty cells for days before the 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyCell = document.createElement("div");
      calendarGridEl.appendChild(emptyCell);
    }

    // Add date cells for the current month
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = getISODateString(date);
      const cell = document.createElement("button"); // Use button for better accessibility
      cell.classList.add("calendar-date");
      cell.textContent = day;
      cell.setAttribute("data-date", dateStr);
      cell.setAttribute("aria-label", `Select ${formatDateForDisplay(date)}`);

      const dateIsInPast = isDateInPast(date);
      const dateIsWeekend = isWeekend(date);
      const hasAvailableSlots =
        availabilityData[dateStr] && availabilityData[dateStr].length > 0;

      if (dateIsInPast) {
        cell.classList.add("disabled");
        cell.disabled = true;
        cell.setAttribute("aria-disabled", "true");
      } else {
        // Check availability (not weekend AND has defined slots)
        if (!dateIsWeekend && hasAvailableSlots) {
          cell.classList.add("available");
          cell.addEventListener("click", () => handleDateClick(date, cell));
        } else {
          cell.classList.add("disabled"); // Treat as unavailable if weekend or no slots
          cell.disabled = true;
          cell.setAttribute("aria-disabled", "true");
        }

        if (isToday(date)) {
          cell.classList.add("today");
        }
      }

      // Highlight if it's the currently selected date
      if (
        selectedDate &&
        getISODateString(date) === getISODateString(selectedDate)
      ) {
        cell.classList.add("selected");
        cell.setAttribute("aria-pressed", "true");
      } else {
        cell.setAttribute("aria-pressed", "false");
      }

      calendarGridEl.appendChild(cell);
    }
  }

  function renderTimeSlots() {
    if (!selectedDate) {
      timeSlotsSectionEl.style.display = "none";
      return;
    }

    timeSlotsSectionEl.style.display = "block";
    selectedDateDisplayEl.textContent = formatDateForDisplay(selectedDate);
    timeSlotsListEl.innerHTML = ""; // Clear previous slots
    selectedTimeSlotEl = null; // Reset selected time slot

    const dateStr = getISODateString(selectedDate);
    const slots = availabilityData[dateStr] || [];

    if (slots.length > 0) {
      slots.forEach((slot) => {
        const slotBtn = document.createElement("button");
        slotBtn.classList.add("time-slot");
        slotBtn.textContent = formatTime(slot, selectedTimeFormat);
        slotBtn.setAttribute("data-time", slot); // Store 24h format
        slotBtn.addEventListener("click", () =>
          handleTimeSlotClick(slotBtn, dateStr, slot)
        );
        timeSlotsListEl.appendChild(slotBtn);
      });
    } else {
      const noSlotsMsg = document.createElement("div");
      noSlotsMsg.classList.add("no-slots-message");
      noSlotsMsg.textContent = "No available slots for this date.";
      timeSlotsListEl.appendChild(noSlotsMsg);
    }
  }

  // --- Event Handlers ---
  function handleDateClick(date, clickedCell) {
    // Clear previous selection visually
    const previouslySelected = calendarGridEl.querySelector(
      ".calendar-date.selected"
    );
    if (previouslySelected) {
      previouslySelected.classList.remove("selected");
      previouslySelected.setAttribute("aria-pressed", "false");
    }

    // Set new selection
    selectedDate = date;
    clickedCell.classList.add("selected");
    clickedCell.setAttribute("aria-pressed", "true");

    // Render time slots for the newly selected date
    renderTimeSlots();
    timeSlotsListEl.scrollTop = 0; // Scroll to top of time slots
  }

  function handleTimeSlotClick(clickedButton, dateStr, timeStr) {
    // Deselect previous time slot if any
    if (selectedTimeSlotEl) {
      selectedTimeSlotEl.classList.remove("selected");
    }
    // Select the new one
    clickedButton.classList.add("selected");
    selectedTimeSlotEl = clickedButton;

    // **Action:** In a real app, this would trigger the next step
    // (e.g., show a confirmation, navigate to a booking form)
    console.log(`Booking selected: Date: ${dateStr}, Time: ${timeStr}`);
    alert(
      `You selected ${formatTime(
        timeStr,
        selectedTimeFormat
      )} on ${formatDateForDisplay(selectedDate)}.\n(Next step would follow)`
    );
    // Optionally, you could disable other time slots here after selection
  }

  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    selectedDate = null; // Clear selection when changing month
    timeSlotsSectionEl.style.display = "none";
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    selectedDate = null; // Clear selection when changing month
    timeSlotsSectionEl.style.display = "none";
    renderCalendar();
  });

  toggle12hBtn.addEventListener("click", () => {
    if (selectedTimeFormat !== "12h") {
      selectedTimeFormat = "12h";
      toggle12hBtn.classList.add("active");
      toggle24hBtn.classList.remove("active");
      renderTimeSlots(); // Re-render slots with new format
    }
  });

  toggle24hBtn.addEventListener("click", () => {
    if (selectedTimeFormat !== "24h") {
      selectedTimeFormat = "24h";
      toggle24hBtn.classList.add("active");
      toggle12hBtn.classList.remove("active");
      renderTimeSlots(); // Re-render slots with new format
    }
  });

  // --- Initial Render ---
  renderCalendar();
});
