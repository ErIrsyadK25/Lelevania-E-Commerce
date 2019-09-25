import axios from 'axios'
import URL from './URL'

export const getCategories = () => {
    return{
        type:'GET_CATEGORIES',
        payload: axios.get(URL+'/category')
    }
}

export const addCategory = (data) =>{
    return{
        type: 'ADD_CATEGORY',
        payload: axios.post(URL+'/category',{
            category:data.category,
            image:data.image
        })
    }
}