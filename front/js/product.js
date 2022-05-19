// récupération id du produit
const str = window.location;
const url = new URL(str);
const productId = url.searchParams.get("id");
const objectURL = "http://localhost:3000/api/products/" + productId;

// Récupération des produits de l'API
function displayProduct() {
    fetch("http://localhost:3000/api/products/" + productId)
        .then(function (res) {
            return res.json();
        })
        .catch((err) => {
            // Une erreur est survenue
            console.log("erreur");
        })

        // Insertion des données de l'API dans le DOM (titre, img, nom, prix, description et option couleurs)
        .then(function (getProduct) {
            const product = getProduct;

            let productTitle = document.querySelector("title");
            productTitle.textContent = `${product.name}`;

            let productImg = document.createElement("img");
            document.querySelector(".item__img").appendChild(productImg);
            productImg.setAttribute("src", `${product.imageUrl}`);
            productImg.setAttribute("alt", `${product.altTxt}`);

            let productName = document.getElementById("title");
            productName.textContent = `${product.name}`;

            let productPrice = document.getElementById("price");
            productPrice.textContent = `${product.price}`;

            let productDescription = document.getElementById("description");
            productDescription.textContent = `${product.description}`;

            document.querySelector("#colors").insertAdjacentHTML(
                "beforeend",
                product.colors.map(
                    (color) =>
                    `<option id= "valueColor" value="${color}">${color}</option>`
                )
            );
        });

    // Ecoute événèment sur le bouton ajouter au panier
    const cartButton = document.getElementById("addToCart");
    cartButton.addEventListener("click", (event) => {
        event.preventDefault();
        let productColor = document.getElementById("colors").value;
        let productQuantity = parseInt(document.getElementById("quantity").value);
        // Si aucune couleur sélectionnée
        if (productColor == "") {
            alert("Veuillez sélectionner une couleur");
            return;
        }
        // Si quantité = 0
        if (productQuantity == 0) {
            alert("Veuillez renseigner une quantité");
            return;
        } else if (productQuantity > 100) {
            alert("La quantité maximale autorisée est de 100");
            return;
        }
        // Création d'un tableau contenant l'id, la couleur et la quantité du produit ajouté
        const productOptions = {
            id: productId,
            color: productColor,
            quantity: productQuantity,
        };
        addToCart(productOptions);
    });
}
displayProduct();

// Ajout d'un produit au panier
function addToCart() {

}