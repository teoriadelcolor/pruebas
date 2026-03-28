{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const homeView = document.getElementById("homeView");\
const viewerView = document.getElementById("viewerView");\
const viewerFrame = document.getElementById("viewerFrame");\
const viewerTitle = document.getElementById("viewerTitle");\
const backButton = document.getElementById("backButton");\
const openExternal = document.getElementById("openExternal");\
const openExternalNotice = document.getElementById("openExternalNotice");\
const iframeNotice = document.getElementById("iframeNotice");\
\
const cards = document.querySelectorAll(".card");\
\
let iframeLoaded = false;\
let iframeTimeout = null;\
\
function showHome() \{\
  viewerFrame.src = "about:blank";\
  iframeNotice.classList.add("hidden");\
  iframeLoaded = false;\
\
  viewerView.classList.remove("active");\
  homeView.classList.add("active");\
  window.scrollTo(\{ top: 0, behavior: "smooth" \});\
\}\
\
function showViewer(title, url) \{\
  homeView.classList.remove("active");\
  viewerView.classList.add("active");\
\
  viewerTitle.textContent = title;\
  openExternal.href = url;\
  openExternalNotice.href = url;\
\
  iframeNotice.classList.add("hidden");\
  iframeLoaded = false;\
\
  viewerFrame.src = url;\
\
  clearTimeout(iframeTimeout);\
  iframeTimeout = setTimeout(() => \{\
    if (!iframeLoaded) \{\
      iframeNotice.classList.remove("hidden");\
    \}\
  \}, 2500);\
\
  window.scrollTo(\{ top: 0, behavior: "smooth" \});\
\}\
\
cards.forEach((card) => \{\
  card.addEventListener("click", () => \{\
    const title = card.dataset.title;\
    const url = card.dataset.url;\
    showViewer(title, url);\
  \});\
\});\
\
backButton.addEventListener("click", showHome);\
\
viewerFrame.addEventListener("load", () => \{\
  iframeLoaded = true;\
  iframeNotice.classList.add("hidden");\
\});}