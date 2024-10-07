const PRODUCTS = [
    {
        id: 1,
        name: "Laptop",
        price: 999.99,
        desc: "High performance laptop",
        category: "Electronics",
    },
    {
        id: 2,
        name: "Smartphone",
        price: 699.99,
        desc: "Latest model smartphone",
        category: "Electronics",
    },
    {
        id: 3,
        name: "Headphones",
        price: 99.99,
        desc: "Wireless headphones",
        category: "Electronics",
    },
    {
        id: 4,
        name: "T-shirt",
        price: 19.99,
        desc: "Comfortable cotton t-shirt",
        category: "Clothing",
    },
    {
        id: 5,
        name: "Jeans",
        price: 49.99,
        desc: "Stylish denim jeans",
        category: "Clothing",
    },
    {
        id: 6,
        name: "Backpack",
        price: 79.99,
        desc: "Durable backpack",
        category: "Accessories",
    },
    {
        id: 7,
        name: "Watch",
        price: 149.99,
        desc: "Fashionable wristwatch",
        category: "Accessories",
    },
    {
        id: 8,
        name: "Desk Lamp",
        price: 29.99,
        desc: "LED desk lamp",
        category: "Home & Office",
    },
    {
        id: 9,
        name: "Coffee Mug",
        price: 9.99,
        desc: "Ceramic coffee mug",
        category: "Home & Office",
    },
    {
        id: 10,
        name: "Notebook",
        price: 4.99,
        desc: "Spiral notebook",
        category: "Home & Office",
    },
];

const CATEGORIES = [
    "All Data",
    "Electronics",
    "Clothing",
    "Accessories",
    "Home & Office",
];




let CART = [];
const categories = document.querySelector(".list-group");
const products = document.querySelector("#dvProducts");
const searchInput = document.querySelector("#txtSearch");
const btnShowCart = document.querySelector("#btnShowCart");
const btnCloseCart = document.querySelector("#btnCloseCart");
const btn_close = document.querySelector(".btn-close");



/* -------------- FUNCTIONS ---------------- */

function fillCategories() {
    CATEGORIES.forEach((category) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = category;
        categories.appendChild(li);

        li.addEventListener("click", () => {
            const allLiElements = document.querySelectorAll(".list-group-item");
            allLiElements.forEach((item) => {
                item.classList.remove("active");
            });

            li.classList.add("active");

            if (category === "All Data") {
                fillTable(PRODUCTS);
            } else {
                const filteredProducts = PRODUCTS.filter(
                    (product) => product.category === category
                );
                products.innerHTML = "";
                fillTable(filteredProducts);
            }
        });
    });
    categories.firstChild.classList.add("active");
}

function fillTable(DATAS) {
    DATAS.forEach((product) => {
        const productCardElement = document.createElement("div");
        productCardElement.classList.add("product");
        productCardElement.innerHTML = `
            <div class="card-header">
                <span>${product.name}</span>
            </div>
            <div class="card-body">
                <h3>${product.desc}</h3>
                <p>${product.price} AZN</p>
            </div>
            <div class="card-footer ">
                <div class="card-footer__left">
                    <button id="decrease">-</button>
                    <span id="quantity">0</span>
                <button id="increase">+</button>
                    </div>
                <div class="card-footer__right">
                    <button class="btn btn-primary" id="addToCart-btn">
                        Add to Cart
                    </button>
                </div>
            </div>
                        `;

        products.appendChild(productCardElement);
        const decreaseButton = productCardElement.querySelector("#decrease");
        const increaseButton = productCardElement.querySelector("#increase");
        const quantityElement = productCardElement.querySelector("#quantity");
        productCardElement
            .querySelector("#addToCart-btn")
            .addEventListener("click", () =>
                addToCart({
                    ...product,
                    quantity: Number(quantityElement.textContent),
                })
            );

        decreaseButton.addEventListener("click", () => {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantityElement.textContent = quantity - 1;
            }
            product.quantity = quantityElement.textContent;
        });

        increaseButton.addEventListener("click", () => {
            let quantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = quantity + 1;
            product.quantity = quantityElement.textContent;
        });
    });
}

function addToCart(product) {
    if (product.quantity === 0) {
        return;
    }
    CART.push(product);
    alert("Added");

}

function fillModal() {
    const modalBody = document.querySelector("#modal-body__top");
    modalBody.innerHTML = "";
    if (CART.length === 0) {
        modalBody.innerHTML = "No items in cart";
        return;
    }
    let existingProduct = false;
    for (let i = 0; i < CART.length; i++) {
        for (let j = i + 1; j < CART.length; j++) {
            if (CART[i].id === CART[j].id) {
                existingProduct = true;
                CART[i].quantity =
                    Number(CART[i].quantity) + Number(CART[j].quantity);
                CART.splice(j, 1);
            }
        }
    }
    CART.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
                <span>${product.name}</span>
                <span>Price:  ${product.price}x${product.quantity}</span>
                <span>
                    <button id="decrease">-</button>
                    <span id="quantity">${product.quantity}</span>
                    <button id="increase">+</button>
                </span>
            
        `;
        modalBody.appendChild(productElement);
        productElement
            .querySelector("#decrease")
            .addEventListener("click", () => {
                product.quantity = product.quantity - 1;
                fillModal();
            });
        productElement
            .querySelector("#increase")
            .addEventListener("click", () => {
                product.quantity = product.quantity + 1;

                fillModal();
            });
    });
    const totalAZN = document.querySelector("#totalAZN");
    const total = CART.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
    );
    totalAZN.textContent = total.toFixed(2);
}


/* -------------- Event listeners ---------------- */
searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value;
    const filteredProducts = PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    products.innerHTML = "";
    fillTable(filteredProducts);
});
btnCloseCart.addEventListener("click", () => {
    document.querySelector(".modal").style = "display:none; opacity:0;";
});
btn_close.addEventListener("click", () => {
    document.querySelector(".modal").style = "display:none; opacity:0;";
});
btnShowCart.addEventListener("click", () => {
    document.querySelector(".modal").style = "display:block; opacity:1;";
    fillModal();
});




/* -------------- INIT ---------------- */
fillTable(PRODUCTS);
fillCategories();