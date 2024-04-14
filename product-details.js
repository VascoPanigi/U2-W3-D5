const URL = "https://striveschool-api.herokuapp.com/api/product/";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id);

window.addEventListener("DOMContentLoaded", () => {
  fetch(URL + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjI1OTdmMzA0NjAwMWFlNTlmOGEiLCJpYXQiOjE3MTI5MTA5MzgsImV4cCI6MTcxNDEyMDUzOH0.L4yIDEVCiNpabbUj80jQnslB94rlaEzuA9BV4lLRTlY",
    },
  })
    .then((Response) => {
      if (Response.ok) {
        console.log("The page is loading...");
        return Response.json();
      } else {
        throw new Error("Fetch error");
      }
    })
    .then((data) => {
      console.log(data);
      const container = document.getElementById("product-details");

      const { name, description, brand, imageUrl, price } = data;

      container.innerHTML = `<div class="row gx-4 gx-lg-5 align-items-center">
        <div class="col-md-6"><img id='img' class="card-img-top mb-5 mb-md-0" src=${imageUrl} alt="${name}"></div>
        <div class="col-md-6">
            <div class="small mb-1"></div>
            <h1 class="display-5 fw-bolder">${name}</h1>
            <h3 >${brand}</h3>
            <div class="price-tag fs-9 mb-5">
                <span id="price">€ ${price}</span>
            </div>
            <p class="lead">${description}</p>
            <div class="d-flex">
                <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem">
                <button class="btn btn-outline-dark flex-shrink-0" type="button">
                    <i class="bi-cart-fill me-1"></i>
                    Add to cart
                </button>
            </div>
        </div>
    </div>`;
    })
    .catch((err) => console.log(err));
});
