let totalPrice = 0;

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/e5b80007c4ff40febfa935b7170b50b6/SellerData")
    .then((payload) => {
      let data = payload.data;
      data.forEach((item) => {
        showOnWebpage(item);
      });
    })
    .catch((err) => console.log(err));
});

document.getElementById("save").addEventListener("click", function (event) {
  event.preventDefault();
  let price = document.getElementById("sellingPrice").value;
  let product = document.getElementById("productName").value;

  const myObj = {
    price,
    product,
  };
  axios
    .post(
      "https://crudcrud.com/api/e5b80007c4ff40febfa935b7170b50b6/SellerData",
      myObj
    )
    .then((data) => {
      showOnWebpage(data.data);
    })
    .catch((err) => console.log(err));
});

function showOnWebpage(myObj) {
  let list = document.getElementById("listItems");
  let item = document.createElement("li");
  let text = document.createTextNode(`${myObj.price} - ${myObj.product} `);
  let buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Delete Product";

  totalPrice += parseInt(myObj["price"]);

  item.appendChild(text);
  item.appendChild(buttonDelete);
  list.appendChild(item);
  document.getElementById("displayPrice").innerHTML = totalPrice;

  buttonDelete.onclick = () => {
    list.removeChild(item);
    totalPrice -= parseInt(myObj.price);
    axios
      .delete(
        `https://crudcrud.com/api/e5b80007c4ff40febfa935b7170b50b6/SellerData/${myObj["_id"]}`
      )
      .then((err) => console.log(err));
    document.getElementById("displayPrice").innerHTML = totalPrice;
  };
}
