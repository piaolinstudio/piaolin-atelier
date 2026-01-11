const stage = document.getElementById("stage");
const envelopeClosed = document.getElementById("envelopeClosed");
const envelopeOpen = document.getElementById("envelopeOpen");

envelopeClosed.addEventListener("click", () => {
  stage.classList.add("opened");
  envelopeClosed.style.display = "none";
  envelopeOpen.style.display = "block";
});

envelopeOpen.addEventListener("click", () => {
  stage.classList.remove("opened");
  envelopeOpen.style.display = "none";
  envelopeClosed.style.display = "block";
});
