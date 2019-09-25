const initialState = {
    categoriesData: [],
    isLoading:false,
}
export default categories = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_CATEGORIES_PENDING':
            return{
                ...state,
                isLoading:true,
            }
        case 'GET_CATEGORIES_REJECTED':
            return{
                ...state,
                isLoading:false,
            }
        case 'GET_CATEGORIES_FULFILLED':
            return{
                ...state,
                isLoading:false,
                categoriesData: action.payload.data.data
            }
        case 'ADD_CATEGORY_PENDING':
            return {
                ...state,
                isLoading:true
            }
        case 'ADD_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading:false
            }
        case 'ADD_CATEGORY_FULFILLED':
            let {categoriesData} = state
            let newElement = {
                id:action.payload.data.data.insertId,
                category:action.payload.data.values.category,
                image:action.payload.data.values.image
            }
            return {
                ...state,
                isLoading:false,
                categoriesData: [...categoriesData, newElement]
            }
        default:
            return state
    }
}