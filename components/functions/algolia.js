import { ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY } from 'react-native-dotenv'
const algoliasearch = require("algoliasearch");
 
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);
const user = client.initIndex("users");
 
export const algoliaPopulateUser = (user_id , user_details) => {
  const objects = [
    {
      objectID: user_id,
      ...user_details
    }
  ];
   
return user
    .saveObjects(objects)
    .then(({ objectIDs }) => {
      console.log(objectIDs);
      // return true
    })
    .catch(err => {
      console.log(err);
    });
}
/*
WORKING function algoliaTest
export const algoliaTest = () => {
    const objects = [
        {
          objectID: 1,
          name: "Foo"
        }
      ];
       
    return user
        .saveObjects(objects)
        .then(({ objectIDs }) => {
          console.log(objectIDs);
          return true
        })
        .catch(err => {
          console.log(err);
        });
}
*/