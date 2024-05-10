// GENERA CARDS PRODOTTI
const generateProductCard = function(productsArray) {
    const productsRow = document.getElementById('products-row')
    productsArray.forEach((product)=> {
        const productCard = document.createElement('div')
        productCard.classList.add('col')
        productCard.innerHTML = `
            <div class="card border-1 border-secondary rounded-2 p-3 h-100 card shadow">
                <img src="${product.imageUrl}" alt="${product.name}" class="w-100 h-50 img-fluid img-thumbnail">
                <h3 class="fw-bold">${product.name}</h3>
                <h5 class="fw-bold">${product.brand}</h5>
                <p>${product.description}</p>
                <p>${product.price} €</p>
                <button class="btn btn-dark text-light rounded-3">Aggiungi al carrello</button>
                <div class="btn-group mt-1">
                    <a href="details-page.html?userId=${product._id}" class="btn btn-danger btn-sm">Scopri di più</a>
                </div>
            </div>
        `
        productsRow.appendChild(productCard)
    })
}

// 1) FETCH
const getProducts = function() {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
    "Authorization": 
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZTVmMzgxODQ0MjAwMTUzNzU5MDQiLCJpYXQiOjE3MTUzMzI1OTUsImV4cCI6MTcxNjU0MjE5NX0.N-rx6OUJh9ycXYUeFkHUCQWq67F1tH7EMEL-n-590JU"
    }
    })
    .then((response)=> {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error("Ops!")
        }
    })

    .then((array)=> {
        console.log('Array!', array)
        generateProductCard(array)
    })

    .catch((err)=> {
        console.log('Errore', err)
    })
}

getProducts()


