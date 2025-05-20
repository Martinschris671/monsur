document.addEventListener("DOMContentLoaded", () => {
  const toolCards = document.querySelectorAll(".tool-card");
  const modalOverlay = document.getElementById("toolModalOverlay");
  const modalCloseButton = document.getElementById("toolModalClose");

  const modalToolLogoImg = document.getElementById("modalToolLogo");
  const modalToolName = document.getElementById("modalToolName");
  const modalToolType = document.getElementById("modalToolType");
  const modalToolDescription = document.getElementById("modalToolDescription");
  const modalToolLink = document.getElementById("modalToolLink");

  // --- Tool Data ---
  // IMPORTANT: Replace 'YOUR_PATH_TO_ICONS/' with the actual path to your SVG logo files.
  // Example: "assets/icons/tools/figma.svg"
  const toolsData = {
    figma: {
      name: "Figma",
      type: "UI/UX Design, Prototyping, Collaboration",
      logoSrc: "icons/figma-1.png",
      description:
        "<strong>Figma is my undisputed champion for interface design and real-time collaboration.</strong> Its vector capabilities, component-based workflow, and seamless prototyping make it incredibly efficient for creating intuitive user experiences. The ability to work alongside team members or clients directly in the browser is a game-changer.",
      link: "https://figma.com",
    },
    photoshop: {
      name: "Adobe Photoshop",
      type: "Image Editing, Raster Graphics, Digital Art",
      logoSrc: "icons/adobe-photoshop-svgrepo-com.svg",
      description:
        "For intricate image manipulation, photo retouching, and complex digital art, <strong>Photoshop remains an industry standard for a reason.</strong> Its depth of tools and filters offers unparalleled control when pixel-perfect precision is paramount, especially for preparing assets or creating unique visual elements.",
      link: "https://www.adobe.com/products/photoshop.html",
    },
    vscode: {
      name: "Visual Studio Code",
      type: "Code Editor, Development Environment",
      logoSrc: "icons/vs-code-logo-microsoft-svgrepo-com.svg",
      description:
        "<strong>VS Code is the cornerstone of my development workflow.</strong> Its speed, extensive library of extensions, integrated terminal, powerful IntelliSense, and robust debugging capabilities significantly boost my productivity across various languages and frameworks. It's customizable to the extreme.",
      link: "https://code.visualstudio.com/",
    },
    github: {
      name: "GitHub",
      type: "Version Control, Code Hosting, Collaboration",
      logoSrc: "icons/github-icon-svgrepo-com.svg",
      description:
        "<strong>GitHub is indispensable for managing my codebases and collaborating on projects.</strong> Leveraging Git for version control is non-negotiable, and GitHub provides an excellent platform for repositories, issue tracking, pull requests, and CI/CD with GitHub Actions. It's central to both personal and team projects.",
      link: "https://github.com",
    },
    notion: {
      name: "Notion",
      type: "All-in-One Workspace, Notes, Project Management",
      logoSrc: "icons/notion-logo-svgrepo-com.svg",
      description:
        "<strong>Notion serves as my digital command center.</strong> Its incredible flexibility allows me to manage projects, take detailed notes, build knowledge bases, track tasks, and even draft content—all in one interconnected space. The ability to create custom databases and views is particularly powerful.",
      link: "https://notion.so",
    },
    // Add more tools here...
  };

  toolCards.forEach((card) => {
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
