const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id);
const URL = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = id ? "PUT" : "POST";
const authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjI1OTdmMzA0NjAwMWFlNTlmOGEiLCJpYXQiOjE3MTI5MTA5MzgsImV4cCI6MTcxNDEyMDUzOH0.L4yIDEVCiNpabbUj80jQnslB94rlaEzuA9BV4lLRTlY";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);
  const h1ActionType = document.getElementById("whatrudoinghere");
  const submitBtn = document.getElementById("submit-btn");
  const deleteBtn = document.getElementById("delete-btn");
  if (id) {
    h1ActionType.innerText = "Modifica appuntamento";
    submitBtn.classList.remove("btn-primary");
    submitBtn.classList.add("btn-warning");
    submitBtn.innerText = "Modifica";
    deleteBtn.addEventListener("click", handleDelete);
    deleteBtn.classList.remove("d-none");

    fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authorization}`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore nella fetch");
        }
      })
      .then((appToModify) => {
        const { name, description, brand, imageUrl, price } = appToModify;

        document.getElementById("name").value = name;
        document.getElementById("description").value = description;
        document.getElementById("brand").value = brand;
        document.getElementById("url").value = imageUrl;
        document.getElementById("price").value = price;
      })
      .catch((err) => console.log(err));
  } else {
    subtitle.innerText = "— Crea appuntamento";
  }
});

const handleSubmit = (event) => {
  event.preventDefault();
  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("url").value,
    price: document.getElementById("price").value,
  };

  fetch(URL, {
    method,
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: `${authorization}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })
    .then((createdProduct) => {
      if (id) {
        alert("Prodotto con id: " + createdProduct._id + " modificato con successo!");
      } else {
        alert("Prodotto con id: " + createdProduct._id + " creato con successo!");
      }
      event.target.reset();
    })
    .catch((err) => console.log(err));
};

const handleDelete = () => {
  const hasConfirmed = confirm("vuoi eliminare il prodotto?");

  if (hasConfirmed) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${authorization}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Errore nella fetch");
        }
      })
      .then((deletedObj) => {
        alert("prodotto: " + deletedObj.name + " eliminato con successo!");
        window.location.assign("./index.html");
      })
      .catch((err) => console.log(err));
  }
};
