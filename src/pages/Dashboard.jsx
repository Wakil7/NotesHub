// // // Dashboard.jsx
// // import { Routes, Route } from 'react-router-dom';
// // import Sidebar from '../components/sidebar/Sidebar';
// // import AddNote from './AddNote';
// // import MyUploads from './MyUploads';
// // import PurchaseHistory from './PurchaseHistory';
// // import Statistics from './Statistics';
// // import Payments from './Payments';

// // export default function Dashboard() {
// //   return (
// //     <div className="flex">
// //       <Sidebar />
// //       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
// //         <Routes>
// //           <Route path="add-note" element={<AddNote />} />
// //           <Route path="my-uploads" element={<MyUploads />} />
// //           <Route path="my-downloads" element={<PurchaseHistory />} />
// //           <Route path="statistics" element={<Statistics />} />
// //           <Route path="payments" element={<Payments />} />
// //         </Routes>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState } from 'react';
// import Sidebar from '../components/sidebar/Sidebar';
// import AddNote from './AddNote';
// import MyUploads from './MyUploads';
// import PurchaseHistory from './PurchaseHistory';
// import Statistics from './Statistics';
// import Payments from './Payments';

// export default function Dashboard() {
//   const [selectedPage, setSelectedPage] = useState('add-note');

//   const renderPage = () => {
//     switch (selectedPage) {
//       case 'add-note':
//         return <AddNote />;
//       case 'my-uploads':
//         return <MyUploads />;
//       case 'purchase-history':
//         return <PurchaseHistory />;
//       case 'statistics':
//         return <Statistics />;
//       case 'payments':
//         return <Payments />;
//       default:
//         return <AddNote />;
//     }
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar onSelectPage={setSelectedPage} selectedPage={selectedPage} />
//       <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
//         {renderPage()}
//       </div>
//     </div>
//   );
// }


import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}
