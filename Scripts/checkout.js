import { products } from "./Data/product.js";
import { convertToString } from "./index.js";

let cart = JSON.parse(localStorage.getItem('checkoutItems')) || [];

// function generateCheckoutHTML()
// {
//   let URLParam =  new window.URLSearchParams(window.location.search);
//   let productId = Number(URLParam.get('productId'));
//   const quantity = Number(URLParam.get('quantity'));

//   document.querySelector('.js-order-summary-sub-p1').innerHTML = quantity;

//   let html = ``;

//   products.forEach((product) => {

//     if(product.id === productId)
//     {
//       html = `<div class="cart-item-display-1">
//                 <img src=${product.image}>
//                 <div class="cart-item-display-1-info">
//                   <div class="cart-item-display-1-info-1">
//                     <p class="info-1-p1">9.9</p>
//                     <p class="info-1-p2">${product.name}</p>
//                   </div>
//                   <p class="info-p1">Zero</p>
//                   <p class="info-p2">Ends at Sep 17 23:59:59</p>
//                   <div class="info-div">
//                     <p class="info-div-p1"><i class="fa fa-home"></i></p>
//                     <p class="info-div-p2">BEST PRICE</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div class="cart-item-display-2">
//                 <p class="display-2-p1">Rs. ${convertToString(product.price)}</p>
//                 <p class="display-2-p2"><del>Rs. ${convertToString(product.discount.price)}</del></p>
//                 <p>-${convertToString(product.discount.rate)}%</p>
//               </div>
              
//               <div class="cart-item-display-3">
//                 <p>Qty: ${quantity}</p>
//               </div>`;

//       const itemTotal = product.price*quantity;
//       const deliveryFee = 125;
//       const total = itemTotal + deliveryFee;

//       document.querySelector('.js-item-total').innerHTML = convertToString(itemTotal);
//       document.querySelector('.js-delivery-fee').innerHTML = convertToString(deliveryFee);
//       document.querySelector('.js-Total').innerHTML = convertToString(total);
//     }
    
//   });

//   document.querySelector('.js-section-part-2-Item').innerHTML = html; 
// }
function generateCheckoutHTML() {
  // Load cart from localStorage
  // let cart = JSON.parse(localStorage.getItem('cart')) || [];

  let html = '';
  let itemsTotal = 0;
  let totalQty = 0;
  let deliveryFee = 160; // apply once if any item selected

  cart.forEach((item) => {
    html += `
      <div class="cart-item-display-1">
        <img src="${item.image}">
        <div class="cart-item-display-1-info">
          <div class="cart-item-display-1-info-1">
            <p class="info-1-p1">9.9</p>
            <p class="info-1-p2">${item.name}</p>
          </div>
          <p class="info-p1">Zero</p>
          <p class="info-p2">Ends at Sep 17 23:59:59</p>
          <div class="info-div">
            <p class="info-div-p1"><i class="fa fa-home"></i></p>
            <p class="info-div-p2">BEST PRICE</p>
          </div>
        </div>
      </div>
      
      <div class="cart-item-display-2">
        <p class="display-2-p1">Rs. ${convertToString(item.price)}</p>
        <p class="display-2-p2"><del>Rs. ${convertToString(item.discount.price)}</del></p>
        <p>-${item.discount.rate}%</p>
      </div>
      
      <div class="cart-item-display-3">
        <p>Qty: ${item.quantity}</p>
      </div>
      <!-- <hr> -->
    `;

    totalQty += item.quantity;
    itemsTotal += item.price * item.quantity;
  });

  // Update totals
  document.querySelector('.js-order-summary-sub-p1').innerHTML = totalQty;
  document.querySelector('.js-item-total').innerHTML = convertToString(itemsTotal);
  document.querySelector('.js-delivery-fee').innerHTML = convertToString(deliveryFee);
  document.querySelector('.js-Total').innerHTML = convertToString(itemsTotal + deliveryFee);

  // Inject HTML
  document.querySelector('.js-section-part-2-Item').innerHTML = html;
}

function validateForm() {
  const inputs = document.querySelectorAll('.delivery-information-section input');
  for (let input of inputs) {
    if (input.value.trim() === "") {
      alert("Please fill out all delivery information fields.");
      return false;
    }
  }

  const phone = inputs[2].value.trim(); // phone number field
  if (!/^\d{10,15}$/.test(phone)) {
    alert("Please enter a valid phone number.");
    return false;
  }

  return true;
}

function proceedToPay() {
  const payBtn = document.querySelector('.order-summary-button');
  if (payBtn) {
    payBtn.addEventListener('click', () => {
      if (validateForm()) {
        // Redirect to shipping page
        const inputs = document.querySelectorAll('.delivery-information-section input');

        let address = [];
        let count = 0;

        inputs.forEach((input) => {
          count++;

          address.push({
            id: count,                // optional index
            name: input.previousElementSibling?.innerText || `Field ${count}`, // label text
            value: input.value.trim() // actual user input
          });
        });


        localStorage.setItem('address',JSON.stringify(address));

        window.location.href = "shipping.html";
      }
    });
  }
}

proceedToPay();

generateCheckoutHTML();
