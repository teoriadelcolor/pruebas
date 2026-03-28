const homeView = document.getElementById("homeView");
const viewerView = document.getElementById("viewerView");
const viewerFrame = document.getElementById("viewerFrame");
const viewerTitle = document.getElementById("viewerTitle");
const backButton = document.getElementById("backButton");
const openExternal = document.getElementById("openExternal");
const openExternalNotice = document.getElementById("openExternalNotice");
const iframeNotice = document.getElementById("iframeNotice");

const cards = document.querySelectorAll(".card");

let iframeLoaded = false;
let iframeTimeout = null;

function showHome() {
  viewerFrame.src = "about:blank";
  iframeNotice.classList.add("hidden");
  iframeLoaded = false;

  viewerView.classList.remove("active");
  homeView.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showViewer(title, url) {
  if (!url || url === "#") {
    alert("This section does not have a public link yet.");
    return;
  }

  homeView.classList.remove("active");
  viewerView.classList.add("active");

  if (title === "PFIAP") {
  viewerTitle.textContent = "PFIAP - FIAP Portfolio and levels";
} else if (title === "MFIAP") {
  viewerTitle.textContent = "MFIAP - Master FIAP and levels";
} else if (title === "FIAP World Cup") {
  viewerTitle.textContent = "FIAP World Cups for Clubs";
} else if (title === "FIAP Distinctions") {
  viewerTitle.textContent = "FIAP Distinctions and levels";
} else {
  viewerTitle.textContent = title;
}
  
  openExternal.href = url;
  openExternalNotice.href = url;

  iframeNotice.classList.add("hidden");
  iframeLoaded = false;

  viewerFrame.src = url;

  clearTimeout(iframeTimeout);
  iframeTimeout = setTimeout(() => {
    if (!iframeLoaded) {
      iframeNotice.classList.remove("hidden");
    }
  }, 2500);

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
  iframeNotice.classList.add("hidden");
});
