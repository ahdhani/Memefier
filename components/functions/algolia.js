import { ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY } from 'react-native-dotenv'
const algoliasearch = require("algoliasearch");

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);

const user = client.initIndex("users");
const group = client.initIndex("groups");


export const algoliaPopulateUser = (user_id, user_details) => {
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

export const algoliaPopulateGroup = (group_id, group_details) => {
  const objects = [
    {
      objectID: group_id,
      ...group_details
    }
  ];

  return group
    .saveObjects(objects)
    .then(({ objectIDs }) => {
      console.log("Success algolia");
      // return true
    })
    .catch(err => {
      console.log(err);
    });
}

export const algoliaSearchGroup = (query) => {
  return group
    .search(query)
}

export const algoliaSearch = (query) => {
  return user
    .search(query)
}

export const algoliaUpdate = (objectID , data) => {
  return user
    .partialUpdateObject({objectID , ...data})
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