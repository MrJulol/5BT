document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
      allProducts = data;
      displayProducts(data);
    })
    .catch((error) => console.error("Error fetching products:", error));
});

let allProducts = [];

function displayProducts(products) {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";

  products.forEach((product) => {
    const template = document.getElementById("productTemplate").cloneNode(true);
    template.style.display = "block";
    template.querySelector(".p-image").src = product.image;
    template.querySelector(".p-title").textContent = product.title;
    template.querySelector(".p-description").textContent = product.description;
    template.querySelector(".p-price").textContent = product.price.toFixed(2);
    template.querySelector(".p-categories").innerHTML = product.categories
      .map((cat) => `<span class="badge">${cat}</span>`)
      .join(" ");
    template.querySelector(".add-to-cart").onclick = () => addToCart(product);
    productGrid.appendChild(template);
  });
}

function searchProducts() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchText) ||
      p.description.toLowerCase().includes(searchText)
  );
  filterProducts(filtered);
}

function filterProducts(products = allProducts) {
  const selectedCategories = Array.from(
    document.querySelectorAll(".categories input:checked")
  ).map((cb) => cb.value);
  const filtered = products.filter((p) =>
    selectedCategories.every((cat) => p.categories.includes(cat))
  );
  displayProducts(filtered);
}

function addToCart(product) {
  const cartItems = document.getElementById("cartItems");
  let existingItem = [...cartItems.children].find(
    (item) => item.querySelector(".i-title").textContent === product.title
  );

  if (existingItem) {
    let quantityInput = existingItem.querySelector(".i-quantity");
    quantityInput.value = parseInt(quantityInput.value) + 1;
  } else {
    const template = document
      .getElementById("cartItemTemplate")
      .cloneNode(true);
    template.style.display = "block";
    template.querySelector(".i-title").textContent = product.title;
    template.querySelector(".i-price").textContent = product.price.toFixed(2);
    template.querySelector(".i-quantity").onchange = updateTotal;
    cartItems.appendChild(template);
  }
  updateTotal();
}

function updateTotal() {
  let total = 0;
  document.querySelectorAll(".cart-item").forEach((item) => {
    const price = parseFloat(item.querySelector(".i-price").textContent);
    const quantity = parseInt(item.querySelector(".i-quantity").value);
    total += price * quantity;
  });
  document.getElementById("totalAmount").textContent = total.toFixed(2) + " €";
}
