# My Reads: A Reading list app

This app allows user to save books in one of three categories: Currently Reading, Want to Read, and Read.
The user can also add new books using the search page.
On the search page, user can add multiple books before returning to the booklist.

## Local Deployment Instruction
1. Download or clone this repository.
2. Navigate to the root of the app (where `package.json` is located).
3. Run `npm install` to install all dependencies.
4. Run `npm start` to start the react-scripts server.
5. The app should now be running on `localhost:3000`.

## Note about search 
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in SEARCH_TERMS.md. That list of terms are the only terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Resources
- [Starting Code](https://github.com/udacity/reactnd-project-myreads-starter)
- [Create React App](https://github.com/facebookincubator/create-react-app)
- [React Router](https://reacttraining.com/react-router/)