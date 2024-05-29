

document.addEventListener('DOMContentLoaded', function () {
    const carrinho = [];
    
  
    function updateCartTotal() {
      const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
      document.querySelector('.cart-total-container span').textContent = `R$${total.toFixed(2)}`;
    }
  
    function addToCart(nome, preco) {
      const existingItemIndex = carrinho.findIndex(item => item.nome === nome);
  
      if (existingItemIndex !== -1) {
        carrinho[existingItemIndex].quantidade++;
      } else {
        carrinho.push({
          nome: nome,
          preco: preco,
          quantidade: 1,
        });
      }
  
      updateCartTotal();
      updateCartTable();
      saveCartToLocalStorage();
    }
  
    function updateCartTable() {
      const tbody = document.querySelector('.carrinho tbody');
      tbody.innerHTML = '';
  
      carrinho.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.nome}</td>
          <td>R$${item.preco.toFixed(2)}</td>
          <td><input type="number" class="quantidade-input" value="${item.quantidade}" data-index="${carrinho.indexOf(item)}"></td>
          <td><button class="remove-button" data-index="${carrinho.indexOf(item)}">Remover</button></td>
        `;
        tbody.appendChild(tr);
  document.querySelector('.carrinho').addEventListener('change', function (event) {
    if (event.target.classList.contains('quantidade-input')) {
      const indexToUpdate = parseInt(event.target.getAttribute('data-index'));
      const newQuantity = parseInt(event.target.value);
      
      if (newQuantity > 0) {
        carrinho[indexToUpdate].quantidade = newQuantity;
      } else {
        carrinho[indexToUpdate].quantidade = 1;
        event.target.value = 1;
      }
  
      updateCartTable();
      updateCartTotal();
      saveCartToLocalStorage();
    }
  });
  
      });
    }
  
    function saveCartToLocalStorage() {
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
  
    function loadCartFromLocalStorage() {
      const storedCart = localStorage.getItem('carrinho');
      if (storedCart) {
        carrinho.push(...JSON.parse(storedCart));
        updateCartTable();
        updateCartTotal();
      }
    }
  
    // Adicionar ao carrinho ao clicar no botão
    document.querySelectorAll('.button-hover-background').forEach((button, index) => {
      button.addEventListener('click', function () {
        const produtoNome = document.querySelectorAll('.nome_produto')[index].textContent;
        const produtoPreco = parseFloat(document.querySelectorAll('.preco')[index].textContent.replace('R$', ''));
  
        addToCart(produtoNome, produtoPreco);
        Swal.fire({
  
          icon: 'success',
          title: 'Produto adicionado ao carrinho!',
          showConfirmButton: false,
          timer: 1500
        });
      });
    });
  
    
    
  
  
  
    document.querySelector('.carrinho').addEventListener('click', function (event) {
      if (event.target.classList.contains('remove-button')) {
        const indexToRemove = parseInt(event.target.getAttribute('data-index'));
        carrinho.splice(indexToRemove, 1);
        updateCartTable();
        updateCartTotal();
        saveCartToLocalStorage();
      }
    });
  
  
  
    // Carregar carrinho salvo no localStorage ao carregar a página
    loadCartFromLocalStorage();
  
  
    // Botão "Finalizar Compra"
    document.querySelector('.purchase-button').addEventListener('click', function () {
      if (carrinho.length > 0) {
        Swal.fire({
          title: 'Deseja finalizar a compra?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Finalizar`,
          confirmButtonColor: "#32CD32",
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#d33",
          denyButtonText: `Limpar Carrinho`,
          denyButtonColor: "#696969"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Compra finalizada com sucesso!', '', 'success');
            carrinho.length = 0; // Limpar carrinho
            updateCartTable();
            updateCartTotal();
            saveCartToLocalStorage();
          } else if (result.isDenied) {
            carrinho.length = 0; // Limpar carrinho
            updateCartTable();
            updateCartTotal();
            saveCartToLocalStorage();
            Swal.fire('Carrinho limpo!', '', 'info');
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Carrinho vazio!',
          text: 'Adicione produtos ao carrinho.',
        });
      }
    });
  });
  
  
  document.querySelector('.carrinho').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-button')) {
      const indexToRemove = parseInt(event.target.getAttribute('data-index'));
      carrinho.splice(indexToRemove, 1);
      updateCartTable();
      updateCartTotal();
      saveCartToLocalStorage();
  
      
    }
  });
  
  
  