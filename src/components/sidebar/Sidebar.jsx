// import { NavLink } from 'react-router-dom'
// import { FilePlus, Upload, Download, BarChart2, CreditCard } from 'lucide-react'

// const menuItems = [
//   { name: 'Add Note', icon: <FilePlus size={20} />, to: '/add-note' },
//   { name: 'My Uploads', icon: <Upload size={20} />, to: '/my-uploads' },
//   { name: 'My Downloads', icon: <Download size={20} />, to: '/my-downloads' },
//   { name: 'Statistics', icon: <BarChart2 size={20} />, to: '/statistics' },
//   { name: 'Payments', icon: <CreditCard size={20} />, to: '/payments' }
// ]

// export default function Sidebar() {
//   return (
//     <div className="w-64 h-screen bg-gray-900 text-white p-4">
//       <h1 className="text-2xl font-bold mb-8">NotesHub</h1>
//       <ul className="space-y-4">
//         {menuItems.map(item => (
//           <li key={item.name}>
//             <NavLink
//               to={item.to}
//               className={({ isActive }) =>
//                 `flex items-center space-x-3 p-2 rounded-lg ${
//                   isActive ? 'bg-gray-700' : 'hover:bg-gray-800'
//                 }`
//               }
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

import {
  FilePlus,
  UploadCloud,
  DownloadCloud,
  BarChart2,
  CreditCard,
} from 'lucide-react';

export default function Sidebar({ onSelectPage }) {
  const navItems = [
    { id: 'add-note', label: 'Add Note', icon: <FilePlus size={20} /> },
    { id: 'my-uploads', label: 'My Uploads', icon: <UploadCloud size={20} /> },
    { id: 'my-downloads', label: 'My Downloads', icon: <DownloadCloud size={20} /> },
    { id: 'statistics', label: 'Statistics', icon: <BarChart2 size={20} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">NotesHub</h2>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectPage(item.id)}
            className="flex items-center gap-3 text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
