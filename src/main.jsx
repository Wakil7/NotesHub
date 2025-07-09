// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import React, {StrictMode} from 'react'
// import {createRoot} from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { Provider } from 'react-redux'
// import store from './store/store.js'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import { AuthLayout, Login } from './components/index.js'


// import Home from './pages/Home.jsx'
// import AddNote from "./pages/AddNote";
// import Signup from './pages/Signup'
// import EditNote from "./pages/EditNote";
// import Note from "./pages/Note";
// import AllNotes from "./pages/AllNotes";
// import MyNotes from "./pages/MyUploads.jsx";
// // import Downloads from "./pages/MyDownloads";
// import Dashboard from "./pages/Dashboard";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//         {
//             path: "/",
//             element: <Home />,
//         },
//         {
//             path: "/login",
//             element: (
//                 <AuthLayout authentication={false}>
//                     <Login />
//                 </AuthLayout>
//             ),
//         },
//         {
//             path: "/signup",
//             element: (
//                 <AuthLayout authentication={false}>
//                     <Signup />
//                 </AuthLayout>
//             ),
//         },
//         // {
//         //     path: "/all-notes",
//         //     element: (
//         //         <AuthLayout authentication>
//         //             {" "}
//         //             <AllNotes />
//         //         </AuthLayout>
//         //     ),
//         // },
//         // {
//         //     path: "/add-note",
//         //     element: (
//         //         <AuthLayout authentication>
//         //             {" "}
//         //             <AddNote />
//         //         </AuthLayout>
//         //     ),
//         // },
//         // {
//         //     path: "/my-notes",
//         //     element: (
//         //         <AuthLayout authentication>
//         //             {" "}
//         //             <MyNotes />
//         //         </AuthLayout>
//         //     )
//         // },
//         // {
//         //     path: "/my-downloads",
//         //     element: (
//         //         <AuthLayout authentication>
//         //             {" "}
//         //             <Downloads />
//         //         </AuthLayout>
//         //     )
//         // },
//         {
//             path: "/edit-note/:slug",
//             element: (
//                 <AuthLayout authentication>
//                     {" "}
//                     <EditNote />
//                 </AuthLayout>
//             ),
//         },
//         {
//             path: "/note/:slug",
//             element: <Note />,
//         },
//         {
//             path: "/dashboard",
//             element: (
//                 <AuthLayout authentication>
//                     {" "}
//                     <Dashboard />
//                 </AuthLayout>
//             )
//         }
//     ],
// },
// ])


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store = {store}>
//       <RouterProvider router={router}/>
//     </Provider>

//   </StrictMode>
// )

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';

import App from './App.jsx';
import './index.css';

import { AuthLayout, Login } from './components/index.js';

import Home from './pages/Home.jsx';
import AddNote from './pages/AddNote.jsx';
import Signup from './pages/Signup.jsx';
import EditNote from './pages/EditNote.jsx';
import Note from './pages/Note.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MyUploads from './pages/MyUploads.jsx';
import PurchaseHistory from './pages/PurchaseHistory.jsx';
import Statistics from './pages/Statistics.jsx';
import Payments from './pages/Payments.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-note/:slug',
        element: (
          <AuthLayout authentication>
            <EditNote />
          </AuthLayout>
        ),
      },
      {
        path: '/note/:slug',
        element: <Note />,
      },
      {
        path: '/dashboard',
        element: (
          <AuthLayout authentication>
            <Dashboard />
          </AuthLayout>
        ),
        children: [
          {
            path: 'add-note',
            element: <AddNote />,
          },
          {
            path: 'edit-note/:slug',
            element: <EditNote />, // ✅ this is your new edit route
          },
          {
            path: 'my-uploads',
            element: <MyUploads />,
          },
          {
            path: 'purchase-history',
            element: <PurchaseHistory />,
          },
          {
            path: 'statistics',
            element: <Statistics />,
          },
          {
            path: 'payments',
            element: <Payments />,
          },
          {
            index: true,
            element: <AddNote />, // Default fallback route inside dashboard
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);



