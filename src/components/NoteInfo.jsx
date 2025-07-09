// import { useEffect, useState } from 'react';
// import { Pencil, Trash2, Download, Star } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import appwriteService from '../appwrite/config';

// export default function NoteInfo({ $id, title, coverImageId, pricing, price, uploadDate, updateDate, onDelete }) {
//   const [downloads, setDownloads] = useState(0);
//   const [rating, setRating] = useState(0);

//   const navigate = useNavigate();

//   const handleEdit = () => {
//     navigate(`/dashboard/edit-note/${$id}`);
//   };

//   useEffect(() => {
//     appwriteService.getTotalDownloadsCount($id).then(setDownloads);
//     appwriteService.getAverageRating($id).then((val) => setRating(parseFloat(val).toFixed(1)));
//   }, [$id]);

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-5 w-full hover:shadow-md transition">
//       {/* Cover Image */}
//       <div className="w-48 aspect-[16/9] rounded-lg overflow-hidden border bg-gray-100">
//         <img
//           src={appwriteService.getFileView(coverImageId)}
//           alt="Cover"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Note Info */}
//       <div className="flex-1">
//         <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

//         <div className="mt-1 text-sm text-gray-600">
//           <p className="mb-1">Uploaded on: <span className="text-gray-700 font-medium">{new Date(uploadDate).toLocaleString()}</span></p>
//           <p className="mb-1">Updated on: <span className="text-gray-700 font-medium">{new Date(updateDate).toLocaleString()}</span></p>
//           <div className="flex items-center gap-4 mt-1">
//             <span className="flex items-center gap-1">
//               <Download size={16} /> {downloads}
//             </span>
//             <span className="flex items-center gap-1">
//               <Star size={16} className="text-yellow-500" /> {(rating === "NaN") ? 0 : rating} / 5
//             </span>
//             <span className="flex items-center gap-1">
//               💰 {pricing === 'Free' ? 'Free' : `₹${price}`}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex flex-col gap-2">
//         <button
//           onClick={() => handleEdit($id)}
//           className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
//         >
//           <Pencil size={16} /> Edit
//         </button>
//         <button
//           onClick={() => onDelete($id)}
//           className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
//         >
//           <Trash2 size={16} /> Delete
//         </button>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { Pencil, Trash2, Download, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';

export default function NoteInfo({ $id, title, coverImageId, pricing, price, uploadDate, updateDate }) {
  const [downloads, setDownloads] = useState(0);
  const [rating, setRating] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dashboard/edit-note/${$id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      const note = await appwriteService.getNote($id); // assuming getNote fetches full doc
      if (note.coverImageId) await appwriteService.deleteFile(note.coverImageId);
      if (note.pdfId) await appwriteService.deleteFile(note.pdfId);
      await appwriteService.deleteNote($id);
      setIsDeleted(true); // hide from UI
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete note");
    }
  };

  useEffect(() => {
    appwriteService.getTotalDownloadsCount($id).then(setDownloads);
    appwriteService.getAverageRating($id).then((val) =>
      setRating(parseFloat(val).toFixed(1))
    );
  }, [$id]);

  if (isDeleted) return null; // don't render deleted note

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-5 w-full hover:shadow-md transition">
      <div className="w-48 aspect-[16/9] rounded-lg overflow-hidden border bg-gray-100">
        <img
          src={appwriteService.getFileView(coverImageId)}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        <div className="mt-1 text-sm text-gray-600">
          <p className="mb-1">Uploaded on: <span className="text-gray-700 font-medium">{new Date(uploadDate).toLocaleString()}</span></p>
          <p className="mb-1">Updated on: <span className="text-gray-700 font-medium">{new Date(updateDate).toLocaleString()}</span></p>
          <div className="flex items-center gap-4 mt-1">
            <span className="flex items-center gap-1">
              <Download size={16} /> {downloads}
            </span>
            <span className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500" /> {(rating === "NaN") ? 0 : rating} / 5
            </span>
            <span className="flex items-center gap-1">
              💰 {pricing === 'Free' ? 'Free' : `₹${price}`}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          <Pencil size={16} /> Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
