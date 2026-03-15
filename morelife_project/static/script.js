let cart = [];

/* ADD TO CART */

function addToCart(name, price){

let existing = cart.find(item => item.name === name)

if(existing){

existing.quantity += 1

}else{

cart.push({
name: name,
price: price,
quantity: 1
})

}

updateCart()

}


/* UPDATE CART DISPLAY */

function updateCart(){

let cartItems = document.getElementById("cart-items")
let cartCount = document.getElementById("cart-count")
let totalDisplay = document.getElementById("total")

cartItems.innerHTML = ""

let total = 0
let count = 0

cart.forEach((item,index)=>{

total += item.price * item.quantity
count += item.quantity

let li = document.createElement("li")

li.innerHTML = `
${item.name} - ₦${item.price.toLocaleString()}

<button onclick="decreaseQty(${index})">-</button>

<span style="margin:0 10px">${item.quantity}</span>

<button onclick="increaseQty(${index})">+</button>

<button onclick="removeItem(${index})">REMOVE</button>
`

cartItems.appendChild(li)

})

cartCount.innerText = count
totalDisplay.innerText = total.toLocaleString()

}


/* INCREASE QUANTITY */

function increaseQty(index){

cart[index].quantity++

updateCart()

}


/* DECREASE QUANTITY */

function decreaseQty(index){

if(cart[index].quantity > 1){

cart[index].quantity--

}else{

cart.splice(index,1)

}

updateCart()

}


/* REMOVE ITEM */

function removeItem(index){

cart.splice(index,1)

updateCart()

}


/* MOBILE MENU */

function toggleMenu(){

let menu = document.getElementById("nav-menu")

menu.classList.toggle("active")

}


/* SCROLL TO PRODUCTS */

function scrollToProducts(){

document.getElementById("products").scrollIntoView({
behavior:"smooth"
})

}function changeQty(button, amount){

let input = button.parentElement.querySelector(".qty-input")

let value = parseInt(input.value)

value += amount

if(value < 1){
value = 1
}

input.value = value

}



function addProductToCart(button,name,price){

let product = button.parentElement

let qty = parseInt(product.querySelector(".qty-input").value)

let existing = cart.find(item => item.name === name)

if(existing){

existing.quantity += qty

}else{

cart.push({
name:name,
price:price,
quantity:qty
})

}

updateCart()

}