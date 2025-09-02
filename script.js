
let slides = document.querySelectorAll('.testimonial-slide')
let index = 0;

function showslide() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i == index) slide.classList.add('active');
  });
  index = (index + 1) % slides.length;
}
setInterval(showslide, 4000);
showslide();

//cake filter
const kg1filter = document.getElementById("kg1");
const kghalffilter = document.getElementById("kgHalf");
const bestsellerfilter = document.getElementById("bestseller");

const cakeitems = document.querySelectorAll(".cake-item");

kg1filter.addEventListener("change", applyfilter);
kghalffilter.addEventListener("change", applyfilter);
bestsellerfilter.addEventListener("change", applyfilter);

function applyfilter() {
  cakeitems.forEach(cake => {
    cake.style.display = "none";

    const quantity = cake.querySelector(".cake-quantity").textContent.toLowerCase();
    const bestseller = cake.querySelector(".best-seller"); // span
    let match = true;

    // If kg1 filter is checked, must be 1 kg
    if (kg1filter.checked && !quantity.includes("1 kg")) {
      match = false;
    }
    // If half kg filter is checked, must be 1/2 kg
    if (kghalffilter.checked && !quantity.includes("1/2 kg")) {
      match = false;
    }
    // If bestseller filter is checked, must have bestseller span
    if (bestsellerfilter.checked && !bestseller) {
      match = false;
    }

    // If no filters checked → show all
    if (!kg1filter.checked && !kghalffilter.checked && !bestsellerfilter.checked) {
      cake.style.display = "block";
    } else {
      cake.style.display = match ? "block" : "none";
    }
  });
}

// Select all buttons with the class "order-now-btn"
document.addEventListener("DOMContentLoaded", () => {
  const orderButtons = document.querySelectorAll(".order-now-btn");

orderButtons.forEach(button => {
  button.addEventListener("click", function (e) {
    e.preventDefault(); // stop the default link behavior

    // Ask for user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          console.log("User location:", lat, lon);

          // Redirect to your menu page with location info in query params
          window.location.href = `menu.html?lat=${lat}&lon=${lon}`;
        },
        error => {
          alert("Location access denied. Please allow location to continue.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  });
});
});
