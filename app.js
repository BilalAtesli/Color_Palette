const divElement = document.querySelector("#hex-row");

const addButtonElement = document.querySelector("#add-btn");
const createButtonElement = document.querySelector("#create-btn");
const formElement = document.querySelector("#hexform");
let localStorageColors = localStorage.getItem("colors")
  ? JSON.parse(localStorage.getItem("colors"))
  : [];
const colorCards = document.querySelector("#colorcards");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  let colors = [];
  Array.from(event.target.elements).forEach((item) => {
    if (item.type === "text") {
      colors.push(item.value);
    }
  });
  localStorageColors.push(colors);
  colorCards.append(addColorPalette(colors));
  localStorage.setItem("colors", JSON.stringify(localStorageColors));
  formElement.reset();
});
let counter = 1;
addButtonElement.addEventListener("click", () => {
  counter++;
  divElement.append(newİnputElement(counter));
});

function newİnputElement(itemCount) {
  const col = document.createElement("div");
  col.classList.add("col");
  col.innerHTML = ` <div class="col my-2">
<label for="colorInput-${itemCount}" class="form-label"
  >Hex Code</label
>
<input
id="colorInput-${itemCount}"
  type="text"
  class="form-control color-input"
  minlength="7"
  maxlength="7"
  name="color-${itemCount}"
/>
</div>`;
  return col;
}
divElement.append(newİnputElement(counter));

// <div class="row gap-2">
//             <div class="col card" style="background-color: aqua"></div>
//             <div class="col card" style="background-color: red"></div>
//           </div>
if (localStorageColors.length) {
  localStorageColors.forEach((color) => {
    colorCards.append(addColorPalette(color));
  });
}
function addColorPalette(items) {
  const rowElement = document.createElement("div");
  rowElement.classList.add("row", "gap-3", "my-3");
  items.forEach((item) => {
    const cardItem = document.createElement("div");
    cardItem.classList.add("col", "card", "colorCard");
    cardItem.style.backgroundColor = item;
    rowElement.append(cardItem);
  });
  return rowElement;
}
const colorCardsItems = document.querySelectorAll(".colorCard");

colorCardsItems.forEach((colorCard) => {
  colorCard.addEventListener("click", () => {
    navigator.clipboard.writeText(colorCard.style.backgroundColor);
    alert("Renk Kopyalandı");
  });
});
