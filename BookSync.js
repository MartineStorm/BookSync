// Load bookshelves from localStorage when the page loads
window.onload = function() {
    loadBooks('currentlyReading');
    loadBooks('read');
    loadBooks('wantToRead');
};

// Add a book to a specific shelf
function addBook(shelf) {
    const inputId = `${shelf}-input`;
    const listId = `${shelf}-list`;

    const bookInput = document.getElementById(inputId);
    const bookName = bookInput.value;

    if (bookName) {
        const bookList = document.getElementById(listId);
        const listItem = document.createElement('li');
        listItem.textContent = bookName;

        // Add a remove button to each book
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.onclick = function() {
            removeBook(shelf, bookName);
        };
        listItem.appendChild(removeBtn);

        bookList.appendChild(listItem);
        
        saveBook(shelf, bookName);
        bookInput.value = '';  // Clear the input after adding
    }
}

// Save a book to localStorage
function saveBook(shelf, bookName) {
    const books = JSON.parse(localStorage.getItem(shelf)) || [];
    books.push(bookName);
    localStorage.setItem(shelf, JSON.stringify(books));
}

// Load books from localStorage
function loadBooks(shelf) {
    const books = JSON.parse(localStorage.getItem(shelf)) || [];
    const listId = `${shelf}-list`;

    books.forEach(book => {
        const bookList = document.getElementById(listId);
        const listItem = document.createElement('li');
        listItem.textContent = book;

        // Add a remove button to each book
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.onclick = function() {
            removeBook(shelf, book);
        };
        listItem.appendChild(removeBtn);

        bookList.appendChild(listItem);
    });
}

// Remove a book from the shelf and localStorage
function removeBook(shelf, bookName) {
    let books = JSON.parse(localStorage.getItem(shelf)) || [];
    books = books.filter(book => book !== bookName);  // Remove the specific book
    localStorage.setItem(shelf, JSON.stringify(books));

    // Reload the shelf after removal
    document.getElementById(`${shelf}-list`).innerHTML = '';  // Clear the list
    loadBooks(shelf);  // Reload the updated list
}
