let totalPrice = 0;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const payload = await axios.get(
      "https://crudcrud.com/api/4e52f2f5115c435f81ed5f988298fa4c/SellerData"
    );
    const userData = payload.data;
    userData.forEach((data) => showOnWebpage(data));
  } catch (err) {
    console.log(err);
  }
});

document.getElementById("save").addEventListener("click", async (event) => {
  event.preventDefault();

  let price = document.getElementById("sellingPrice").value;
  let product = document.getElementById("productName").value;

  const myObj = {
    price,
    product,
  };

  try {
    let payload = await axios.post(
      "https://crudcrud.com/api/4e52f2f5115c435f81ed5f988298fa4c/SellerData",
      myObj
    );
    showOnWebpage(payload.data);
  } catch (err) {
    console.log(err);
  }
});

const showOnWebpage = (myObj) => {
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

  buttonDelete.onclick = async () => {
    list.removeChild(item);
    totalPrice -= parseInt(myObj.price);
    try {
      await axios.delete(
        `https://crudcrud.com/api/4e52f2f5115c435f81ed5f988298fa4c/SellerData/${myObj["_id"]}`
      );
    } catch (err) {
      console.log(err);
    }
    document.getElementById("displayPrice").innerHTML = totalPrice;
  };
};
