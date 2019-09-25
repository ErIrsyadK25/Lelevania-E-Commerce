import {AsyncStorage} from 'react-native'

const initialState = {
    isLogin:false,
    user: [{name:'Lelevenia', email:'Lelevenia@gmail.com'}],
    token: '',
    categories: [],
    categoriesById: [],
    isLoading:false,
    inserted: false,
}
export default user = (state = initialState, action)=>{
    switch(action.type){
        case 'POST_USER_PENDING':
        case 'GET_WISHLIST_PENDING':
        case 'POST_REGISTER_PENDING':
        case 'GET_CATEGORIES_PENDING':
        case 'GET_PRODUCT_BY_CATEGORY_PENDING':
        case 'POST_NEW_PRODUCT_PENDING':
            return{
                ...state,
                isLoading:true,
            }
        case 'POST_USER_REJECTED':
        case 'GET_WISHLIST_PENDING':
        case 'POST_REGISTER_REJECTED':
        case 'GET_CATEGORIES_REJECTED':
        case 'GET_PRODUCT_BY_CATEGORY_REJECTED':
        case 'POST_NEW_PRODUCT_REJECTED':
            return{
                ...state,
                isLoading:false,
            }
        case 'POST_USER_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isLogin:true,
                user: action.payload.data.user,
                token: action.payload.data.token
            }
        case 'GET_WISHLIST_FULFILLED':
            return{
                ...state,
                isLoading:false,
                wishlist: action.payload.data.data
            }
        case 'POST_REGISTER_FULFILLED':
            return{
                ...state,
                isLoading:false,
                user: action.payload.data.createdUser
            }
        case 'GET_CATEGORIES_FULFILLED':
            return{
                ...state,
                isLoading:false,
                categories: action.payload.data.data
            }
        case 'GET_PRODUCT_BY_CATEGORY_FULFILLED':
            return{
                ...state,
                isLoading:false,
                categoriesById: action.payload.data.data
            }
        case 'LOGIN_WITH_ASYNCSTORAGE':
            return{
                ...state,
                isLogin:true
            }
        case 'SETUP_USERDATA_WITH_ASYNCSTORAGE':
        AsyncStorage.getItem('user').then((userData)=>{
            console.log('dari reducer cuy',userData)
            return{
                    ...state,
                    user: userData
                }
        })    
        case 'LOGOUT':
            AsyncStorage.removeItem('token')
            AsyncStorage.removeItem('user')
            return{
                ...state,
                isLogin: false
            }
        case 'POST_NEW_PRODUCT_FULFILLED':
            return{
                ...state,
                inserted: true,
                insertedProduct: action.payload.data.data

            }
        default:
            return state
    }
}