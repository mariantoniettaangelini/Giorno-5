// FETCH GET - Recupera i dettagli di una singola card 

const addressWithId = new URLSearchParams(location.search) 
const userId = addressWithId.get('userId') 
console.log('ELEMENTID?', userId)

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
    })
    .catch((err)=> {
        console.log('Errore', err)
    })
}
getOneProduct()

// TASTO ELIMINA
const deleteProduct = function() {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${userId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZTVmMzgxODQ0MjAwMTUzNzU5MDQiLCJpYXQiOjE3MTUzMzI1OTUsImV4cCI6MTcxNjU0MjE5NX0.N-rx6OUJh9ycXYUeFkHUCQWq67F1tH7EMEL-n-590JU"
        }
    })
    .then((response)=> {
        if(response.ok) {
            alert('Prodotto eliminato dal carrello')
            location.assign('shop-page.html')
        }
        else {
            alert('Questo prodotto non è stato eliminato')
        }
    })
    .catch((err)=> {
        console.log('Errore', err)
    })
}

// TASTO MODIFICA
const editButton = document.getElementById('edit')
editButton.addEventListener('click', function() {
    location.assign(`https://striveschool-api.herokuapp.com/api/product/${userId}`)
})
