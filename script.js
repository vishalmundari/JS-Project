let btn = document.getElementById("btn");
let productItem = document.getElementById("productItem");
let price = document.getElementById("price");

btn.addEventListener("click", addOrder);

function addOrder(e) {
    e.preventDefault();
    let orderDetail = {
        productItem: productItem.value,
        price: price.value,
    };
    axios
        .post(
            "https://crudcrud.com/api/ae5ebcb679f64baf81cae5ee4ae195f5/orderDetails",
            orderDetail
        )
        .then((res) => {
            showItemsOnScreen(res.data);
            console.log(res.data);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(
            "https://crudcrud.com/api/ae5ebcb679f64baf81cae5ee4ae195f5/orderDetails"
        )
        .then((response) => {
            console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                showItemsOnScreen(response.data[i]);
            }
        });
});

function showItemsOnScreen(orderDetail) {
    const parentNode = document.getElementById("table");
    const childHTML = `<h3>Table${orderDetail.table}</h3> <li id=${orderDetail._id}> ${orderDetail.productItem} - ${orderDetail.price}
  <button onclick="deleteOrder('${orderDetail._id}')"> Delete Order </button>
</li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function deleteOrder(id) {
    axios
        .delete(
            `https://crudcrud.com/api/ae5ebcb679f64baf81cae5ee4ae195f5/orderDetails/${id}`
        )
        .then((res) => {
            console.log(res);
        });
    removeOrderFromScreen(id);
}

function removeOrderFromScreen(id) {
    const parentNode = document.getElementById("table");
    const childNodeToBeDeleted = document.getElementById(id);
    parentNode.removeChild(childNodeToBeDeleted);
}
