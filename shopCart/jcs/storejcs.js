if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    console.log('Make me a Millionarie')

    const removeCartButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartButtons)

    for (let i = 0; i < removeCartButtons.length; i++) {
        const button = removeCartButtons[i];

        button.addEventListener('click', removeCartRow)
    }

    // add event listener to quantity inputs
    const quantityInputs = document.getElementsByClassName('cart-quantity-input')

    for (let i = 0; i < quantityInputs.length; i++) {
        const input = quantityInputs[i];
        input.addEventListener('change', updateQuantities)
        input.min = 1
        input.max = 10
    }

    // add event listener to add cart button

    const addCartButtons = document.getElementsByClassName('shop-item-button')

    for (let i = 0; i < addCartButtons.length; i++) {
        const button = addCartButtons[i];
        button.addEventListener('click', addToCartClicked)
    }

    // add event listener to purchase button

    const purchaseButton = document.getElementsByClassName('btn-purchase')[0]
    purchaseButton.addEventListener('click', purchaseCart)

}

function purchaseCart(event){
    const cartItems = document.getElementsByClassName('cart-items')[0]
    
    alert('Thanks for your Purchase')

    while(cartItems.hasChildNodes)
        cartItems.firstChild.remove()
        
    // const cartItemsRows = cartItems.getElementsByClassName('cart-row')
    // does not work
    // cartItemsRows.forEach(element => {
    //     element.remove()
    // });

    // not working because the index changes after removing an element
    // for (let i = 0; i < cartItemsRows.length; i++) {
    //     cartItemsRows[i].remove(); 
    // }

}

function addToCartClicked(event){
    const button = event.target
    const shopItem = button.parentElement.parentElement

    // query the variable data needed
    const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

    // console.log(title, price, imageSrc)

    // check if the title already exists and prevent duplicate additions
    const cartItems = document.getElementsByClassName('cart-items')[0]
    const cartItemsRows = cartItems.getElementsByClassName('cart-row')

    for (let i = 0; i < cartItemsRows.length; i++) {
        const cartItemTitle = cartItemsRows[i].getElementsByClassName('cart-item-title')[0].innerText
        if(title === cartItemTitle){
            alert(`${title} is already in cart`)
            return        
        }
    }

    addItemToCart(title, price, imageSrc)
    updateCartTotal()

}

function addItemToCart(title, price, imageSrc){
    //create a new container for the new cart row
    const newCartRow = document.createElement('div')
    newCartRow.classList.add('cart-row')
    // newCartRow.innerText = 'a new cart row'

    const newCartRowContent = 
    `   <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

    newCartRow.innerHTML = newCartRowContent

    // adding event listeners for button and quantity
    newCartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartRow)
    newCartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', updateQuantities)

    // query the current container for cart rows
    const cartItemsContainer = document.getElementsByClassName('cart-items')[0]
    cartItemsContainer.append(newCartRow)

    
}


function updateQuantities(event){

    const input = event.target

    if(isNaN(input.value) || input.value > 10 || input.value < 1)
        input.value = 1

    updateCartTotal()
}

function removeCartRow(event) {
    console.log('tried to remove')
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}

// update total cart $amount after removing a row
function updateCartTotal() {
    const cartItems = document.getElementsByClassName('cart-items')[0]
    const cartItemsRows = cartItems.getElementsByClassName('cart-row')
    // console.log(cartItemsRows)

    let totalCartPrice = 0;

    for (let i = 0; i < cartItemsRows.length; i++) {
        const cartRow = cartItemsRows[i];
        const rowPriceElement = cartRow.getElementsByClassName('cart-price')[0]
        const rowQuantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]

        const price = parseFloat(rowPriceElement.innerHTML.replace('$', ''))
        // <input>  has value property and no innerHtml
        const quantity = rowQuantityElement.value
        totalCartPrice += price * quantity
        // console.log(price)
        // console.log(quantity)
    }

    const cartTotalElement = document.getElementsByClassName('cart-total-price')[0]
    cartTotalElement.innerHTML = `${'$'}${Math.round(totalCartPrice * 100) / 100}` // rounds to 2 decimals
}