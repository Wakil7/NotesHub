import { Pencil, Trash2, Download, Star } from 'lucide-react';

export default function NoteInfo({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-5 w-full hover:shadow-md transition">
      
      {/* Cover Image */}
      <div className="w-28 h-36 rounded-lg overflow-hidden border bg-gray-100">
        <img
          src={note.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Note Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>

        <div className="mt-1 text-sm text-gray-600">
          <p className="mb-1">Uploaded on: <span className="text-gray-700 font-medium">{note.uploadDate}</span></p>
          <div className="flex items-center gap-4 mt-1">
            <span className="flex items-center gap-1">
              <Download size={16} /> {note.totalDownloads}
            </span>
            <span className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500" /> {note.rating} / 5
            </span>
            <span className="flex items-center gap-1">
              💰 {note.price === 0 ? 'Free' : `₹${note.price}`}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onEdit(note)}
          className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          <Pencil size={16} /> Edit
        </button>
        <button
          onClick={() => onDelete(note)}
          className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
