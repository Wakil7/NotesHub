import { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import AddNote from './AddNote';
import MyUploads from './MyUploads';
import MyDownloads from './MyDownloads';
import Statistics from './Statistics';
import Payments from './Payments';

export default function Dashboard() {
  const [selectedPage, setSelectedPage] = useState('add-note');

  const renderPage = () => {
    switch (selectedPage) {
      case 'add-note':
        return <AddNote />;
      case 'my-uploads':
        return <MyUploads />;
      case 'my-downloads':
        return <MyDownloads />;
      case 'statistics':
        return <Statistics />;
      case 'payments':
        return <Payments />;
      default:
        return <AddNote />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onSelectPage={setSelectedPage} />
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
        {renderPage()}
      </div>
    </div>
  );
}
