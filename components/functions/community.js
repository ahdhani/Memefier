import {db,storage} from '../../config'

export const createGroup = (name , admin , desc , closed = true) => {
    return db.collection('groups').add({
        name ,
        desc ,
        admin ,
        created_at : Date.now() ,
        closed ,
        members : 0
    }).then( ref => {
        console.log(ref)
        return ref.id
    })
    .catch(error => console.log(error.message));
}

/*
Fetch the posts associated with a group
export const fetchPostGroup = () => {

}
*/