// ========== Accordion (code của bạn) ==========
const accordions = document.querySelectorAll(".accordion");

accordions.forEach((acc) => {
  acc.addEventListener("click", function () {
    this.classList.toggle("active");

    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null; // đóng
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px"; // mở
    }
  });
});

// ========== Avatar click -> mở URL ==========
document.addEventListener("DOMContentLoaded", () => {
  const avatar = document.querySelector(".avatar");
  if (!avatar) return;

  // Nếu đã bọc bằng <a>, không cần JS
  if (avatar.closest("a")) return;

  const url = avatar.getAttribute("data-url");
  if (!url) return;

  avatar.style.cursor = "pointer";

  const openLink = () => {
    // "_blank" mở tab mới; dùng "_self" nếu muốn mở trong cùng tab
    window.open(url, "_blank", "noopener");
  };

  avatar.addEventListener("click", openLink);

  // Hỗ trợ bàn phím (Accessibility)
  avatar.setAttribute("tabindex", "0");
  avatar.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLink();
    }
  });
});
