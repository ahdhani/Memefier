import { db } from '../../config'
import { ADD_POST_REQUEST, ADD_POST_SUCCESS ,ADD_POST_FAILURE } from './memeTypes';

export const addPost = (img_url , caption) => {
    return function (dispatch, getState) {
        // Add a new document with a generated id.
        console.log("ADD_POST_REQUEST");
        dispatch({
            type : ADD_POST_REQUEST
        })
        let addDoc = db.collection('posts').add({
            img : img_url ,
            caption : caption ,
            created_by : getState().auth.user.uid
        }).then(ref => {
            console.log("ADD_POST_SUCCESS");
            dispatch({
                type : ADD_POST_SUCCESS ,
                payload : {
                    new_meme : ref.ZE.path.segments[1]
                }
            })
            console.log(getState().post)
            // console.log(ref.ZE.path.segments[1])
            // console.log(getState().post)
        }).catch(error => {
            console.log("ADD_POST_FAILURE" , error.message);
            dispatch({
                type : ADD_POST_FAILURE ,
                payload : {
                    error_msg : error.message
                }
            })
        });
    }
}