import { convertToString } from "./index.js";

export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart)
{
  cart = [];
}

// export let cart = [{
//   id: 1,
//   productId: 9,
//   name: 'Head & Shoulders Classic Clean Shampoo 1000ml',
//   price: 1830,
//   discount: {
//     price: 2200,
//     rate: 17
//   },
//   image: 'Images/Products/Shampoo.png',
//   quantity: 1
// },
// {
//   id: 2,
//   productId: 9,
//   name: 'Head & Shoulders Classic Clean Shampoo 1000ml',
//   price: 1830,
//   discount: {
//     price: 2200,
//     rate: 17
//   },
//   image: 'Images/Products/Shampoo.png',
//   quantity: 1
// }];

export function generateHTML() {

  let html = '';

  cart  = JSON.parse(localStorage.getItem('cart'));

  if(!cart)
  {
    cart = [];
  }

  cart.forEach((carts) => {

    html += `<div class="cart-item-display-container">
              <div class="cart-item-display-1">
                <label>
                  <input class="js-checkbox" data-cart-id=${carts.id} type="checkbox">
                </label>
                <img src=${carts.image}>
                <div class="cart-item-display-1-info">
                  <div class="cart-item-display-1-info-1">
                    <p class="info-1-p1">9.9</p>
                    <p class="info-1-p2">${carts.name}</p>
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
                <p class="display-2-p1">Rs. ${convertToString(carts.price)}</p>
                <p class="display-2-p2"><del>Rs. ${convertToString(carts.discount.price)}</del></p>
                <i class="heart">&#9829;</i>
                <i class="fas fa-trash js-delete" data-cart-id="${carts.id}"></i>
              </div>

              <div class="cart-item-display-3">
                <button class="minus js-minus" data-cart-id="${carts.id}">-</button>
                <p class="number js-number-${carts.id}">${carts.quantity}</p>
                <button class="plus js-plus" data-cart-id="${carts.id}">+</button>
              </div>
            </div>`;

  });

  if(html === '') {
    html = `<section class="section1">
              <div class="message">There are no items in this cart</div>
              <a href="index.html"><button>CONTINUE SHOPPING</button></a>
            </section>
            `;

    if(document.querySelector('.js-main')) document.querySelector('.js-main').innerHTML = html;
  }
  else {
    if(document.querySelector('.js-cart-display'))
    {
      document.querySelector('.js-cart-display').innerHTML = html;
    }
  }

}

function getNumberQuantity() {
  return document.querySelector('.js-number').innerHTML;
}

function QuantityInteraction() {

  document.querySelectorAll('.js-plus').forEach((button) => {

    button.addEventListener('click', () => {

      const cartId = button.dataset.cartId;

      cart.forEach((carts) => {

        if(carts.id === cartId)
        {
          carts.quantity++;

          localStorage.setItem('cart',JSON.stringify(cart));

          document.querySelector(`.js-number-${cartId}`).innerHTML = carts.quantity;

          changeTotal();
        }

      });

      recalcOrderSummary();

    });
  });
    
  document.querySelectorAll('.js-minus').forEach((button) => {

    button.addEventListener('click', () => {

      const cartId = button.dataset.cartId;

      cart.forEach((carts) => {

        if(carts.id === cartId)
        {
          carts.quantity--;

          localStorage.setItem('cart',JSON.stringify(cart));

          document.querySelector(`.js-number-${cartId}`).innerHTML = carts.quantity;

          changeTotal();
        }

      });

      recalcOrderSummary();

    });
  });

  document.querySelectorAll('.js-delete').forEach((del) => {

    del.addEventListener('click',() => {

      const tag = document.querySelector('.js-Remove');

      tag.style.display = "flex";

      document.querySelector('.js-Remove-cancel').addEventListener('click', () => {

        tag.style.display = "none";

      });

      document.querySelector('.js-Remove-cross').addEventListener('click', () => {

        tag.style.display = "none";

      });

      document.querySelector('.js-Remove-remove').addEventListener('click', () => {

        const id = del.dataset.cartId;

        cart.forEach((carts) => {

          const index = cart.findIndex(obj => obj.id === id);

          if(index !== -1)
          {
            cart.splice(index,1);

            localStorage.setItem('cart',JSON.stringify(cart));

            generateHTML();

            tag.style.display = "none";
          }

        });

      });

    });

  });

  if(document.querySelector('.js-Delete-all')) {

    document.querySelector('.js-Delete-all').addEventListener('click', () => {

      const tag = document.querySelector('.js-Remove-1');

      tag.style.display = "flex";

      document.querySelector('.js-Remove-cancel-1').addEventListener('click', () => {

        tag.style.display = "none";

      });

      document.querySelector('.js-Remove-cross-1').addEventListener('click', () => {

        tag.style.display = "none";

      });

      document.querySelector('.js-Remove-remove-1').addEventListener('click', () => {

        cart = [];

        localStorage.setItem('cart',JSON.stringify(cart));

        generateHTML();

        tag.style.display = "none";

      });

    });
  }

  recalcOrderSummary();
}

let quantityA = 0;
let priceA = 0;
let totalA = 0;

