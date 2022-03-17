import React, { useState, useEffect } from 'react';
import {addBook, deleteBook, fetchBook} from '../services/api';

import '../styles/style.css';

export const Home = () => {  

    const [bookinfo, setBookInfo] = useState({title: "", author: ""});
    const [books, setBooks] = useState([]);
    const [titleFieldError, setTitleFieldError] = useState(false)
    const [authorFieldError, setAuthorFieldError] = useState(false);

    useEffect(()=>{            
        fetchBook()
        .then(res => {
            setBooks(Object.values(res.data));            
        })
    },[]);

    const onChangeHandle = (name, value) => {
        setBookInfo({...bookinfo, [name]: value});
        if(name == "title" && value !="") {
            setTitleFieldError(false)
        }  
        if(name == "author" && value != "") {
            setAuthorFieldError(false)
        }   
    } 

    const addBookHandle = () => {
        if(bookinfo.title =='') {
            setTitleFieldError(true)
        }
        
        if(bookinfo.author =='') {
            setAuthorFieldError(true)
        }
        
        if(bookinfo.title !='' && bookinfo.author !='') {
            
            addBook(bookinfo.title, bookinfo.author)
            .then(res => {           
                if(res.data.status == 'success') {
                    setBooks([...books, {key: res.data.key, title: bookinfo.title, author: bookinfo.author}]);
                }            
            });        
            setBookInfo({title: "", author: ""})
        }             
    };

    const closeHandle = (key) => {
        deleteBook(key)
        .then(res => {          
            if(res.data.status == 'success') {
                setBooks(books.filter(book => book.key != key));
            }            
        });
    }
    
    return (
        <div className="container">                    
            <div className='card-main'>
                <div className='card-title'>My Reading List</div>
                <div className='card-body'>
                    {books.map((book) => {
                    return <div className='book-content' key={book.key}>
                        <div className='book-title'>{book.title}
                            <i className='fa fa-close' onClick={() => closeHandle(book.key)}></i>
                        </div>
                        <div className='author-name'>{book.author}</div>
                    </div>
                    })}        
                    <div className='book-add'>
                        <input type="text"
                            name="title"
                            placeholder='Book title'
                            value={bookinfo.title}
                            onChange={(e) => onChangeHandle(e.target.name, e.target.value)}
                            required
                        />
                        <p className='error'> {titleFieldError ? "Please input the Title" : ""} </p>                         
                        <input type="text" 
                            name="author"
                            placeholder='Author'
                            value={bookinfo.author}
                            onChange={(e) => onChangeHandle(e.target.name, e.target.value)}
                            required
                        /> 
                        <p className='error'>{authorFieldError ? "Please input the Author" : ""}</p>                                                  
                    </div>
                    <div className='create-button'>
                        <button className="btn create" onClick={addBookHandle}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
