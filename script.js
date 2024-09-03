const header = document.querySelector('header');

const menu = document.querySelector('#menu');
const cartBtn = document.querySelector('#cart-btn');
const cartModal = document.querySelector('#cart-modal');
const cartItemsContainer = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const checkoutBtn = document.querySelector('#checkout-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const cartCount = document.querySelector('#cart-count');
const mesa = document.querySelector('#mesa');
const codCart = document.querySelector('#cod-cart');
const observacao = document.querySelector('#obs');
const addresWarn = document.querySelector('#dados-errado');

let cart = [];
// abrir modal do carrinha
cartBtn.addEventListener('click', () => {
  updateCartModal();
  cartModal.style.display = ' flex';
});
// fechar o modal quando clicar fora
cartModal.addEventListener('click', (event) => {
  if (event.target === cartModal) cartModal.style.display = 'none';
});
/// quando clicar no botao fechar
closeModalBtn.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

//pegar o botao do carrinho
// obs.. a clasest(filho) me retoena o pai
menu.addEventListener('click', (event) => {
  let parentButton = event.target.closest('.add-to-cart-btn');

  if (parentButton) {
    const name = parentButton.getAttribute('data-name');
    
    let price = parseFloat(parentButton.getAttribute('data-price'));
    

    const cod = parentButton.getAttribute('data-cod');
    //console.log(name,price,cod);
    addTocart(name, price, cod);
  }
});

// funçao para adicionar no carrinho
function addTocart(name, price, cod) {
  //verificar se o item ja esta no carrinho
  const exixteNocarrinho = cart.find((item) => item.name === name);
  if (exixteNocarrinho) {
    exixteNocarrinho.quantity += 1;
    // se o item ja existe na carrinho almenta apenas + 1
  } else {
    cart.push({
      name,
      cod,
      price,
      quantity: 1,
    });
  }
  updateCartModal();
}
// atualiza carrinho
function updateCartModal() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach((item) => {
    const cartItemElemet = document.createElement('div');
    cartItemElemet.classList.add(
      'bg-gray-100',
      'flex',
      'justify-between',
      'mb-4',
      'flex-col'
    );
    cartItemElemet.innerHTML = `

        <div class="flex items-center justify-between px-1">

        <div>
        <P class= 'font-bold'> ${item.name}</P>
        <P>Qtd:  (${item.quantity}) </P>
        <P> Codi:(${item.cod})</P>
       
        <P class= 'font-medium mt-2' >R$ : ${item.price.toFixed(2)}</P>
        </div>
        <button class = ' mr-2 remove-from-cart-btn  px-6  py-4  flex items-center rounded-s-full' data-name="${
          item.name
        }">Excruir
 
         
        </button>
       </div>
        `;
    total += item.price * item.quantity;
    // cooquei a estrurura aciam criada via js dentro do modal
    cartItemsContainer.appendChild(cartItemElemet);
  });
  cartTotal.innerHTML = total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  cartCount.innerHTML = cart.length;
  console.log(cart.length);
}
//funçao para remover o item d carrinho
cartItemsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-from-cart-btn')) {
    const name = event.target.getAttribute('data-name');
    removeItemCart(name);
  }
});

function removeItemCart(name) {
  //encontra o index que seja igual a o item.nome do cart
  const index = cart.findIndex((item) => item.name === name);
  if (index !== -1) {
    const item = cart[index];
    if (item.quantity > 1) {
      item.quantity -= 1;
      //comara funcao updateCartModal() para refazer a a lista
      updateCartModal();
      return;
    }
    // caso so tenha 1 para remover
    cart.splice(index, 1);
    updateCartModal();
  }
}
mesa.addEventListener('input', (event) => {
  let imputValue = event.target.value;
});
codCart.addEventListener('input', (event) => {
  let imputValue = event.target.value;
  if (imputValue.length !== '') {
    codCart.classList.remove('border-red-500');
    addresWarn.classList.add('hidden');
  }
});
obs.addEventListener('input', (event) => {
  let imputValue = event.target.value;
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  if (codCart.value === '') {
    addresWarn.classList.remove('hidden');
    codCart.classList.add('border-red-500');

    return;
  }

  //ZAP ENVIAR
  const cartItems = cart
    .map((item) => {
      return `${item.name}, Quant:${item.quantity},  Cod:${item.cod}          
`;
    })
    .join('');
  const message = encodeURIComponent(cartItems);


  const phone = '7199996810';
  window.open(
    `https://wa.me/${phone}?text=${message} Comada:${codCart.value}   Mesa:${mesa.value} 
     Observação: ${observacao.value}, `,
    '_black'
  );
  cart = [];
  updateCartModal();
});

