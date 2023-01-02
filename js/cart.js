let kanaps = [];
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (products) {
    kanaps = products;
    displayCartData();
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

function findKanapFromId(id) {
  const kanap = kanaps.find(function (kanap) {
    return kanap._id === id;
  });
  return kanap;
}

function displayCartData() {
  console.log("displayCartData");
  const myCart = getCart();
  console.log("myCart", myCart);
  const data = [];
  let total = 0;
  let totalCart = document.getElementById("totalPrice");
  if (myCart !== null) {
    myCart.forEach(function (cartItem, index) {
      console.log("myCart forEach", index);
      const kanap = findKanapFromId(cartItem.id);
      console.log("kanap", kanap, kanap.price);
      total += cartItem.quantity * kanap.price;
      const rowData = { ...cartItem, ...kanap };
      console.log("rowData", rowData);
      data.push(rowData);
    });
    totalCart.append(total);
    displayCart(data);
    deleteButton();
  } else {
    document.querySelector("h1").innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }
}

function displayCart(rowData) {
  console.log("displayCart", rowData);
  const cartSection = document.getElementById("cart__items");
  let html = "";
  rowData.forEach(function (rowItem, index) {
    console.log("displayCart rowItem", rowItem, index);
    html += `
    <article class="cart__item" data-id="${rowItem.id}" data-color="${rowItem.color}">
      <div class="cart__item__img">
        <img src="${rowItem.imageUrl}" alt="${rowItem.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${rowItem.name}</h2>
          <p>${rowItem.color}</p>
          <p>${rowItem.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity"  min="1" max="100" value="${rowItem.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
  });
  cartSection.innerHTML = html;
}

/*
const removeBtn = document.querySelectorAll(".del");
removeBtn.forEach((btn, i) => {
  btn.addEventListener("click", () => deleteItemSelect(i));
});

function deleteItemSelect(index, rowItem) {
  items.splice(index, 1);
  localStorage.setItem("kanap", JSON.stringify(rowItem));

  if (items.length === 0) {
    localStorage.removeItem("kanap");
  }
}
*/

/* const removeBtn = document.getElementById("deleteItem");
if (removeBtn) {
  removeBtn.addEventListener("click", function (event) {
    event.preventDefault();
    removeCart();
  });
} */

function displayNumberProduct() {
  const kanapNumber = getCart();
  let number = 0;
  let cartQuantity = document.getElementById("totalQuantity");
  for (let product of kanapNumber) {
    number += product.quantity;
    console.log("number :", number);
  }
  cartQuantity.append(number);
}
displayNumberProduct();

/*  function TotalPrice() {
  const myCart = getCart();
  let total = 0;
  let totalCart = document.getElementById("totalPrice");
  for (let product of myCart) {
    console.log(product.id)
    const kanap = findKanapFromId(product.id);
    console.log(kanap.price)
    // total += product.quantity * kanap.price;
    console.log("total : ", total);
  }
  totalCart.append(total);
}
TotalPrice();  */

/* function TotalPrice() {
  const myCart = getCart();
  let total = 0;
  let totalCart = document.getElementById("totalPrice");
  if (myCart !== null) {
    myCart.forEach(function (cartItem) {
      console.log("test", cartItem.id);
      const kanap = findKanapFromId(cartItem.id);
      
      console.log("AAAAAAAAA", cartItem.quantity);
      // total += cartItem.quantity * kanap.price;
      console.log("total : ", total);
    });
    totalCart.append(total);
  }
}
TotalPrice(); */

function removeProduct(id, color) {
  const kanap = getCart();
  const updatedKanap = kanap.filter(
    (item) => item.id !== id && item.color !== color
  );
  saveCart(updatedKanap);
  displayNumberProduct();
  displayCartData();
}

function deleteButton() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const parentElement =
        event.target.parentElement.parentElement.parentElement.parentElement;
      console.log("parentHTML", parentElement);
      const id = parentElement.dataset.id;
      const color = parentElement.dataset.color;
      removeProduct(id, color);
    });
  });
}

function updateQuantity() {
  const kanap = getCart();
  let quantityButton = document.querySelector("input");
  const number = document.querySelectorAll(".itemQuantity");
  let foundKanap = kanap.find(
    (p) => p.id === kanap.id && p.color === kanap.color
  );
  if (foundKanap) {
    quantityButton.addEventListener("click", (change) => {
      change = number + quantityButton;
      kanap.quantity++;
      console.log("DOEZIJFDIOEZF", number);
    });
    saveCart();
    displayNumberProduct();
  }
}
updateQuantity();

/* function changeQuantity(product, quantity) {
  const kanap = getCart();
  const quantityButton = document.querySelectorAll(".itemQuantity");
  let number = document.querySelector("input");
  let foundKanap = kanaps.find(
    (p) => p.id === product.id && p.color === product.color
  );
  if (foundKanap) {
    let quantity = quantityButton.value;
    quantityButton.forEach((quantity) => {
      answer.addEventListener("change", function () {
        quantity = number.value;
        foundKanap.quantity += number.value;
        saveCart(kanap);
        displayNumberProduct();
      });
    });
  }
}
changeQuantity(); */
