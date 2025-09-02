
let cart = {};
let cartcount = 0;
let cartotal = 0;

let cartotalelement = document.getElementById("cart-total");
let cartcountelement = document.getElementById("cart-count");

let addbtns = document.querySelectorAll(".add-btn");

addbtns.forEach(btn => {
  btn.addEventListener("click", () => {
    let productCard = btn.parentElement;
    let name = productCard.querySelector("h4").innerText;
    let pricetext = btn.previousElementSibling.innerText;
    let onlyprice = pricetext.split(" ")[0].replace(/[^\d]/g, "");
    let price = parseInt(onlyprice);

    // Update cart
    if (cart[name]) {
      cart[name].qty++;
    } else {
      cart[name] = { price: price, qty: 1 };
    }

    cartcount++;
    cartotal += price;
    cartcountelement.innerText = cartcount;
    cartotalelement.innerText = cartotal;

    // Replace Add button with qty controls
    btn.outerHTML = `
      <div class="qty-controls">
        <button class="decrease">-</button>
        <span class="qty">${cart[name].qty}</span>
        <button class="increase">+</button>
      </div>
    `;

    let controls = productCard.querySelector(".qty-controls");
    let dec = controls.querySelector(".decrease");
    let inc = controls.querySelector(".increase");
    let qtySpan = controls.querySelector(".qty");

    console.table(cart);

    // Increase button
    inc.addEventListener("click", () => {
      cart[name].qty++;
      qtySpan.innerText = cart[name].qty;

      cartcount++;
      cartotal += price;

      cartcountelement.innerText = cartcount;
      cartotalelement.innerText = cartotal;

      console.table(cart);
          console.log("cart-total", cartotal);
    });
    // Decrease button
    dec.addEventListener("click", () => {
      cart[name].qty--;
      cartcount--;
      cartotal -= price;

      if (cart[name].qty <= 0) {
        delete cart[name];

        // Restore Add button
        controls.outerHTML = `<button class="add-btn">Add</button>`;
        let newBtn = productCard.querySelector(".add-btn");

        // Re-bind add button
        newBtn.addEventListener("click", () => {
          newBtn.outerHTML = btn.outerHTML; // restore structure
          productCard.querySelector(".add-btn").click();
        });
      } else {
        qtySpan.innerText = cart[name].qty;
      }

      cartcountelement.innerText = cartcount;
      cartotalelement.innerText = cartotal;

      console.table(cart);
    });
    console.log("cart-total", cartotal);
    localStorage.setItem("cart", JSON.stringify(cart));

  });
});

let categoryfilter = document.querySelectorAll(".category-filter");
let pricefilter = document.querySelectorAll(".price-filter");
let products = document.querySelectorAll(".product-card");

function applyfilter() {
  // selected categories
  let selectedcategory = Array.from(categoryfilter)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  // selected price
  let selectedprice = document.querySelector(".price-filter:checked")?.value;

  products.forEach(product => {
    let category = product.dataset.category;
    let price = parseInt(product.dataset.price);

    let categorymatch = selectedcategory.length === 0 || selectedcategory.includes(category);

    let pricematch = true;
    if (selectedprice) {
      if (selectedprice === "0-200") {
        pricematch = price <= 200;
      } else if (selectedprice === "200-500") {
        pricematch = price >= 200 && price <= 500;
      } else if (selectedprice === "500+") {
        pricematch = price > 500;
      }
    }

    // Show or hide
    product.style.display = (categorymatch && pricematch) ? "" : "none";
  });
}

// attach listeners
categoryfilter.forEach(cb => cb.addEventListener("change", applyfilter));
pricefilter.forEach(radio => radio.addEventListener("change", applyfilter));

// run once on load
applyfilter();
