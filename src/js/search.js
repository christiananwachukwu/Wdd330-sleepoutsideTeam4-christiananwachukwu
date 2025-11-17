document.addEventListener("DOMContentLoaded", () => {
  // waiting a moment for header to load
  setTimeout(() => {
    const form = document.getElementById("productSearchForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("searchInput").value.trim();
      if (!query) return;

      localStorage.setItem("searchQuery", query);
      window.location.href = "/product_listing/index.html";
    });
  }, 50);
});
