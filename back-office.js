/* PROPRIETA' DEL MIO PRODOTTO:
- name
- description
- brand
- imageUrl
- price
*/

class Product {
    constructor(_name, _description, _brand, _price, _imageUrl) {
        this.name = _name
        this.description = _description
        this.brand = _brand
        this.price = _price 
        this.imageUrl = _imageUrl
    }
}


// 1) RECUPERO DATI DAL FORM PER CREARE LA CARD
const createCard = function(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const brandInput = document.getElementById('brand');
    const priceInput = document.getElementById('price');
    const imageInput = document.getElementById('imgUrl');

    const productFromForm = new Product (
        nameInput.value,
        descriptionInput.value,
        brandInput.value,
        priceInput.value,
        imageInput.value
    );

    console.log('Prodotto da creare', productFromForm);
    
    getProducts(productFromForm);
};

// FETCH POST - Crea un prodotto
const getProducts = function(product) {
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZTVmMzgxODQ0MjAwMTUzNzU5MDQiLCJpYXQiOjE3MTUzMzI1OTUsImV4cCI6MTcxNjU0MjE5NX0.N-rx6OUJh9ycXYUeFkHUCQWq67F1tH7EMEL-n-590JU",
            "Content-Type": "application/json"
        },
    })
    .then((response)=> {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Errore');
        }
    })
    .then((data) => {
        console.log('Dati ricevuti:', data);
        alert('Prodotto creato con successo')
            location.assign('shop-page.html')
    })
    .catch((err)=> {
        console.log('Errore', err);
    });
};


// 2) FETCH PUT - Modifica un prodotto esistente
const addressWithId = new URLSearchParams(location.search) 
const userId = addressWithId.get('userId') 
console.log('ELEMENTID?', userId)

let productToModify

const getOneProduct = function() {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${userId}`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZTVmMzgxODQ0MjAwMTUzNzU5MDQiLCJpYXQiOjE3MTUzMzI1OTUsImV4cCI6MTcxNjU0MjE5NX0.N-rx6OUJh9ycXYUeFkHUCQWq67F1tH7EMEL-n-590JU",
            "Content-Type": "application/json"
        },
    })
    .then((response)=> {
        if(response.ok) {
            return response.json();
        }
        else {
            throw new Error('Errore');
        }
    })
    .then((element)=> {
        console.log(element)
        document.getElementById('name').innerText = element.name
        document.getElementById('description').innerText = element.description
        document.getElementById('brand').innerText = element.brand
        document.getElementById('price').innerText = element.price + '€'
        const imgElement = document.getElementById('imgUrl');
        imgElement.src = element.imageUrl;

        productToModify = element
    })
    .catch((err)=> {
        console.log('Errore', err)
    })

    if (userId) {
        getOneProduct()
        document.getElementByClassName('btn-dark')[0].innerText = 'Modifica prodotto'
    }

    fetch(`https://striveschool-api.herokuapp.com/api/product/${productToModify._id}`, {
        method: 'PUT',
        body: JSON.stringify(productFromForm),
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZTVmMzgxODQ0MjAwMTUzNzU5MDQiLCJpYXQiOjE3MTUzMzI1OTUsImV4cCI6MTcxNjU0MjE5NX0.N-rx6OUJh9ycXYUeFkHUCQWq67F1tH7EMEL-n-590JU",
            "Content-Type": "application/json"
        },
    })
    .then((response)=> {
        if(response.ok) {
            alert(`${userId} modificato con successo`)
        }
        else {
            throw new Error('Errore');
        }
    })
    .catch((err)=> {
        console.log('Errore', err)
    })
}
getOneProduct()


document.getElementById('product-form').addEventListener('submit', createCard);




