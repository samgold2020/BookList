//Book class: Represents a book 
class Book {
  constructor(title, author){
    this.title = title;
    this.author = author;
  }
}

//UI Class: Handle user experience tasts
  //needs methods for display, add, remove, and alert
class UI {
  //going to use a static method because we don't need to create a new instance/object in order to render these methods. Meaning, the method will be called directly on the class. 
  static displayBooks(){
    //temporary hardcoded array for testing:
    const StoredBooks = [
      {
        title: "Pricks in the Tapistry",
        author: "Jameson Fitzpatrick"
      },
      {
        title: "The Reader",
        author: "Bernhard Schlink",
      }
    ];
    const books = StoredBooks;
    //loop through the books array and call a method and passing the bookinto it
    books.forEach((book) => {
        UI.addBookToList(book);
    })}
  static addBookToList(book){
    //Create the row inside the tbody, with the id="book-list". Grabbing the element in the DOM
    const list = document.getElementById("book-list");
    // create a table row element
    const row = document.createElement('tr');
    // add in columns inside the row
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    //append the row to the list
    list.appendChild(row);
  }

  //delete book
  static deleteBook(element){
    //we only want to delete if a class of delete is included:
    if(element.classList.contains('delete')){
      //if it is included then delete the parent, or the whole row. Here we don't want to do the td of delete but rather the whole row, which is the grandparent:
      element.parentElement.parentElement.remove();
      //^remove() removes from the DOM
      //if we only did one element.parent it would remove the X, if we do it's the whold TD row
    }
  }

  //clear the book field by grabbing the element and changing the value 
  static clearFields(){
    document.getElementById("title").value = " ";
    document.getElementById("author").value = " ";
  }
}

//Store class: Handles local storage within the browser 

//Event: Show books in UI and storage
  //DOMContentLoaded event fires when the initial HTML document has been loaded, parsed, and without waiting for stylesheets, images, etc... to be loaded
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a book to UI and storage
  //Grab the book form and add an event listener for the submit
 let form = document.getElementsByClassName("form")[0].addEventListener("submit", (e) =>{
   //Prevent actual submit
   e.preventDefault();
   //Get the form values
   const title = document.getElementById("title").value;
   const author = document.getElementById("author").value;

  //Validate
  if(title === " " || author === " "){
    alert("Please fill in all fields")
  } else {
  //Instantiate a book from the book class and pass in the values above
    const book = new Book(title, author);
   //  console.log(book)
  
   //Add Book to UI
   UI.addBookToList(book);
  
   //Clear input fields 
   //We're going to add this method to the UI class first
   UI.clearFields()
  }

 });

 //Remove a book from UI and storage
  //Since we have multiple delete links we can't just target it at the click event.
  //because it will only delete the first one if we do this. 
  //We need to use Event propogation where we select something above it like the booklist and target whatever is clicked inside of it
 document.getElementById("book-list").addEventListener('click', (e) =>{
  console.log(e.target) //Gets the individual books or authors when they are clicked on as well as the a tags/elements
  //^ so what we want to do is pass that target into a method on the UI for delete book:
  UI.deleteBook(e.target);
  //^What were doing with Delete is Event propogation, where we are targeting the actual list and then if it contains 'delete' remove the parent parent of whatever we click.  

 });


