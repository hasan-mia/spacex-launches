## Project Description and feature

LIVE [https://spacexlunch.vercel.app/](https://spacexlunch.vercel.app)

1. React Project with TypeScript
2. Use Context, Hooks, Routing(React router dom v6), and Functional Component
3. Use the following SpaceX Launch API: https://api.spacexdata.com/v3/launches
4. Use Bootstrap 5
5. Make the UI responsive as described in Figma file
6. Avoid writing extra CSS classes.
7. Search By Rocket Name.
8. Filters data by
   A. By Launch Date
   i. Last Week
   ii. Last Month
   iii. Last Year
   B. By Launch Status ( Failure, Success )
9. All upcoming
10. Add pagination which shows per page 9 items. If the user reloads the page then
    show the list according to the page number.

## Folder and File Stracture

```bash
__index.ts (server index file)
______public
______src
_________app.tsx
_________index.tsx
_________index.css
_________assets ( extra file like image)
_________components ( extra file like image)
_______________card ( launch card component)
_______________footer ( footer component)
_______________header ( header component)
_______________paginate ( pagination component functionality)
_______________search ( search component and functionality)
_________layouts ( common layout)
_________pages ( extra file like image)
_______________Home.tsx ( Home page)
_______________NotFound.tsx  ( 404! error page)
_________routes ( All routes)
_________store ( react context state management)
____________api ( axios funcationality for fetching data)
_______________api.ts ( fetch launch data)
_______________LaunchContext.tsx (  LaunchContext Provider)
_________types ( common data type folder )
____________image.png.d.ts ( image type)

```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
