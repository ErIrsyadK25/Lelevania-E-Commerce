import axios from 'axios'
import URL from './URL'
import store from '../store'

export const getNotes = () => {
    return{
        type: 'GET_NOTES',
        payload: axios.get(URL+'/notes?page=1&sort=desc')
    }
}

export const getTheNextPage = (nextPage, sortMode) =>{
    console.log('get the next page')
    return{
        type:'ADD_NEXT_PAGE',
        payload:axios.get(URL+'/notes?page='+nextPage+'&sort='+sortMode)
    }
}

export const addNotes = (notesData) =>{
    if(notesData.title!=='' && notesData.note!=='' && notesData.category!==''){
        return {
            type:'ADD_NOTES',
            payload:axios.post(URL+'/notes',{
                    title:notesData.title,
                    note:notesData.note,
                    category:notesData.category
                    })
        }
    }
}

export const updateNote = (noteData) =>{
    if(noteData.title!=='' && noteData.note!=='' && noteData.category!==''){
        return {
            type:'UPDATE_NOTE',
            data: axios.put(URL+'/notes/'+noteData.id,{
                title:noteData.title,
                note:noteData.note,
                category:noteData.category
            }),
            payload:noteData
        }
    }
}

export const deleteNote = (Note) =>{
    return {
        type:'DELETE_NOTE',
        data: axios.delete(URL+'/notes/'+Note.id),
        payload: Note
    }
}

export const searchNote = (searchKey, sortType='DESC') =>{
    return {
        type: 'SEARCH_NOTE',
        payload: axios.get(URL+'/notes?search='+searchKey+'&sort='+sortType)
    }
}

export const itemSorting = (sortType) =>{
    return {
        type: 'SORTING_DATA',
        payload: axios.get(URL+'/notes?sort='+sortType),
    }
}

export const searchNoteByCategory = (searchKey) =>{
    return {
        type: 'SEARCH_BY_CATEGORY',
        payload: {key:searchKey}
    }
}

// export const incNumber = (number) =>{
//     return{
//         type:'INC_NUMBER',
//         payload: number
//     }
// }

// export const decNumber = () => {
//     return {
//         type:'DEC_NUMBER',
//         payload: 1
//     }
// }