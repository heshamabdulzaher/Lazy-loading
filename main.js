//   http://localhost:3000/products?_page=1&_limit=20
let products = [];

window.onload = function() {
  fetch("http://localhost:3000/products")
    .then(response => response.json())
    .then(products => {
      showProductsOnTheDom(products);
      lazyLoadImages();
    });
};

const cardsWrapper = document.querySelector(".cards_wrapper");
function showProductsOnTheDom(products) {
  products.forEach(product => {
    let card = `<div class="card">
    <div 
      class="thumbnail lazyImg" 
      data-srcset="${product.img_url}" 
      style="background-image: url('./placeholder.svg')"
    ></div>
    <div class="product_details">
      <h2 class="product_name">${product.name}</h2>
      <h4 class="product_category">${product.category}</h4>
      <div class="product_price">${product.price} EGP</div>
      <button>Add to cart</button>
    </div>
  </div>
  `;
    // console.log(card);
    cardsWrapper.innerHTML += card;
  });
}

function lazyLoadImages() {
  var lazyImages = [].slice.call(document.querySelectorAll(".lazyImg"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(
      entries,
      observer
    ) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          // console.log();
          lazyImage.style.backgroundImage = `url('${
            lazyImage.dataset.srcset
          }')`;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
}
