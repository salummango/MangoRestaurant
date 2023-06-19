const addToCartButtons = document.querySelectorAll(".addtocart-btn");
const cartBtn = document.getElementById("cart");
const itemDetailsContainer = document.getElementById("itemdetails");
const cartTable = document.getElementById("carttable");
const totalPrice = document.getElementById("totalprice");
const closeBtn = document.getElementById("close");
const clearCartBtn = document.getElementById("clearcart");
const notification = document.getElementById("notification");
const cartCount = document.getElementById("cartcount");
const makeOrderBtn = document.getElementById("makeorderbtn")

let cartItems = [];
let total = 0;

addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedFoodId = button.getAttribute("data-food-id");

        // Fetching the food data from the API using selectedFoodId
        fetch(`/api/foods/${selectedFoodId}`)
            .then(response => response.json())
            .then(selectedFood => {
                cartItems.push(selectedFood);
                total += selectedFood.price;
                updateCart();
                showNotification("Item added to cart");
            })
            .catch(error => console.error(error));
    });
});


cartBtn.addEventListener("click", () => {
    itemDetailsContainer.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    itemDetailsContainer.style.display = "none";
});

clearCartBtn.addEventListener("click", () => {
    cartItems = [];
    total = 0;
    updateCart();
});

function updateCart() {
    cartCount.innerText = cartItems.length.toString();
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
                <button class="delete-btn" data-food-id="${item.id}">Delete</button>
            </td>
        `;
        cartTable.appendChild(tableRow);
    });

    totalPrice.innerText = `Total: $${total}`;

    if (cartItems.length > 0) {
        itemDetailsContainer.style.display = "block";
    } else {
        itemDetailsContainer.style.display = "none";
    }
}

cartTable.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const foodId = event.target.getAttribute("data-food-id");
        const foodIndex = cartItems.findIndex(item => item.id === foodId);

        if (foodIndex !== -1) {
            const deletedFood = cartItems[foodIndex];
            cartItems.splice(foodIndex, 1);
            total -= deletedFood.price;
            updateCart();
        }
    }
});

function showNotification(message) {
    notification.innerText = message;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 2000);
}


// Make Order
makeOrderBtn.addEventListener("click", () => {
    const orderid = generateOrderId();
    const controlno = generateControlNumber();
    const userid = '{{ userid }}'; // Accessing the Django user ID from the template context

    fetch('/api/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderid: orderid,
                controlno: controlno,
                userid: userid
            })
        })
        .then(response => response.json())
        .then(data => {
            const order_id = data.order_id;
            const payment_id = data.payment_id;
            const paymentUrl = `/api/payment/${order_id}/${payment_id}/`;
            window.location.href = paymentUrl;
        })
        .catch(error => console.error(error));

    // Reset orderid and controlno
    orderid = 0;
    controlno = '';

    // Clear the cart
    cartItems = [];
    total = 0;
    updateCart();
});

// Function to generate orderid 
function generateOrderId() {
    // To get the current timestamp
    const timestamp = Date.now();
    // To enerate a random number
    const random = Math.floor(Math.random() * 10000);
    // Concatenate the timestamp and random number to create the orderid
    const orderid = `${timestamp}-${random}`;
    return orderid;
}

// Function to generate controlno 
function generateControlNumber() {
    const min = 10000000;
    const max = 99999999;
    const controlno = Math.floor(Math.random() * (max - min + 1) + min);
    return controlno;
}