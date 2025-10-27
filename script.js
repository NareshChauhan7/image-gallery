const imageData = [
  { src: "images/photo1.jpg", category: "nature" },
  { src: "images/photo2.jpg", category: "nature" },
  { src: "images/photo3.jpg", category: "animals" },
  { src: "images/photo4.jpg", category: "animals" },
  { src: "images/photo5.jpg", category: "nature" },
  { src: "images/photo6.jpg", category: "animals" },
  { src: "images/photo7.jpg", category: "nature" },
  { src: "images/photo8.jpg", category: "animals" },
  { src: "images/photo9.jpg", category: "animals" },
  { src: "images/photo10.jpg", category: "nature" },
  { src: "images/photo11.jpg", category: "city" },
  { src: "images/photo12.jpg", category: "city" },
  { src: "images/photo13.jpg", category: "city" },
  { src: "images/photo14.jpg", category: "city" },
  { src: "images/photo15.jpg", category: "city" },
];

const gallery = document.querySelector(".gallery");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentImages = [...imageData];
let currentIndex = 0;

// Load images dynamically
function loadImages(images) {
  gallery.innerHTML = "";
  images.forEach((img, index) => {
    const imageElement = document.createElement("img");
    imageElement.src = img.src;
    imageElement.alt = img.category;
    imageElement.dataset.index = index;
    gallery.appendChild(imageElement);

    imageElement.addEventListener("click", () => {
      currentIndex = index;
      showLightbox(img.src);
    });
  });
}

// Show lightbox
function showLightbox(src) {
  lightbox.style.display = "flex";
  lightboxImage.src = src;
}

// Close lightbox
function closeLightbox() {
  lightbox.style.display = "none";
}

// Filter functionality
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    const category = btn.dataset.category;

    if (category === "all") {
      currentImages = [...imageData];
    } else {
      currentImages = imageData.filter((img) => img.category === category);
    }
    loadImages(currentImages);
  });
});

// Lightbox navigation
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImage.src = currentImages[currentIndex].src;
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImage.src = currentImages[currentIndex].src;
});

closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// ✅ Initial load (keep this LAST)
loadImages(imageData);
