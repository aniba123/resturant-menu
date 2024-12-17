
// Menu data
const menu = [
    { id: 1, title: "Buttermilk Pancakes", category: "breakfast", price: 15.99, img: "./images/item-1.jpeg", desc: "Delicious pancakes with syrup.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dicta fuga repellat iste placeat soluta" },
    { id: 2, title: "Diner Double", category: "lunch", price: 13.99, img: "./images/item-2.jpeg", desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dicta fuga repellat iste placeat soluta" },
    { id: 3, title: "Godzilla Milkshake", category: "shakes", price: 6.99, img: "./images/item-3.jpeg", desc: "A giant, creamy milkshake.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dicta fuga repellat iste placeat soluta" },
    { id: 4, title: "Country Delight", category: "breakfast", price: 20.99, img: "./images/item-4.jpeg", desc: "Wholesome country breakfast.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dicta fuga repellat iste placeat soluta" },
    { id: 5, title: "Egg Attack", category: "lunch", price: 22.99, img: "./images/item-5.jpeg", desc: "Loaded egg sandwich.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dicta fuga repellat iste placeat soluta" },
    { id: 6, title: "Oreo Dream", category: "shakes", price: 18.99, img: "./images/item-6.jpeg", desc: "Oreo-filled milkshake.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dicta fuga repellat iste placeat soluta" },
    { id: 7, title: "Bacon Overflow", category: "breakfast", price: 8.99, img: "./images/item-7.jpeg", desc: "Bacon lover's delight.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dicta fuga repellat iste placeat soluta" },
    { id: 8, title: "American Classic", category: "lunch", price: 12.99, img: "./images/item-8.jpeg", desc: "Classic American meal.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dicta fuga repellat iste placeat soluta" },
    { id: 9, title: "Quarantine Buddy", category: "shakes", price: 16.99, img: "./images/item-9.jpeg", desc: "Comfort drink for tough times.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dicta fuga repellat iste placeat soluta" },
    { id: 10, title: "Bison Steak", category: "dinner", price: 22.99, img: "./images/item-10.jpeg", desc: "Juicy bison steak.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dicta fuga repellat iste placeat soluta" },
  ];
  
  // Get DOM elements
  const sectionCenter = document.querySelector(".section-center");
  const btnContainer = document.querySelector(".btn-container");
  let cartItems=document.getElementById('cart-items');
  
  // Load content when the page loads
  window.addEventListener("DOMContentLoaded", function () {
    // Show all items initially
    displayMenuItems(menu);
    // Create category buttons
    createCategoryButtons();
  });
  
  // Function to display menu items
  function displayMenuItems(menuItems) { 
    const itemsHTML = menuItems.map(function (item) {
      return `
        <article class="menu-item">
          <img src="${item.img}" alt="${item.title}" class="photo" />
          <div class="item-info">
            <header>
              <h4>${item.title}</h4>
              <h4 class="price">$${item.price}</h4>
            </header>
            <p class="item-text">${item.desc}</p>
            <button class='addToCart' data-id='${item.id}'>Add to Cart</button>
          </div>
        </article>
      `;
    }).join(""); // Convert array to string
    sectionCenter.innerHTML = itemsHTML; // Add items to the page

    // even listners to all button
     let CartButtons= sectionCenter.querySelectorAll('.addToCart');
     CartButtons.forEach((items)=>{
          items.addEventListener('click',(aniba)=>
          {
           let id=   parseInt(aniba.currentTarget.dataset.id);
           let product=menu.find((item)=>item.id===id)
           addToCart(product)
          
          })
     })
  }
let cartArray=[];
let EmptyCart=document.getElementById('empty-cart')
// add to cart function
          function addToCart(product){
          cartArray.push(product);
          EmptyCart.style.display='none';
          let cartDiv=document.createElement('div');
          cartDiv.classList.add('cart-items');
          cartDiv.innerHTML=`<p>${product.title} - $${product.price}</p>
          <button class='remove'>Remove this Item!</button>
          `;
          cartItems.appendChild(cartDiv)
          displayTotal(product.price);

       let removeButton=   cartItems.querySelector('.remove');
       removeButton.addEventListener('click',function(){
        RemoveItem(product,cartDiv)
       })
          }

  // display total
let totalPrice=document.getElementById('total')

  function displayTotal(price){
   let currentPrice= parseFloat(totalPrice.textContent.replace('$',''));
   currentPrice=currentPrice+price;
    totalPrice.textContent=`$${currentPrice.toFixed(2)}`
  
  }

  // remove the item and update the price
  function RemoveItem(product, element) {
    // Remove the product from the cart array
    cartArray = cartArray.filter((item) => item.id !== product.id);
  
    // Remove the element from the DOM
    element.remove();
  
    // Subtract the product's price from the total
    displayTotal(-product.price);
  }
  


  // Function to create category buttons
  function createCategoryButtons() {
    // Get unique categories
    const categories = ["all", ...new Set(menu.map(item => item.category))];
  
    //  Create buttons for each category
    const buttonsHTML = categories.map(function (category) {
      return `<button type="button" class="filter-btn" data-category="${category}">
      ${category}</button>`;
    }).join(""); // Convert array to string
    btnContainer.innerHTML = buttonsHTML; // Add buttons to the page
  
    //  Add event listeners to buttons
    const filterButtons = btnContainer.querySelectorAll(".filter-btn");
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const category = button.getAttribute("data-category");
        if (category === "all") {
          displayMenuItems(menu); // Show all items
        } else {
    //  Show items that match the selected category
          const filteredMenu = menu.filter(item => item.category === category);
          displayMenuItems(filteredMenu);
        }
      });
    });



   

  }
  