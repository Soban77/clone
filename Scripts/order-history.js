import { convertToString } from "./index.js";

function loadOrderHistory() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const container = document.querySelector('.js-order-history');

  console.log(orders);

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders found.</p>";
    return;
  }

  let html = '';
  orders.forEach((order) => {
    html += `
      <div class="order-card">
        <h2>Order ID: ${order.id}</h2>
        <p>Date: ${order.date}</p>
        <p>Total: Rs. ${order.total ? convertToString(order.total): 0}</p>
        <p>Items:</p>
        <ul>
          ${Array.isArray(order.items) 
            ? order.items.map(i => `<li>${i.name} (Qty: ${i.quantity})</li>`).join('')
            : '<li>No items found</li>'}
        </ul>
      </div>
    `;
  });

  container.innerHTML = html;
}

loadOrderHistory();