import { products } from "./Data/product.js"; 

function generateHTML()
{
  let html = '';

  products.forEach((product) => {

    html += `
      <div class="product-information">
        <a  class="faltu" href="product.html?productId=${product.id}">
          <img src="${product.image}">
          <p>${product.name}</p>
          <h1>Rs.${convertToString(product.price)}</h1>
          <div class="products-discount">
            <del>Rs.${convertToString(product.discount.price)}</del>
            <p>-${product.discount.rate}%</p>
          </div>
        </a>
      </div>
    `;

  });

  if(document.querySelector('.js-products'))
  {
    document.querySelector('.js-products').innerHTML = html;
  }
}

export function convertToString(num) {

  let str = num.toString();

  let newStr = '';
  let count = 1;

  for(let i=str.length-1;i>-1;i--)
  {
    if(count%4 === 0)
    {
      newStr += ',';
    }

    count++;
    
    newStr += str[i];
  }

  const ReverseStr = newStr.split('').reverse().join('');
  
  return ReverseStr;
}

function generateHTMLVal(val)
{
  let html = '';

  products.forEach((product) => {

    if(product.name.includes(val))
    {
        html += `
        <div class="product-information">
          <img src="${product.image}">
          <p>${product.name}</p>
          <h1>Rs.${convertToString(product.price)}</h1>
          <div class="products-discount">
            <del>Rs.${convertToString(product.discount.price)}</del>
            <p>-${product.discount.rate}%</p>
          </div>
        </div>
      `;
    }

  });

  document.querySelector('.js-products').innerHTML = html;
}

if(document.querySelector('.js-search'))
{
  document.querySelector('.js-search').addEventListener('click',() => {

    const val = document.querySelector('.js-input').value;

    generateHTMLVal(val);

  });
}

generateHTML();