//CARROCEL

//1. Selecionando o carrossel e os slides
const carousel = document.querySelector('#carousel .flex');

const slides = document.querySelectorAll('#carousel .min-w-full');

//2. Mantendo o controle de onde estamos
let currentIndex = 0;
/* 
  currentIndex: Uma variável que rastreia o slide atual sendo exibido. Começa em 0, que corresponde ao primeiro slide. */

//3. Avançando para o próximo slide
document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
 
  updateCarousel();
  scrollToSection(currentIndex);
});
/* 
   Evento de clique: Um ouvinte de evento é adicionado ao botão de próximo (next). Quando clicado, o currentIndex é incrementado, e se ele ultrapassar o último slide, volta para o primeiro.
   updateCarousel(): Chama a função que move o  carrossel para o próximo slide.
   scrollToSection(currentIndex): Faz o scroll suave para a seção correspondente ao slide atual. */

//4. Voltando para o slide anterior
document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
  scrollToSection(currentIndex);
});
/*
    Evento de clique : Um ovinte de envento è adicionado ao botão de proximo (prev). quando clicado , o 'currentIndex'  é incrementado , e se ele ultrapassa o última slide , volta para o íltimoslide  

  `   updateCarousel()` Chama a funçao que move o carrocel para O proximo slide 
  `  scrollToection(currentIndex)`: faz o scroll suave para a seção correspondente ao slide atual 
     */

//5. Atualizando o carrossel (movendo a fita)
function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}
/*
   updateCarousel(): Esta função move o carrossel para o slide correspondente ao currentIndex. Cada slide parece ocupar 100% da largura, então o carrossel é movido em incrementos de 100%.
   
    */

// Rola suavemente até a seção correspondente

function scrollToSection(index) {
  const secoes = document.querySelectorAll('.hscreen');
  const secaoAlvo = secoes[index];
  secaoAlvo.scrollIntoView({ behavior: 'smooth' });
}
/* 
` scrollToSection()`: esta funçao roal suavemente a pagina até a seçao correspomdente ao indice atual. ele encontra a seção desejada com base na lista de todas as seções (`.hscreen`)*/

//DEBUGANDO
/*
Debugando:
Agora que temos uma visão geral, se algo não estiver funcionando como esperado, aqui estão alguns passos para debugar:

Verifique os Seletores: Certifique-se de que #carousel .flex, #carousel .min-w-full, #next, #prev, e .hscreen correspondem exatamente ao que está no HTML.

Console Logs: Use console.log() em pontos críticos, como antes e depois de atualizar currentIndex ou dentro de updateCarousel para ver os valores intermediários.

CSS: Verifique se as classes como flex, min-w-full, e .hscreen estão aplicadas corretamente e que não há estilos conflitantes. */

// MOVENDO O CARROCEL COM SCROLL

// Adiciona um evento de scroll na janela
window.addEventListener('scroll', () => {
  // Seleciona todas as seções que têm a classe .hscreen
  const secoes = document.querySelectorAll('.hscreen');

  // Itera sobre cada seção
  secoes.forEach((item, index) => {
    // Pega a distância da seção até o topo da janela de visualização
    const altura = item.getBoundingClientRect().top;
    const alturarebaixada = altura - 240;

    // Verifica se a seção atingiu o topo da janela de visualização
    if (alturarebaixada <= 0 && alturarebaixada > -item.offsetHeight / 2) {
      // Atualiza o carrossel para o próximo slide
      currentIndex = index % slides.length;
      updateCarousel();
    }
  });
});

function updateCarousel() {
  const carousel = document.querySelector('#carousel .flex');
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}
