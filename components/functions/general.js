import { db , storage } from '../../config'
import TimeAgo from 'javascript-time-ago'
 
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)

// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')

export const dateTimeProcessor = (date_time) => {
    return timeAgo.format(date_time)
}

export const fetchUser = async (user_uid) => {
    var userDetails = {}
    await db.collection("userDetails")
        .doc(user_uid)
        .get()
        .then(user => {
            userDetails = {
                userId: user.data().userId,
                dp: user.data().dp
            }
            // userId = user.data().userId
            // console.log(userDetails)
        }).catch(error => console.log(error.message))
    return userDetails

}
// file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fmemefier-2063bd96-5869-4bb7-85e5-db89f00a0489/ImagePicker/0eeb9583-a5b4-4539-871c-eaec00fb276a.jpg
export const changeDisplayPicture = async (URI = "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fmemefier-2063bd96-5869-4bb7-85e5-db89f00a0489/ImagePicker/0eeb9583-a5b4-4539-871c-eaec00fb276a.jpg") => {
    imageName = "1234aosdfjaksd1283"

    try {
        const response = await fetch(URI);
        const blob = await response.blob();
        
        const uploadTask  = storage.ref().child("test/" + imageName).put(blob);

        uploadTask.on('state_changed' , 
        (snapshot) => {
            // Progress function
            var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100)
            this.setState({progress: progress})
            console.log("Progress : " , progress)
        } ,
        (error) => {
            console.error(error.message);
        } , 
        () => {
            storage.ref('test').child(imageName).getDownloadURL().then( url => {
                // console.log(url);
                console.log("URL " , url)
            })
        })
    } catch (error) {
        // Make a state variable error and append the `error.message` from here to it
        console.log(error.message);
    }
}

export const notificationTextProcessor = (type) => {
    
    switch(type) {
        case 1 :
            return " commented on your post"
        default :
            return "Invalid case"
    }
}