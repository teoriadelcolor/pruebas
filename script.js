const homeView = document.getElementById("homeView");
const viewerView = document.getElementById("viewerView");
const viewerFrame = document.getElementById("viewerFrame");
const viewerTitle = document.getElementById("viewerTitle");
const backButton = document.getElementById("backButton");
const openExternalNotice = document.getElementById("openExternalNotice");
const iframeNotice = document.getElementById("iframeNotice");
const loadingOverlay = document.getElementById("loadingOverlay");
const cards = document.querySelectorAll(".card");

let iframeTimeout = null;

function isMobileDevice() {
  return window.innerWidth <= 700;
}

function getViewerLabel(title) {
  if (title === "PFIAP") return "PFIAP - FIAP Portfolio and levels";
  if (title === "MFIAP") return "MFIAP - Master FIAP";
  if (title === "FIAP World Cup") return "FIAP World Cups for Clubs";
  if (title === "FIAP Distinctions") return "FIAP Distinctions and levels";
  return title;
}

function resetViewer() {
  clearTimeout(iframeTimeout);
  viewerFrame.src = "about:blank";
  viewerFrame.classList.remove("is-visible");
  iframeNotice.classList.add("hidden");
  loadingOverlay.classList.add("hidden");
}

function showHome() {
  resetViewer();
  viewerView.classList.remove("active");
  homeView.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showDesktopViewer(title, url) {
  homeView.classList.remove("active");
  viewerView.classList.add("active");

  viewerTitle.textContent = getViewerLabel(title);
  openExternalNotice.href = url;

  viewerFrame.classList.remove("is-visible");
  iframeNotice.classList.add("hidden");
  loadingOverlay.classList.remove("hidden");

  // Espera un instante antes de asignar src para que el overlay pinte primero
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      viewerFrame.src = url;
    });
  });

  iframeTimeout = setTimeout(() => {
    loadingOverlay.classList.add("hidden");
    iframeNotice.classList.remove("hidden");
  }, 6000);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

cards.forEach((card) => {
  card.addEventListener("click", (event) => {
    const title = card.dataset.title;
    const url = card.getAttribute("href");

    if (!url || url === "#") {
      event.preventDefault();
      alert("This section does not have a public link yet.");
      return;
    }

    if (isMobileDevice()) {
      event.preventDefault();
      window.location.assign(url);
      return;
    }

    event.preventDefault();
    showDesktopViewer(title, url);
  });
});

backButton.addEventListener("click", showHome);

viewerFrame.addEventListener("load", () => {
  clearTimeout(iframeTimeout);
  iframeNotice.classList.add("hidden");
  loadingOverlay.classList.add("hidden");
  viewerFrame.classList.add("is-visible");
});
