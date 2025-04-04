import React,{ StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import './index.css'
// import  from "react-dom/client";
import {Provider} from "react-redux";
import store from "./store/store.js";
import App from './App.jsx'
import {createBrowserRouter,Route, RouterProvider} from 'react-router-dom'
import Home_Page from './pages/home_page/Home_Page.jsx'
import LikedVideo_Page from './pages/likedVideo_page/LikedVideo_page.jsx'
import WatchHistory_Page from './pages/watchHistory_page/WatchHistory_Page.jsx'
import WatchLater_Page from './pages/watchLater_page/WatchLater_Page.jsx'
import YourVideo_Page from './pages/yourVideo_page/YourVideo_Page.jsx'
import You_Page from './pages/you_page/You_Page.jsx'
import Channel_Page from './pages/channel_page/Channel_Page.jsx';
import Login_page from './pages/login_page/Login_Page.jsx';
import Signup_Page from './pages/signup_page/Signup_Page.jsx';
import VideoUploadAndEdit_Page from './pages/video_upload_and_edit_page/VideoUploadAndEdit_Page.jsx';
import Playlist_Page from './pages/playlist_page/Playlist_Page.jsx';
import PlayVideo_Page from './pages/playVideo_page/PlayVideo_Page.jsx';





const router=createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>,
      children:[
        {
          path:'/',
          element:<Home_Page/>,
        },
        {
          path:'/you',
          element:<You_Page/>,
        },
        {
          path:'/likedVideos',
          element:<LikedVideo_Page/>,
        },
        {
          path:'/watchLater',
          element:<WatchLater_Page/>,
        },
        {
          path:'/watchHistory',
          element:<WatchHistory_Page/>,
        },
        {
          path:'/playlist',
          element:<Playlist_Page/>,
        },
        {
          path:'/yourVideo',
          element:<YourVideo_Page/>,
        },
        {
          path:'/yourChannel',
          element:<Channel_Page/>,
        },
        {
          path:'/signup',
          element:<Signup_Page/>,
        },
        {
          path:'/login',
          element:<Login_page/>,
        },
        {
          path:'/uploadAndEdit',
          element:<VideoUploadAndEdit_Page/>,
        },
        {
          path:'/playVideo',
          element:<PlayVideo_Page/>,
        },
       


      ]
    }
  ]
)


console.log("Redux Store:", store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
   <RouterProvider router={router}/>

{/* <App /> */}
   </Provider>
  </StrictMode>,
)













/**
 * 1. BrowserRouter (Traditional React Router)
✅ Used when you want to define routes inside your components.
✅ Uses the <Routes> and <Route> components for defining paths.
✅ Automatically manages browser history using the History API.

Example Usage (Traditional BrowserRouter)
jsx
Copy
Edit
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
When to Use?
If you're defining routes inside your component tree using <Routes> and <Route>.
When you don’t need advanced routing features like loaders, actions, or data fetching.
2. createBrowserRouter (Newer Data-Driven Routing)
✅ Used for defining routes outside the component tree using a router object.
✅ Supports data fetching (loader), form submissions (action), and error handling (errorElement).
✅ Works with RouterProvider instead of <BrowserRouter>.

Example Usage (createBrowserRouter with RouterProvider)
jsx
Copy
Edit
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import NotFound from "./NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
When to Use?
If you need data-driven routing with loader, action, and errorElement.
When defining routes outside of the component tree in a separate configuration.
If you want better performance optimizations like lazy loading and server-side fetching.
Key Differences
Feature	BrowserRouter	createBrowserRouter
Route Definition	Inside JSX (<Routes>, <Route>)	Outside component tree using an array of route objects
Data Fetching	Manual (useEffect)	Built-in (loader)
Form Handling	Manual (onSubmit, useEffect)	Built-in (action)
Error Handling	Manual (useState)	Built-in (errorElement)
Uses <RouterProvider>?	❌ No	✅ Yes
Which One Should You Use?
✅ Use BrowserRouter if your app is simple and doesn’t need data fetching or form handling inside routes.
✅ Use createBrowserRouter if you want React Router’s built-in data fetching, form handling, and error management.
 */

/**
 * What is RouterProvider in React Router v6?
RouterProvider is a new API introduced in React Router v6.4 that works with createBrowserRouter. It provides a centralized way to manage routing with features like data fetching (loader), form handling (action), and error handling (errorElement).

How Does RouterProvider Work?
Instead of wrapping your app with <BrowserRouter>, you define your routes using createBrowserRouter and pass the router to <RouterProvider>.

Example Usage
jsx
Copy
Edit
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import NotFound from "./NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
🚀 This eliminates the need for <BrowserRouter>, <Routes>, and <Route> inside your component tree.

Why Use RouterProvider?
✅ Better Performance → Supports lazy loading, so components are only loaded when needed.
✅ Built-in Data Fetching (loader) → Fetch data before rendering a page.
✅ Form Handling (action) → Handles form submissions without extra state management.
✅ Error Handling (errorElement) → Built-in error handling for routes.

Advanced Example with loader, action, and errorElement
jsx
Copy
Edit
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: async () => {
      // Fetch data before rendering
      const response = await fetch("https://api.example.com/home");
      return response.json();
    },
    errorElement: <div>Error loading home page</div>,
  },
  {
    path: "/contact",
    element: <Contact />,
    action: async ({ request }) => {
      // Handle form submission
      const formData = await request.formData();
      return fetch("/send-message", {
        method: "POST",
        body: formData,
      });
    },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
Key Differences: BrowserRouter vs. RouterProvider
Feature	BrowserRouter	RouterProvider
Route Management	Uses <Routes> & <Route> inside components	Uses a router object (createBrowserRouter)
Data Fetching	Requires useEffect	Built-in with loader
Form Handling	Manual (onSubmit & state)	Built-in with action
Error Handling	Manual (useState)	Built-in with errorElement
Lazy Loading	Manual (React.lazy())	Built-in with import()
When Should You Use RouterProvider?
✅ If you need built-in data fetching, form handling, and error management.
✅ If you want better performance with lazy loading.
✅ If you prefer cleaner and centralized route definitions outside your component tree.

When to Stick with BrowserRouter?
🔹 If you're working on a simple app that doesn’t require loaders or actions.
🔹 If you’re migrating from React Router v5 and don’t want to refactor everything.

For new projects, it's recommended to use RouterProvider with createBrowserRouter. 🚀
 */