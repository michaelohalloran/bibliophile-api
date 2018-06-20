let message = 'Testing book API file';
// alert(message);
// console.log('Hi');

let root = document.getElementById('root');
root.innerHTML = message;

// root.innerHTML = message;

fetch('https://www.googleapis.com/books/v1/volumes?q=baseball&key=AIzaSyBV4JsaEhWuCkhm_6gF-72N6ulSt1LdBRw', {
    method: 'GET',
    dataType: 'json'
})
.then(response=>response.json())
.then(books=> {
    console.log('books: ', books);
    console.log(books.items);
    books.items.map(book=> {
        const title = book.volumeInfo.title;
        let price;
        price = book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : 'Not for sale';
        const snippet= book.searchInfo.textSnippet;
        let authors; 
        book.volumeInfo.authors.length>0 ? authors = book.volumeInfo.authors.join(', ') : 'None';
        // if(book.volumeInfo.authors) {
        //     const authors = book.VolumeInfo.authors.join(',');
        // }
        // book.volumeInfo.authors ? const authors = ...book.volumeInfo.authors : null;
        const desc = book.volumeInfo.description;
        const count = book.volumeInfo.pageCount;
        const avgRating = book.volumeInfo.averageRating;
        const thumbnail = book.volumeInfo.imageLinks.thumbnail;
        root.innerHTML += `
            <div>
                Title: ${title}<br/>${''}
                Author(s): ${authors}<br/>${''}
                Price: ${price}<br/>${''}            
                Snippet: ${snippet}<br/>${''}
                Desc: ${desc}<br/>${''}
                Pages: ${count}<br/>${''}
                AvgRating: ${avgRating}<br/>${''}
                <img src=${thumbnail}/><br/>${''}
            </div><br/>
        `
    })
})
.catch(err=>console.log(err));
