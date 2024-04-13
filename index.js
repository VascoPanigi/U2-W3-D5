const URL = "https://striveschool-api.herokuapp.com/api/product/";

const row = document.getElementById("row");

const modifyElement = (id) => {
  window.location.assign("./backoffice.html?id=" + id);
};

const redirectToDetailsPage = (id) => {
  window.location.assign("./product-details.html?id=" + id);
};

window.addEventListener("DOMContentLoaded", () => {
  fetch(URL, {
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjI1OTdmMzA0NjAwMWFlNTlmOGEiLCJpYXQiOjE3MTI5MTA5MzgsImV4cCI6MTcxNDEyMDUzOH0.L4yIDEVCiNpabbUj80jQnslB94rlaEzuA9BV4lLRTlY",
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        console.log("your page is now loading");
        return response.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })
    .then((data) => {
      console.log(data);
      data.forEach((obj) => {
        const name = obj.name;
        const img = obj.imageUrl;
        const brand = obj.brand;
        const description = obj.description;
        const price = obj.price;
        const id = obj._id;
        const div = document.createElement("div");
        div.classList.add("col-xs-12");

        div.innerHTML = `
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative justify-content-sm-center bg-light
        shadow border border-black border-opacity-25">
            <div class="col-auto d-flex justify-content-center align-items-center justify-content-center align-content">
              <img src="${img}" alt="${name}" height="70%">
            </div>
            <div class="col p-4 d-flex flex-column position-static">
                <div class="container d-flex justify-content-between align-items-center">
                  <div class="container">
                    <strong class="d-inline-block mb-2 text-primary-emphasis">Mobile Phones</strong>
                    <h3 class="mb-0">${name}</h3>
                    <div class="mb-1 text-body-secondary"><h5>${brand}</h5></div>
                    <p class="card-text mb-auto">${description}</p>
                  </div>
                  </div>
                  <div class="align-self-end mt-3 mb-2 me-4 pt-3">
                    <h2 class="price-tag">€ ${price}</h2>
                  </div>
                <div class="container d-flex gap-3 justify-content-end mt-auto">
                  <button class="btn btn-warning btn-modify">Modifica</button>
                  <button class="btn btn-success details-page-btn">Scopri di più</button>
                </div>
              </div>
        </div>
      `;

        //function to modify CARD
        const modifyBtn = div.querySelector(".btn-modify");

        modifyBtn.addEventListener("click", () => {
          modifyElement(id);

          //   row.removeChild(div);
        });

        //add functionality to details page btn
        const detailsPageBtn = div.querySelector(".details-page-btn");
        detailsPageBtn.addEventListener("click", () => {
          redirectToDetailsPage(id);
        });

        row.appendChild(div);
      });
    });
});
