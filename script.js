const homeView = document.getElementById("homeView");
const viewerView = document.getElementById("viewerView");
const viewerFrame = document.getElementById("viewerFrame");
const viewerTitle = document.getElementById("viewerTitle");
const backButton = document.getElementById("backButton");
const openExternalNotice = document.getElementById("openExternalNotice");
const iframeNotice = document.getElementById("iframeNotice");
const loadingOverlay = document.getElementById("loadingOverlay");
const cards = document.querySelectorAll(".card");

let iframeLoaded = false;
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

function showHome() {
  viewerFrame.src = "about:blank";
  iframeNotice.classList.add("hidden");
  loadingOverlay.classList.add("hidden");
  iframeLoaded = false;

  viewerView.classList.remove("active");
  homeView.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showDesktopViewer(title, url) {
  homeView.classList.remove("active");
  viewerView.classList.add("active");

  viewerTitle.textContent = getViewerLabel(title);
  openExternalNotice.href = url;

  iframeNotice.classList.add("hidden");
  loadingOverlay.classList.remove("hidden");
  iframeLoaded = false;

  viewerFrame.src = url;

  clearTimeout(iframeTimeout);
  iframeTimeout = setTimeout(() => {
    if (!iframeLoaded) {
      loadingOverlay.classList.add("hidden");
      iframeNotice.classList.remove("hidden");
    }
  }, 3500);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openSection(title, url) {
  if (!url || url === "#") {
    alert("This section does not have a public link yet.");
    return;
  }

  if (isMobileDevice()) {
    window.location.href = url;
    return;
  }

  showDesktopViewer(title, url);
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.dataset.title;
    const url = card.dataset.url;
    openSection(title, url);
  });
});

backButton.addEventListener("click", showHome);

viewerFrame.addEventListener("load", () => {
  iframeLoaded = true;
  loadingOverlay.classList.add("hidden");
  iframeNotice.classList.add("hidden");
});
