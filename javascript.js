const cart = [];

// Adds the product from the inventory to page
function renderProduct(inv) {
    var source = document.getElementById("item").innerHTML;
    var template = Handlebars.compile(source);
    var html = template({
        product: inv
    });
    var product = document.querySelector("#product");
    product.innerHTML = "";
    product.insertAdjacentHTML("beforeend", html);
}

function refreshProduct(inv) {
    renderProduct(INVENTORY);
    selectItem();
    hideOutOfStock();
}

// Adds eventlisters to the buttons to add it to cart
function selectItem() {
    var products = document.querySelectorAll(".product");
    for (const i of products) {
        let btn = i.querySelector("button");
        btn.addEventListener("click", () => {
            addToCart(cart, INVENTORY, i);
            refreshCart(cart);
            viewCart(cart);
            refreshProduct(INVENTORY);
            cartAmount(cart);
        });
    }
}

// when a products stock is at 0 the item is hidden
function hideOutOfStock() {
    var products = document.querySelectorAll(".product");
    for (const product of products) {
        let stock = product.querySelector(".instock");
        if (stock.innerText < 1) {
            product.style.display = "none";
        } else {
            product.style.display = "block";
        }
    }
}

//Checks if an item's stock is more than one
function isInStock(item) {
    return item.instock > 0;
}

// Takes the product from inventory and adds it to cart
function addToCart(cart, inv, item) {
    for (obj of inv)
        if (obj.name === item.querySelector(".name").innerText) {
            if (isInStock(obj)) {
                obj.instock -= 1;
                cart.push(obj);
            }
        }
}

// when the user clicks the remove button, that item is removed from cart and added back to stock
function removeFromCart(cart, inv) {
    let items = document.querySelectorAll("#cart ul li");
    for (const item of items) {
        let btn = item.querySelector("button");

        btn.addEventListener("click", () => {
            let name = item.querySelector(".name").innerText;

            var elementPos = cart
                .map(function(x) {
                    return x.name;
                })
                .indexOf(name);

            var obj = cart[elementPos];

            for (i of inv) {
                if (obj.name === i.name) {
                    cart.splice(elementPos, 1);
                    i.instock++;
                    break;
                }
            }

            refreshCart(cart);
            viewCart(cart);
            cartAmount(cart);
            refreshProduct(INVENTORY);
        });
    }
}

// Creates the cart menu
function viewCart(cart) {
    var source = document.getElementById("cart-content").innerHTML;
    var template = Handlebars.compile(source);
    var html = template({
        cart: cart
    });
    document.querySelector("#cart ul").insertAdjacentHTML("beforeend", html);
}

// This prevents the cart contents from copying itself when loop is run
function refreshCart(cart) {
    var cartMenu = document.querySelector("#cart ul");
    cartMenu.innerHTML = "";
}
// The rent button displays the form for the user to validate
function rent() {
    const btn = document.querySelector("#cart button");
    btn.addEventListener("click", () => {
        document.querySelector("#payment-form").style.display = "block";
    });
}
// Counts how many items are in the cart
function cartAmount(cart) {
    let sum = 0;
    for (i of cart) {
        sum += 1;
    }
    let p = document.getElementById("cart-button").querySelector("p");
    p.innerHTML = `${sum}`;
    return sum;
}

// checks if the name input is valid
function nameIsValid(input) {
    if (input.value.match(/[a-zA-Z ]/)) {
        input.classList.remove("invalid");
        input.classList.add("valid");
        return true;
    } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
        return false;
    }
}

//checks if the email input is valid
function emailIsValid(input) {
    if (input.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        input.classList.remove("invalid");
        input.classList.add("valid");
        return true;
    } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
        return false;
    }
}

//checks if the phone input is valid
function phoneIsValid(input) {
    if (
        input.value.match(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/) ||
        input.value.match(/[0-9]{10}/)
    ) {
        input.classList.remove("invalid");
        input.classList.add("valid");
        return true;
    } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
        return false;
    }
}

// checks if the state input is valid
function stateIsValid(input) {
    if (input.value.match(/[a-zA-z]{2}/)) {
        input.classList.remove("invalid");
        input.classList.add("valid");
        return true;
    } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
        return false;
    }
}
// checks if the zip input is valid
function zipIsValid(input) {
    if (input.value.match(/^\d{5}$/)) {
        input.classList.remove("invalid");
        input.classList.add("valid");
        return true;
    } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
        return false;
    }
}

//checks if the street input is valid
function inputNotEmpty(input) {
    if (input.value !== "") {
        input.classList.remove("invalid");
        input.classList.add("valid");
        return true;
    } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
        return false;
    }
}

//checks if the form is valid
function formValidate() {
    let form = document.forms["purchase"];
    let btn = document.querySelector("#submit");

    let firstName = form.querySelector("#customer-firstname");
    let lastName = form.querySelector("#customer-lastname");
    let email = form.querySelector("#customer-email");
    let phone = form.querySelector("#customer-phone");
    let state = form.querySelector("#customer-state");
    let city = form.querySelector("#customer-city");
    let zip = form.querySelector("#customer-zip");
    let street = form.querySelector("#customer-street");

    nameIsValid(firstName);
    nameIsValid(lastName);
    emailIsValid(email);
    phoneIsValid(phone);
    stateIsValid(state);
    zipIsValid(zip);
    inputNotEmpty(street);
    inputNotEmpty(city);

    if (
        nameIsValid(firstName) &&
        nameIsValid(lastName) &&
        emailIsValid(email) &&
        phoneIsValid(phone) &&
        stateIsValid(state) &&
        zipIsValid(zip) &&
        inputNotEmpty(street) &&
        inputNotEmpty(city)
    ) {
        btn.style.display = "inline-block";
    } else {
        btn.style.display = "none";
    }
}

function rentUnlock(cart) {
    btn = document.getElementById("rent-button");
    if (cart.length > 0) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

// gets the cart total
function getTotal() {
    let prices = document.querySelectorAll(".cart-price");
    total = 0;
    for (price of prices) {
        console.log(price.innerText);
        total += parseFloat(price.innerText);
    }
    document.getElementById("total").innerText = `Total: $${total.toFixed(2)}`;
}

function clearInputs() {
    let form = document.forms["purchase"];
    let inputs = form.querySelectorAll("input");
    for (input of inputs) {
        input.value = "";
        input.classList.remove("valid");
    }
}

// Puts The prices to the second decimal place
Handlebars.registerHelper("moneyForm", function(obj) {
    var price = Handlebars.escapeExpression(obj);
    let newForm = Number(price).toFixed(2);
    return `${newForm}`;
});

//Cancel the form
document.querySelector("#cancel").addEventListener("click", event => {
    document.querySelector("#payment-form").style.display = "none";
    clearInputs();
    event.preventDefault();
});

//restarts the removeFromCart Function
document.querySelector("#cart-button").addEventListener("click", () => {
    formValidate();
    verify();
    rentUnlock(cart);
    getTotal();
    removeFromCart(cart, INVENTORY);
});

function verify() {
    let inputs = document.forms["purchase"].querySelectorAll("input");
    for (const input of inputs) {
        input.addEventListener("input", () => {
            formValidate();
        });
    }
}

renderProduct(INVENTORY);
selectItem();
hideOutOfStock();
rent();
cartAmount(cart);
formValidate();
