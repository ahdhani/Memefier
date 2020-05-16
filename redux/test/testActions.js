import { DELETE_ITEM_SUCCESS, ADD_ITEM_SUCCESS} from "./testType"

export const addItem = () => ({
    type: ADD_ITEM_SUCCESS
})

export const deleteItem = () => ({
    type: DELETE_ITEM_SUCCESS
})

