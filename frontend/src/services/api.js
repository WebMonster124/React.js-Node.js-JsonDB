import axios from 'axios';
import qs from 'querystring';

const api = axios.create({
    baseURL: 'http://localhost:3333/jsondb',
    headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

export const addBook = (title, author) => {
    return api.post('save', qs.stringify({title: title, author: author}))   
}

export const deleteBook = (id) => {
    return api.post('delete', qs.stringify({key: id}))   
}

export const fetchBook = () => {
    return api.post('all', qs.stringify({}))
}

export default api;