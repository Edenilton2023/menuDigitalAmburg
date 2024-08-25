






const menu = document.querySelector('#menu');
const cartBtn = document.querySelector('#cart-btn');
const cartModal =document.querySelector('#cart-modal')
const cartItemsContainer = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const checkoutBtn = document.querySelector('#checkout-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const cartCount = document.querySelector('#cart-count');
const mesa = document.querySelector('#mesa');
const codCart = document.querySelector('#cod-cart');
const observacao = document.querySelector('#obs');
const addresWarn = document.querySelector('#dados-errado');


let cart = []
// abrir modal do carrinha
cartBtn.addEventListener('click',()=>{
updateCartModal();
 cartModal.style.display = ' flex';
 
})
// fechar o modal quando clicar fora
  cartModal.addEventListener('click', (event) => {
    if (event.target === cartModal) cartModal.style.display = 'none';
  });
/// quando clicar no botao fechar
  closeModalBtn.addEventListener('click',()=>{
    cartModal.style.display = 'none';
  })
 
  //pegar o botao do carrinho
  // obs.. a clasest(filho) me retoena o pai
  menu.addEventListener('click',(event)=>{
        let parentButton = event.target.closest('.add-to-cart-btn');
        if(parentButton){const name = parentButton.getAttribute('data-name')
       const price = parseFloat(parentButton.getAttribute('data-price'))
       const cod = parentButton.getAttribute('data-cod');
       //console.log(name,price,cod);
       addTocart(name, price, cod);
       }
       
       

    
   
  })

// funçao para adicionar no carrinho
function addTocart(name,price,cod){

   //verificar se o item ja esta no carrinho
   const exixteNocarrinho = cart.find(item => item.name === name )
   if(exixteNocarrinho){
    exixteNocarrinho.quantity  += 1;
// se o item ja existe na carrinho almenta apenas + 1

   }else{  cart.push({
name,
cod,
price,
quantity: 1,
   })
}
updateCartModal();
 
}
// atualiza carrinho
function updateCartModal(){
    
    cartItemsContainer.innerHTML=''
    let total = 0;
    cart.forEach(item =>{
        const cartItemElemet = document.createElement('div')
        cartItemElemet.classList.add('bg-gray-100','flex', 'justify-between', 'mb-4','flex-col');
        cartItemElemet.innerHTML = `

        <div class="flex items-center justify-between px-1">

        <div>
        <P class= 'font-bold'>${item.name}</P>
        <P>Qtd : (${item.quantity}) </P>
        <P>Cod : (${item.cod})</P>
        <P class= 'font-medium mt-2' >R$${item.price.toFixed(2)}</P>
        </div>
        <button class = 'remove-from-cart-btn  px-2  py-1' data-name="${item.name}">
     Delete
         <i class="fa-solid fa-trash text-lg text-black"></i>
        </button>
       </div>
        `;
        total += item.price * item.quantity;
        // cooquei a estrurura aciam criada via js dentro do modal
        cartItemsContainer.appendChild(cartItemElemet)
    })
    cartTotal.innerHTML= total.toLocaleString("pt-BR",{style:"currency",currency:"BRL"

    })
    cartCount.innerHTML=cart.length
}
 //funçao para remover o item d carrinho
 cartItemsContainer.addEventListener('click',(event) =>{
    if(event.target.classList.contains('remove-from-cart-btn')){
        const name = event.target.getAttribute('data-name');
        removeItemCart(name);
    }
    
 })

 function removeItemCart(name){
   //encontra o index que seja igual a o item.nome do cart
   const index = cart.findIndex((item) => item.name === name);
   if (index !== -1) {
     const item = cart[index];
     if (item.quantity > 1) {
       item.quantity -= 1;
       //comara funcao updateCartModal() para refazer a a lista
       updateCartModal();
       return
     }
     // caso so tenha 1 para remover 
     cart.splice(index,1)
            updateCartModal();
   }
 }
 mesa.addEventListener('input',(event)=>{
    let imputValue = event.target.value

    
 })
  codCart.addEventListener('input', (event) => {
    let imputValue = event.target.value;
   if(imputValue.length !== ""){
    codCart.classList.remove("border-red-500")
     addresWarn.classList.add('hidden');

   }
    
  
 
  });
   obs.addEventListener('input', (event) => {
     let imputValue = event.target.value;
    
   });

checkoutBtn.addEventListener('click',()=>{
    if(cart.length ===  0 ) return
    if(codCart.value ===  "" ){
      addresWarn.classList.remove('hidden');
    codCart.classList.add('border-red-500');
 
    
    return
    }
// envia pedido para o apido whatss
// const cartItems = cart.map((item)=>{
//     return(`${item.name}(quantidade: ${item.quantity})$Preço: R$ ${item.price}observaçao: ${item.observacao}`)
// })
// console.log(cartItems);
// // dar um F12 pra lembra

// })

// verificar  a hora e manipular a card horario
 function checkRestantOpem(){
    const data = new Date()
    const hora = data.getHours()
    return hora >= 11 &&  hora <22
    
    
 }
 const spanItem = document.getElementById("data-span")
 const IsOpem = checkRestantOpem()
 if (IsOpem){
    spanItem.classList.remove('bg-red-500')
    spanItem.classList.add('bg-green-600');
 }else{
     spanItem.classList.add('bg-red-500');
     spanItem.classList.remove('bg-green-600');
 }