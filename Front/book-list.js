const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/books", false );
    xhttp.send();
    const books = JSON.parse(xhttp.responseText);

    for (let book of books) {
        const x = ` 
        
                <h5>Title:${book.title}</h5> 
                <h6>ISBN:${book.isbn}</h6>
                <div> Author:${book.author}</div>
                <div>Publisher:${book.publisher}</div>
                <div>Published Date:${book.publishedDate}</div>
                <div>Number of Pages:${book.numberOfPages} </div> 
                
                <hr>

                <input type="button" onclick="deleteBook(${book.isbn})"> Delete </button>
                <input type="button" onclick="setEditModal(${book.isbn})"> Edit </button>
              `
      document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;  
    }
    
}

const deleteBook = (isbn) => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false);
  xhttp.send();

  location.reload();
}

const setEditModal = (isbn) => {

  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false);
  xhttp.send();

  const book = JSON.parse(xhttp.responseText);

  const {
      title,
      author,
      publisher,
      publisedDate,
      numberOfPages,
  } = book;

  document.getElementById('isbn').value = isbn;
  document.getElementById('title').value = title;
  document.getElementById('author').value = author;
  document.getElementById('publisher').value = publisher;
  document.getElementById('publishedDate').value = publisedDate;
  document.getElementById('numberOfPages').value =  numberOfPages;

  document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
}

