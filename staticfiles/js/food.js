//*************** CREATING CART IN FORM OF LIST

// const addToCartButtons = document.querySelectorAll("#addtocart");
// const cartButton = document.getElementById("cart");
// const cartCount = document.getElementById("cartcount");
// const itemDetailsContainer = document.getElementById("itemdetails");
// const cartList = document.getElementById("cartlist");
// const totalPrice = document.getElementById("totalprice");
// const closeBtn = document.getElementById("close");
// const clearCartBtn = document.getElementById("clearcart");
// const notification = document.getElementById("notification");

// let itemCount = 0;
// let cartItems = [];
// let total = 0;

// addToCartButtons.forEach(button => {
//     button.addEventListener("click", () => {
//         const productId = button.getAttribute("data-product-id");
//         const selectedProduct = products.find(product => product.id === productId);

//         if (selectedProduct) {
//             cartItems.push(selectedProduct);
//             itemCount++;
//             total += selectedProduct.price;
//             cartCount.innerText = itemCount;
//             notification.innerText = "Item added to cart";
//             notification.style.display = "block";

//             // Set a timeout to hide the notification after 2 seconds
//             setTimeout(() => {
//                 notification.style.display = "none";
//             }, 2000);
//         }
//     });
// });

// cartButton.addEventListener("click", () => {
//     if (cartItems.length > 0) {
//         cartList.innerHTML = "";

//         cartItems.forEach(item => {
//             const listItem = document.createElement("li");
//             listItem.innerHTML = `
//                 <div class="cart-item">
//                     <div class="item-image">
//                         <img src="${item.image}" alt="${item.name}">
//                     </div>
//                     <div class="item-details">
//                         <p><strong>Product Name:</strong> ${item.name}</p>
//                         <p><strong>Price:</strong> ${item.price}</p>
//                         <p><strong>Description:</strong> ${item.description}</p>
//                         <button class="delete-btn" data-product-id="${item.id}">Delete</button>
//                     </div>
//                 </div>
//             `;
//             cartList.appendChild(listItem);
//         });

//         totalPrice.innerText = `$${total}`;

//         itemDetailsContainer.style.display = "block";
//     }
// });

// cartList.addEventListener("click", (event) => {
//     if (event.target.classList.contains("delete-btn")) {
//         const productId = event.target.getAttribute("data-product-id");
//         const itemIndex = cartItems.findIndex(item => item.id === productId);

//         if (itemIndex !== -1) {
//             const deletedItem = cartItems[itemIndex];
//             cartItems.splice(itemIndex, 1);
//             itemCount--;
//             total -= deletedItem.price;
//             cartCount.innerText = itemCount;
//             totalPrice.innerText = `$${total}`;
//             event.target.parentElement.parentElement.remove();
//         }
//     }
// });

// clearCartBtn.addEventListener("click", () => {
//     cartItems = [];
//     itemCount = 0;
//     total = 0;
//     cartCount.innerText = itemCount;
//     totalPrice.innerText = `$${total}`;
//     cartList.innerHTML = "";
// });

// closeBtn.addEventListener("click", () => {
//     itemDetailsContainer.style.display = "none";
// });

// ****** CART IN A FORM OF TABLE

const addToCartButtons = document.querySelectorAll("#addtocart");
const cartButton = document.getElementById("cart");
const cartCount = document.getElementById("cartcount");
const itemDetailsContainer = document.getElementById("itemdetails");
const cartTable = document.getElementById("carttable");
const totalPrice = document.getElementById("totalprice");
const closeBtn = document.getElementById("close");
const clearCartBtn = document.getElementById("clearcart");
const notification = document.getElementById("notificatio

        let itemCount = 0;
        let cartItems = [];
        let total = 0;

        addToCartButtons.forEach(button => {
            button.addEventListener("click", () => {
                const productId = button.getAttribute("data-product-id");
                const selectedProduct = products.find(product => product.id === productId);

                if (selectedProduct) {
                    cartItems.push(selectedProduct);
                    itemCount++;
                    total += selectedProduct.price;
                    cartCount.innerText = itemCount;
                    notification.innerText = "Item added to cart";
                    notification.style.display = "block";

                    // Set a timeout to hide the notification after 2 seconds
                    setTimeout(() => {
                        notification.style.display = "none";
                    }, 2000);
                }
            });
        });

        cartButton.addEventListener("click", () => {
            if (cartItems.length > 0) {
                cartTable.innerHTML = `
            <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
        `;

                cartItems.forEach(item => {
                    const tableRow = document.createElement("tr");
                    tableRow.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>${item.description}</td>
                <td>
                    <button class="delete-btn" data-product-id="${item.id}">Delete</button>
                </td>
            `;
                    cartTable.appendChild(tableRow);
                });

                totalPrice.innerText = `Total:$${total}`;

                itemDetailsContainer.style.display = "block";
            }
        });

        cartTable.addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
                const productId = event.target.getAttribute("data-product-id");
                const itemIndex = cartItems.findIndex(item => item.id === productId);

                if (itemIndex !== -1) {
                    const deletedItem = cartItems[itemIndex];
                    cartItems.splice(itemIndex, 1);
                    itemCount--;
                    total -= deletedItem.price;
                    cartCount.innerText = itemCount;
                    totalPrice.innerText = `$${total}`;
                    event.target.parentElement.parentElement.remove();
                }
            }
        });

        clearCartBtn.addEventListener("click", () => {
            cartItems = [];
            itemCount = 0;
            total = 0;
            cartCount.innerText = itemCount;
            totalPrice.innerText = `$${total}`;
            cartTable.innerHTML = "";
        });

        closeBtn.addEventListener("click", () => {
            itemDetailsContainer.style.display = "none";
        });








        // Sample products array
        const products = [{
                id: "1",
                name: "Vanila Cake",
                price: 16,
                description: "Never Ending Sweetness"
            },
            {
                id: "2",
                name: "Product 2",
                price: "19.99",
                description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            {
                id: "3",
                name: "Product 3",
                price: "$14.99",
                description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
            }
        ];