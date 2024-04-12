const URL = "https://striveschool-api.herokuapp.com/api/product/";

window.onload = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);
};

const handleSubmit = (event) => {
  console.log("EVENT", event);
  event.preventDefault(); // evitiamo il ricaricamento della pagina al click del bottone submit (e conseguente avvio dell'evento submit)

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("url").value,
    price: document.getElementById("price").value,
  };

  fetch(URL, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjI1OTdmMzA0NjAwMWFlNTlmOGEiLCJpYXQiOjE3MTI5MTA5MzgsImV4cCI6MTcxNDEyMDUzOH0.L4yIDEVCiNpabbUj80jQnslB94rlaEzuA9BV4lLRTlY",
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
      alert("Risorsa con id: " + createdProduct._id + " creata con successo!");

      event.target.reset();
    })
    .catch((err) => console.log(err));
};
