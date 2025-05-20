// JavaScript remains identical to the previous "final polish" version.
// No changes needed here for the spacing or title adjustments.
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formStatusMessage = document.getElementById("formStatusMessage");

  const MY_EMAIL_ADDRESS = "monsurr671@gmail.com"; // !!! REPLACE THIS !!!
  const YOUR_NAME_FOR_EMAIL = "Your Name"; // !!! REPLACE THIS for email body !!!

  function validateField(field) {
    const errorElement =
      field.parentElement.querySelector(".form-error-message-unique") ||
      (field.parentElement.classList.contains("select-wrapper-unique")
        ? field.parentElement.parentElement.querySelector(
            ".form-error-message-unique"
          )
        : null);
    let isValid = true;
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("visible");
    }
    field.classList.remove("invalid");

    if (field.hasAttribute("required") && field.value.trim() === "") {
      if (errorElement) errorElement.textContent = "This field is required.";
      isValid = false;
    } else if (field.type === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(field.value.trim())) {
        if (errorElement)
          errorElement.textContent = "Please enter a valid email.";
        isValid = false;
      }
    } else if (
      field.tagName === "SELECT" &&
      field.hasAttribute("required") &&
      field.value === ""
    ) {
      if (errorElement) errorElement.textContent = "Please select an option.";
      isValid = false;
    }

    if (!isValid) {
      if (errorElement) errorElement.classList.add("visible");
      field.classList.add("invalid");
    }
    return isValid;
  }

  if (contactForm) {
    const requiredFields = contactForm.querySelectorAll("[required]");
    requiredFields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.classList.contains("invalid")) {
          validateField(field);
        }
      });
    });

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let isFormValid = true;
      requiredFields.forEach((field) => {
        if (!validateField(field)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        formStatusMessage.textContent = "Please correct the errors above.";
        formStatusMessage.className =
          "form-status-message-unique error visible";
        return;
      }

      formStatusMessage.textContent = "Preparing your message...";
      formStatusMessage.className = "form-status-message-unique visible";

      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const service = document.getElementById("contactService").value;
      const message = document.getElementById("contactMessage").value.trim();

      const subject = `Portfolio Inquiry: ${service} - From ${name}`;
      const body = `Hello ${YOUR_NAME_FOR_EMAIL},\n\nI am reaching out from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nService of Interest: ${service}\n\nMessage:\n${message}\n\nI look forward to discussing this further.\n\nBest regards,\n${name}\n`;
      const mailtoLink =
        `mailto:${MY_EMAIL_ADDRESS}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;
      try {
        window.location.href = mailtoLink;
        formStatusMessage.textContent =
          "Your email app should open. Please review and send!";
        formStatusMessage.className =
          "form-status-message-unique success visible";
        setTimeout(() => {
          contactForm.reset();
          requiredFields.forEach((field) => field.classList.remove("invalid"));
          document
            .querySelectorAll(".form-error-message-unique.visible")
            .forEach((el) => el.classList.remove("visible"));
          formStatusMessage.textContent = "";
          formStatusMessage.classList.remove("visible", "success", "error");
        }, 7000);
      } catch (e) {
        console.error("Error opening mailto link:", e);
        formStatusMessage.textContent =
          "Could not open email app. Please copy details or email me directly.";
        formStatusMessage.className =
          "form-status-message-unique error visible";
      }
    });
  }

  const srElements = document.querySelectorAll(".scroll-reveal");
  if (typeof IntersectionObserver === "function") {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    srElements.forEach((el) => observer.observe(el));
  } else {
    srElements.forEach((el) => el.classList.add("is-visible"));
  }
});
