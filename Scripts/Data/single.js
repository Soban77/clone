import { products } from "./product.js";
import { convertToString } from "../index.js";
import {cart,generateHTML} from "../cart.js";

function generatePHTML() {
  let html = '';

  let URLParam =  new window.URLSearchParams(window.location.search);
  let productId = Number(URLParam.get('productId'));

  products.forEach((product) => {

    if(product.id === productId)
    {
      console.log()
      html = `
        <img class="box-1-image" src=${product.image}>
        <div class="box-1-information">

          <h1>${product.name}</h1>

          <div class="information-1">
            <img src="Images/Rating/rating-45.png">
            <p>Ratings 513</p>
            <div class="line"></div>
            <p>6 Answered Questions</p>
          </div>

          <div class="information-1">
            <p><span>Brand: </span>No Brand</p>
            <div class="line"></div>
            <p>More Fragnances from No Brand</p>
          </div>

          <div class="information-2">
            <h1>Rs.${convertToString(product.price)}</h1>
            <div class="products-discount">
              <del>Rs.${convertToString(product.discount.price)}</del>
              <p>-${product.discount.rate}%</p>
            </div>
          </div>
        </div>
      `;
    }

  });

  document.querySelector('.js-single-product-box-1').innerHTML = html;
}

function getNumberQuantity() {
  return document.querySelector('.js-number').innerHTML;
}

function QuantityInteraction() {

  let num1;

  document.querySelector('.js-plus').addEventListener('click',() => {

    num1 = Number(getNumberQuantity());
    num1++;

    document.querySelector('.js-number').innerHTML = num1;

  });
    
  document.querySelector('.js-minus').addEventListener('click',() => {

    num1 = Number(getNumberQuantity());

    if(num1>0)
    {
      num1--;
    }

    document.querySelector('.js-number').innerHTML = num1;

  });
}

function buttonClick() {

}

document.querySelector('.js-b2').addEventListener('click',() => {

  if(Number(getNumberQuantity()) !== 0)
  {
    const num = Number(getNumberQuantity());
    let inCart = false;

    let URLParam =  new window.URLSearchParams(window.location.search);
    let productId = Number(URLParam.get('productId'));

    cart.forEach((cartt) => {

      if(cartt.productId==productId)
      {
        inCart = true;
        cartt.quantity += num;

        localStorage.setItem('cart',JSON.stringify(cart));
      }

    });
    
    if(inCart===false)
    {
      products.forEach((product) => {

        if(product.id===productId)
        {
          cart.push({
            id: crypto.randomUUID(),
            productId: product.id,
            name: product.name,
            price: product.price,
            discount: {
              price: product.discount.price,
              rate: product.discount.rate
            },
            image: product.image,
            quantity: num
          });

          localStorage.setItem('cart',JSON.stringify(cart));
        }

      });
    }

    document.querySelector('.js-added').style.display = "flex";

    setTimeout(() => {

      document.querySelector('.js-added').style.display = "none";

      window.location.href = 'cart.html';

    },1000)

    generateHTML();
  }
  else {
    const notAdd = document.querySelector('.js-not-added');
    notAdd.style.display = "flex";

    setTimeout(() => {

      notAdd.style.display = "none";

    },1000);
  }

});

document.querySelector('.js-b1').addEventListener('click',() => {

  if(Number(getNumberQuantity()) !== 0)
  {
    const num = Number(getNumberQuantity());

    let URLParam =  new window.URLSearchParams(window.location.search);
    let productId = Number(URLParam.get('productId'));

    setTimeout(() => {

      window.location.href = `checkout.html?productId=${productId}&quantity=${num}`;

    },1000)

  }
  else {
    const notAdd = document.querySelector('.js-not-added');
    notAdd.style.display = "flex";

    setTimeout(() => {

      notAdd.style.display = "none";

    },1000);
  }

});


generatePHTML();
QuantityInteraction();