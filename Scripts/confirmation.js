function generateOrderId() {
  // Simple random ID for demo purposes
  return 'ORD-' + Math.floor(Math.random() * 1000000);
}

document.querySelector('.js-order-id').innerText = generateOrderId(); 