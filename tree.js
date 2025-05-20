document.addEventListener("DOMContentLoaded", function () {
  const skillTreeItems = document.querySelectorAll(".skill-tree li");

  skillTreeItems.forEach((item) => {
    const skillNode = item.querySelector(":scope > .skill-node");
    const subList = item.querySelector(":scope > ul");

    if (skillNode && subList) {
      skillNode.addEventListener("click", function (event) {
        if (event.target.closest(".detail-popup")) {
          return;
        }
        const isExpanded = item.classList.toggle("expanded");
        skillNode.setAttribute("aria-expanded", isExpanded.toString());
      });

      skillNode.setAttribute("role", "button");
      skillNode.setAttribute(
        "aria-expanded",
        item.classList.contains("expanded").toString()
      );
      skillNode.setAttribute("tabindex", "0");

      skillNode.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          const isExpanded = item.classList.toggle("expanded");
          skillNode.setAttribute("aria-expanded", isExpanded.toString());
        }
      });
    }
  });
});
