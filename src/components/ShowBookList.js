import React from 'react';
import '../App.css';
import axios from 'axios'; //library for making requests (easier to use than fetch)
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { useState, useEffect } from 'react';


const GET_ALL_BOOKS_ENDPOINT = "http://localhost:5001/api/books"

function ShowBookList(props){

  // setup hook
  const [books, setBooks] = useState([]);  

  // after component is rendered 
  useEffect(() => {
    axios
    .get(GET_ALL_BOOKS_ENDPOINT)
    .then(res => {
      setBooks(res.data);
    })
    .catch(err =>{
      console.log('Error from ShowBookList');
    })
  }, [])

  let bookList;
  // //check if the books are not empty
  if(!books) {
    bookList = "there is no book recored!";
  } else {
    // if there are book results, map them onto Book Cards
    bookList = books.map((book, k) =>
      <BookCard book={book} key={k} />
    );
  }
  return (

    <div className="ShowBookList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Books List</h2>
          </div>

          <div className="col-md-11">
            <Link to="/create-book" className="btn btn-outline-warning float-right">
              + Add New Book
            </Link>
            <br />
            <br />
            <hr />
          </div>

        </div>

        <div className="list">
              {bookList}
        </div>
      </div>
    </div> );

}

export default ShowBookList;
