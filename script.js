const homeView = document.getElementById("homeView");
const viewerView = document.getElementById("viewerView");
const viewerFrame = document.getElementById("viewerFrame");
const viewerTitle = document.getElementById("viewerTitle");
const backButton = document.getElementById("backButton");
const openExternal = document.getElementById("openExternal");
const openExternalNotice = document.getElementById("openExternalNotice");
const iframeNotice = document.getElementById("iframeNotice");
const loadingOverlay = document.getElementById("loadingOverlay");

const cards = document.querySelectorAll(".card");

let iframeLoaded = false;
let iframeTimeout = null;

function getViewerLabel(title) {
  if (title === "PFIAP") return "PFIAP - FIAP Portfolio and levels";
  if (title === "MFIAP") return "MFIAP - Master FIAP";
  if (title === "FIAP World Cup") return "FIAP World Cups for Clubs";
  if (title === "FIAP Distinctions") return "FIAP Distinctions and levels";
  return title;
}

function showLoader() {
  loadingOverlay.classList.remove("hidden");
}

function hideLoader() {
  loadingOverlay.classList.add("hidden");
}

function showHome() {
  viewerFrame.src = "about:blank";
  iframeNotice.classList.add("hidden");
  hideLoader();
  iframeLoaded = false;

  viewerView.classList.remove("active");
  homeView.classList.add("active");

  localStorage.removeItem("fiapLastTitle");
  localStorage.removeItem("fiapLastUrl");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showViewer(title, url, remember = true) {
  if (!url || url === "#") {
    alert("This section does not have a public link yet.");
    return;
  }

  homeView.classList.remove("active");
  viewerView.classList.add("active");

  viewerTitle.textContent = getViewerLabel(title);

  if (openExternal) openExternal.href = url;
  if (openExternalNotice) openExternalNotice.href = url;

  iframeNotice.classList.add("hidden");
  showLoader();
  iframeLoaded = false;

  viewerFrame.src = url;

  if (remember) {
    localStorage.setItem("fiapLastTitle", title);
    localStorage.setItem("fiapLastUrl", url);
  }

  clearTimeout(iframeTimeout);
  iframeTimeout = setTimeout(() => {
    if (!iframeLoaded) {
      hideLoader();
      iframeNotice.classList.remove("hidden");
    }
  }, 3500);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.dataset.title;
    const url = card.dataset.url;
    showViewer(title, url);
  });
});

backButton.addEventListener("click", showHome);

viewerFrame.addEventListener("load", () => {
  iframeLoaded = true;
  hideLoader();
  iframeNotice.classList.add("hidden");
});

window.addEventListener("DOMContentLoaded", () => {
  const lastTitle = localStorage.getItem("fiapLastTitle");
  const lastUrl = localStorage.getItem("fiapLastUrl");

  if (lastTitle && lastUrl) {
    showViewer(lastTitle, lastUrl, false);
  }
});
