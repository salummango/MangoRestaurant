// Make AJAX request to the API endpoint
fetch("/api/foods")
    .then(response => response.json())
    .then(foods => displayFoods(foods));

// Display the retrieved foods
function displayFoods(foods) {
    const foodContainer = document.getElementById("food_part");

    foods.forEach(food => {
        const foodDiv = document.createElement("div");
        foodDiv.className = food.type === "pizza" ? "box1" : "box2";

        if (food.type === "pizza") {
            foodDiv.innerHTML = `
        <div><img src="${food.image}" alt="image"></div>
        <div>
          <h3>${food.name}</h3>
          <p>${food.description}</p>
          <div class="addtocart">
            <span class="price">$${food.price}</span>
            <button class="addtocart-btn" data-food-id="${food.id}">add to cart</button>
          </div>
        </div>
      `;
        } else {
            foodDiv.innerHTML = `
        <h3>${food.name}</h3>
        <img src="${food.image}" alt="image">
        <p>${food.description}</p>
        <div class="addtocart">
          <span class="price">$${food.price}</span>
          <button class="addtocart-btn" data-food-id="${food.id}">add to cart</button>
        </div>
      `;
        }

        foodContainer.appendChild(foodDiv);
    });

    // Add event listener to "add to cart" buttons
    const addtocartButtons = document.getElementsByClassName("addtocart-btn");
    Array.from(addtocartButtons).forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

// Function to handle "add to cart" button click
function addToCart(event) {
    const foodId = event.target.dataset.foodId;
    fetch("/api/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ food_id: foodId }),
        })
        .then(response => {
            if (response.ok) {
                alert("Item added to cart!");
            } else {
                alert("Failed to add item to cart.");
            }
        })
        .catch(error => {
            console.error("Error adding item to cart:", error);
        });
}