document.addEventListener("DOMContentLoaded", () => {
  const allHardwareCards = document.querySelectorAll(".hardware-card-refined");
  const modalOverlay = document.getElementById("toolModalOverlay");
  const modalCloseButton = document.getElementById("toolModalClose");

  const modalToolLogoImg = document.getElementById("modalToolLogo");
  const modalToolName = document.getElementById("modalToolName");
  const modalToolType = document.getElementById("modalToolType");
  const modalToolDescription = document.getElementById("modalToolDescription");
  const modalToolSpecsDiv = document.getElementById("modalToolSpecs");
  const modalToolLink = document.getElementById("modalToolLink");

  const toolsData = {
    macbookpro: {
      name: "MacBook Pro (M-Series)",
      type: "Primary Workstation",
      logoSrc: "YOUR_PATH_TO_IMAGES/macbook-pro.png",
      description:
        "<strong>This machine is the heart of my setup.</strong> The Apple M-series chip provides blazing fast performance for everything from complex design software to heavy development tasks and video editing. The Liquid Retina XDR display is simply stunning for visual work.",
      link: "https://www.apple.com/macbook-pro/",
      specs: [
        { label: "Chip", value: "Apple M3 Max (Example)" },
        { label: "Memory", value: "32GB Unified" },
        { label: "Storage", value: "1TB SSD" },
        { label: "Display", value: "16-inch Liquid Retina XDR" },
      ],
    },
    dellmonitor: {
      name: "Dell Ultrasharp U2723QE",
      type: "Main Display (4K IPS Black)",
      logoSrc: "YOUR_PATH_TO_IMAGES/dell-ultrasharp.png",
      description:
        "<strong>Color accuracy and clarity are paramount for my design work.</strong> This Dell Ultrasharp offers exceptional DCI-P3 coverage, 4K resolution, and great ergonomics. The built-in KVM switch is also a huge productivity booster when managing multiple inputs.",
      link: "https://www.dell.com/en-us/shop/dell-ultrasharp-27-4k-usb-c-hub-monitor-u2723qe/apd/210-bdpf/monitors-monitor-accessories",
      specs: [
        { label: "Size", value: "27-inch" },
        { label: "Resolution", value: "4K (3840 x 2160)" },
        { label: "Panel Type", value: "IPS Black" },
        { label: "Color Gamut", value: "98% DCI-P3" },
      ],
    },
    keychronq1: {
      name: "Keychron Q1 Pro",
      type: "Custom Mechanical Keyboard",
      logoSrc: "YOUR_PATH_TO_IMAGES/keychron-q1.png",
      description:
        "<strong>A great typing experience makes all the difference for long coding sessions.</strong> The Keychron Q1 Pro offers a fantastic tactile feel with Gateron Brown switches, a solid aluminum build, and QMK/VIA support for complete customization. It's a joy to type on.",
      link: "https://www.keychron.com/products/keychron-q1-pro-qmk-via-wireless-custom-mechanical-keyboard",
      specs: [
        { label: "Layout", value: "75% Compact" },
        { label: "Switches", value: "Gateron G Pro Brown" },
        { label: "Connectivity", value: "Wireless & Wired" },
        { label: "Body", value: "CNC Aluminum" },
      ],
    },
    // You would add your software tools here too if this is the main data object
    // figma: { name: "Figma", type: "UI/UX Design", logoSrc: "YOUR_PATH_TO_ICONS/figma.svg", ... no specs needed for software usually }
  };

  allHardwareCards.forEach((card) => {
    // Parallax effect is removed as per new simpler card design, shine is CSS based on hover
    // Shine effect is purely CSS on .hardware-card-refined:hover .hardware-shine-overlay

    card.addEventListener("click", () => {
      const toolKey = card.dataset.tool;
      const toolData = toolsData[toolKey];

      if (toolData) {
        modalToolLogoImg.src = toolData.logoSrc;
        modalToolLogoImg.alt = toolData.name + " Logo";
        modalToolName.textContent = toolData.name;
        modalToolType.textContent = toolData.type;
        modalToolDescription.innerHTML = toolData.description;
        modalToolLink.href = toolData.link;
        modalToolLink.style.display = toolData.link ? "inline-flex" : "none";

        if (toolData.specs && toolData.specs.length > 0) {
          let specsHtml =
            '<h4 class="specs-title">Key Specifications:</h4><ul class="specs-list">';
          toolData.specs.forEach((spec) => {
            specsHtml += `<li><span class="spec-label">${spec.label}</span> <span class="spec-value">${spec.value}</span></li>`;
          });
          specsHtml += "</ul>";
          modalToolSpecsDiv.innerHTML = specsHtml;
          modalToolSpecsDiv.style.display = "block";
        } else {
          modalToolSpecsDiv.innerHTML = "";
          modalToolSpecsDiv.style.display = "none";
        }

        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
      } else {
        console.warn(`No data found for tool key: ${toolKey}`);
      }
    });
  });

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  modalCloseButton.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
});
