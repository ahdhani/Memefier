import { ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY } from 'react-native-dotenv'
const algoliasearch = require("algoliasearch");
 
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);
const user = client.initIndex("user");
 

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
