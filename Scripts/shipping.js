import { convertToString } from "./index.js";

function loadShippingPage() {
  // Get totals from checkout (you can pass via query string or localStorage)
  const selected = JSON.parse(localStorage.getItem('checkoutItems'));

  let itemsTotal = 0;

  selected.forEach((s) => {
    itemsTotal += s.price*s.quantity;
  });

  const deliveryFee = 160; // default standard
  const total = Number(itemsTotal) + deliveryFee;

  document.querySelector('.js-items-total').innerHTML = convertToString(itemsTotal);
  document.querySelector('.js-delivery-fee').innerHTML = convertToString(deliveryFee);
  document.querySelector('.js-total').innerHTML = convertToString(total);

  // Show address from checkout form (store in localStorage at checkout step)
  const address = JSON.parse(localStorage.getItem("address")) || "No address provided";

  let str = '';

  address.forEach((a) => {
    str += `<p>${a.value}</p>`;
  });

  document.querySelector('.js-shipping-address').innerHTML = str;

  // Handle delivery option change
  document.querySelectorAll('input[name="delivery"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      let fee = radio.value === "express" ? 300 : 160;
      document.querySelector('.js-delivery-fee').innerHTML = convertToString(fee);
      document.querySelector('.js-total').innerHTML = convertToString(Number(itemsTotal) + fee);
    });
  });

  // Place order button
  document.querySelector('.place-order-btn').addEventListener('click', () => {
    alert("Order placed successfully!");

    const selectedi = JSON.parse(localStorage.getItem('checkoutItems')) || [];
    const itemsTotal = selectedi.reduce((sum, s) => sum + parseInt(s.price * s.quantity), 0);
    const deliveryFee = 160;
    const total = itemsTotal + deliveryFee;

    const newOrder = {
      id: 'ORD-' + Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleString(),
      items: selectedi,
      total: itemsTotal + deliveryFee
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));


    localStorage.setItem('address',JSON.stringify([]));

    // Remove selected items from cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selected = JSON.parse(localStorage.getItem('checkoutItems')) || [];

    // Filter out selected items
    const updatedCart = cart.filter(cartItem => {
      return !selected.some(sel => sel.id === cartItem.id);
    });

    // Save updated cart back
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Optionally clear checkoutItems too
    localStorage.setItem('checkoutItems', JSON.stringify([]));

    window.location.href = "confirmation.html";
  });
}

loadShippingPage();