function addInOrderSummary()
{
  document.querySelectorAll('.js-checkbox').forEach((check) => {

    check.addEventListener('click', () => {

      recalcOrderSummary();

      // const id  = check.dataset.cartId;

      // cart.forEach((carts) => {

      //   if(carts.id === id)
      //   {
      //     if(check.checked)
      //     {
      //       quantityA += carts.quantity;
      //       priceA += carts.price * carts.quantity;
            
      //       if(totalA === 0)
      //       {
      //         totalA += (carts.quantity*carts.price)+160;
      //       }
      //       else
      //       {
      //         totalA += (carts.quantity*carts.price);
      //       }
      //     }
      //     else 
      //     {
      //       if((totalA - ((carts.quantity*carts.price) + 160)) === 0)
      //       {
      //         totalA = 0;
      //       }
      //       else
      //       {
      //         totalA -= (carts.quantity*carts.price);
      //       }

      //       quantityA -= carts.quantity;
      //       priceA -= carts.price * carts.quantity;
      //     }
      //   }

      // });

      // document.querySelector('.js-cart-total-items').innerHTML = quantityA;
      // document.querySelector('.js-Subtotal').innerHTML = convertToString(priceA);
      // document.querySelector('.js-Total-Order').innerHTML = convertToString(totalA);
      // document.querySelector('.js-Checkout-Item').innerHTML = quantityA;

    });

  });

  const checkB = document.querySelector('.js-Main-Checkbox');


  if(checkB)
  {
    checkB.addEventListener('click',() => {

    //   let quantityB = 0;
    //   let priceB = 0;
    //   let totalB = 0;

      if(checkB.checked)
      {
        document.querySelectorAll('.js-checkbox').forEach((check) => {

          if(!check.checked)
          {
            check.checked = true;
          }

        });

    //     cart.forEach((carts) => {

    //       quantityB += carts.quantity;
    //       priceB += carts.quantity*carts.price;

    //     });

    //     totalB = priceB+160;

    //     document.querySelector('.js-cart-total-items').innerHTML = quantityB;
    //     document.querySelector('.js-Subtotal').innerHTML = convertToString(priceB);
    //     document.querySelector('.js-Total-Order').innerHTML = convertToString(totalB);
    //     document.querySelector('.js-Checkout-Item').innerHTML = quantityB;
      }
      else {
        document.querySelectorAll('.js-checkbox').forEach((check) => {

          if(check.checked)
          {
            check.checked = false;
          }

        });

    //     document.querySelector('.js-cart-total-items').innerHTML = 0;
    //     document.querySelector('.js-Subtotal').innerHTML = 0;
    //     document.querySelector('.js-Total-Order').innerHTML = 0;
    //     document.querySelector('.js-Checkout-Item').innerHTML = 0;
      }

      recalcOrderSummary();

    });
  }
}

function recalcOrderSummary() {
  let totalQty = 0;
  let subtotal = 0;
  let deliveryFee = 0;

  document.querySelectorAll('.js-checkbox').forEach((check) => {
    if (check.checked) {
      const id = check.dataset.cartId;
      const item = cart.find(c => c.id === id);
      if (item) {
        totalQty += item.quantity;
        subtotal += item.price * item.quantity;
      }
    }
  });

  if (totalQty > 0) {
    deliveryFee = 160; // apply once if any item selected
  }

  if(document.querySelector('.js-cart-total-items')) document.querySelector('.js-cart-total-items').innerHTML = totalQty;

  if(document.querySelector('.js-Subtotal')) document.querySelector('.js-Subtotal').innerHTML = convertToString(subtotal);

  if(document.querySelector('.js-Total-Order')) document.querySelector('.js-Total-Order').innerHTML = convertToString(subtotal + deliveryFee);

  if( document.querySelector('.js-Checkout-Item')) document.querySelector('.js-Checkout-Item').innerHTML = totalQty;
}


function changeTotal()
{
  // let TotalCount = 0;

  // cart.forEach((carts) => {

  //   TotalCount += carts.quantity;

  // });

  let TotalCount = getTotalItems();

  if(document.querySelector('.js-cart-total-item'))
  {
    document.querySelector('.js-cart-total-item').innerHTML = TotalCount;
  }  
}

function getTotalItems()
{
  let TotalCount = 0;

  cart.forEach((carts) => {

    TotalCount += carts.quantity;

  });

  return TotalCount;
}

function proceedToCheckout() {
  const checkoutBtn = document.querySelector('.order-summary-button');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      // Count selected items
      const selected = [];
      document.querySelectorAll('.js-checkbox').forEach((check) => {
        if (check.checked) {
          const id = check.dataset.cartId;
          const item = cart.find(c => c.id === id);
          if (item) selected.push(item);
        }
      });

      if (selected.length === 0) {
        alert("Please select at least one item to checkout.");
        return;
      }

      // For simplicity, redirect with first selected product
      // const productId = selected[0].productId;
      // const quantity = selected[0].quantity;

      // window.location.href = `checkout.html?productId=${productId}&quantity=${quantity}`;

      localStorage.setItem('checkoutItems', JSON.stringify(selected));
      window.location.href = "checkout.html";

    });
  }
}

proceedToCheckout();

generateHTML();

changeTotal();

addInOrderSummary();

QuantityInteraction();