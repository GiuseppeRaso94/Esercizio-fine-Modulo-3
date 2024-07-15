// Array che simula degli input dinamici da server

const sectionsTitles = [
  "Trending Now",
  "Watch It Again",
  "New Releases",
  "Suggested For You",
];

// Funzione per la creazione delle slides

const footer = document.getElementsByTagName("footer");
const urls = Array.from({ length: 36 }).map((v, i) => `./assets/${i + 1}.png`); // Creazione di un array per immagazinare i percorsi dei files

function slidesRowCreation(sectionTitle, index) {
  const section = document.createElement("section"); // Creata la struttura attraverso la manipolazione del dom
  section.classList.add("container-fluid", "py-3", "fadingSlides");
  footer[0].before(section);
  const slidesTitleRow = document.createElement("div");
  slidesTitleRow.classList.add("row");
  section.appendChild(slidesTitleRow);
  const slidesTitleCol = document.createElement("div");
  slidesTitleCol.classList.add("col", "px-5");
  slidesTitleRow.appendChild(slidesTitleCol);
  const slidesTitle = document.createElement("h2");
  slidesTitleCol.appendChild(slidesTitle);
  slidesTitle.innerHTML = sectionTitle;
  const slidesRow = document.createElement("div");
  slidesRow.classList.add("row");
  section.appendChild(slidesRow);
  const slidesSwiper = document.createElement("div");
  slidesSwiper.classList.add("swiper");
  slidesRow.appendChild(slidesSwiper);
  const slidesWrapper = document.createElement("div");
  slidesWrapper.classList.add("swiper-wrapper", "px-5");
  slidesSwiper.appendChild(slidesWrapper);
  urls.slice(index * 9, (index + 1) * 9).forEach((v) => {
    // L'array contenente tutti i percorsi viene suddiviso ad intervalli di 9 slides per riga
    const template = `
    <div class="filmCard">
      <img class="w-100" src="${v}" alt="" />
    </div>`; // Viene immagazzinata questa stringa contenente dell'html ed il percorso dei files sempre diverso in base alla n iterazione
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide", "py-3");
    slide.innerHTML = template;
    slidesWrapper.appendChild(slide);
  });
}

sectionsTitles.forEach((sectionTitle, titleIndex) =>
  slidesRowCreation(sectionTitle, titleIndex)
); // La funzione viene chiamata per ogni elemento contenuto nell'array dei titoli per creare una riga di slides per ognuno di essi

// Creazione dello swiper

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: "auto",
  spaceBetween: 14,
  breakPoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 3,
    },
    640: {
      slidesPerView: "auto",
    },
  },
});

// Funzione per l'apparizione delle slides allo scroll

const elementToTrack = document.querySelectorAll(".fadingSlides");

const options = {
  rootMargin: "0px",
  threshold: 0.8,
};

const callBack = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
};

const observer = new IntersectionObserver(callBack, options);

elementToTrack.forEach((element) => {
  observer.observe(element);
});
