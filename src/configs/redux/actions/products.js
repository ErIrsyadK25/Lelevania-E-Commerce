import axios from 'axios'
import URL from './URL'

export const getProductByCategory = (idCategory) =>{
    
    return{
        type: 'GET_PRODUCT_BY_CATEGORY',
        payload: axios.get(`${URL}/products/${idCategory}`)
    }
}

export const getProductById = (id) => {
  return{
    type: 'GET_PRODUCT_BY_ID',
    payload: axios.get(`${URL}/products/getById/${id}`)
  }
}

export const getAllCartItems = (id) =>{
  return{
    type: 'GET_CART_ITEMS',
    payload: axios.get(`${URL}/tmpCart/users/${id})`)
  }
}

export const addToCart = (dataCart) =>{
  return{
    type: 'ADD_TO_CART',
    payload: dataCart
  }
}