
async function getData() {

  try {
    let res = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i')
    if (!res.ok) {
      alert('Error😭😭😭')
    }
    const { meals } = await res.json()

    console.log(meals);
    
    meals.forEach(({ strMeal, strMealThumb, idMeal }) => {
      display.innerHTML += `
              
                    <div class="card m-4 menuBlock" style="width: 18rem;">
                       <img src="${strMealThumb}" class="card-img-top" alt="...">
                       <div class="card-body">
                          <h5 class="card-title" style='height: 70px;'>${strMeal}</h5>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <button class="btn btn-dark"  onclick='addCart("${strMealThumb}", "${strMeal}")'>Add to Cart</button>
                      </div>
                   </div>
                
                `
    });
  } catch (error) {
    console.log(error);
  } finally {
    spinner.hidden = true
  }
}

getData()


function openCart() {
  cart.hidden = false;
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('cart').style.display = 'block';


  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  
  const cartHeight = cart.clientHeight;

  
  const closeButton = document.getElementById('closeBtn');
  closeButton.style.top = `${cartHeight + 10}px`;


}

function closeCart() {
  cart.hidden = true;
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('cart').style.display = 'none';
}


let arry = []

function showCart() {
  let closeButton = `<button id="closeBtn" onclick="closeCart()">Close</button>`;

  if (arry.length === 0) {
    cart.innerHTML = closeButton + `<p class='fs-1 text-center mt-5 px-3'>No items in the cart</p>`;
  } else {
    cart.innerHTML = closeButton +  `<p class='fs-4 text-center mt-2 ms-2'>Your cart</p>`
    arry.forEach(({ pics, name, quantity }, index) => { 
      cart.innerHTML += `
      <table>
      <hr>
        <tr>
          <td><p>${index + 1}</p></td>
          <td><img id='cartImg' src="${pics}" class="image-fluid" style='width: 70px; height: 70px;' alt="..."></td> 
          <td id='cartName' style='width: 200px;'><p class='fs-6'>${name}</p></td>
          <td><input id='nums${index}' class='ms-md-5' value="${quantity}" readonly></input></td> 
        </tr>

        <tr>
          <td> </td>
          <td><button class='btn btn-danger mt-2 p-1' onclick="removeCart(${index})" >Remove</button></td>
          <td> </td>
          <td>
            <button class='btn btn-warning ms-md-3' onclick="increaseQuantity(${index})">+</button> 
            <button  id='minusBtn' class='btn btn-warning ms-md-3' onclick="decreaseQuantity(${index})">-</button> 
          </td>
        </tr>
      
      </table>
      `;
    });
  }
}

showCart()





function addCart(strMealThumb, strMeal) {
  let existingItem = arry.find(item => item.name === strMeal);

  if (existingItem) {
    existingItem.quantity++;

  } else {
    
    let obj = {
      pics: strMealThumb,
      name: strMeal,
      quantity: 1 
    };
    arry.push(obj);
    cartNo.innerHTML = parseInt(cartNo.innerHTML || 0) + 1
  }

  cartMsg.innerHTML = 'Your item has been successfully added to cart';

  setTimeout(() => {
    cartMsg.innerHTML = '';
  }, 2000);

  showCart();
  saveMenu();
}


function removeCart(index) {
  arry.splice(index, 1);

  cartNo.innerHTML = parseInt(cartNo.innerHTML || 0) - 1;
  showCart();

  const cartHeight = cart.clientHeight;
  const closeButton = document.getElementById('closeBtn');
  closeButton.style.top = `${cartHeight + 10}px`; 
  saveMenu();
 
}

function increaseQuantity(index) {
  arry[index].quantity = (arry[index].quantity || 0) + 1;
  showCart();

  const cartHeight = cart.clientHeight;

  const closeButton = document.getElementById('closeBtn');
  closeButton.style.top = `${cartHeight + 10}px`; 
  saveMenu()
}



function decreaseQuantity(index) {
  if (arry[index].quantity > 1) {
    arry[index].quantity -= 1;
  }

  showCart();

  const cartHeight = cart.clientHeight;
  const closeButton = document.getElementById('closeBtn');
  closeButton.style.top = `${cartHeight + 10}px`;
  saveMenu();
}


function saveMenu() {
  localStorage.setItem('menu', JSON.stringify(arry));

}


function retriveMenu() {
  const savedmenus = JSON.parse(localStorage.getItem('menu'));

  if (savedmenus) {
      arry = savedmenus
      cartNo.innerHTML = arry.length
      showCart();
  }
}

retriveMenu();

