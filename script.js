






const menu = document.querySelector('#menu');
const cartBtn = document.querySelector('#cart-btn');
const cartModal =document.querySelector('#cart-modal')
const cartItemsContainer = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const checkoutBtn = document.querySelector('#checkout-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const cartCount = document.querySelector('#cart-count');
const mesaInput = document.querySelector('#mesa');
const codCart = document.querySelector('#cod-cart');
const addresWarn = document.querySelector('#dados-errado');


cartBtn.addEventListener('click',()=>{
 cartModal.style.display = ' flex';
})
closeModalBtn.addEventListener('click',()=>{
  cartModal.style.display = 'none';
})


