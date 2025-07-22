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
