import React from 'react'
import {Container, NoteForm} from '../components/index'

function AddNote(){
    return (
        <div className='py-8 my-10'>
            <Container>
                <NoteForm />
            </Container>
        </div>
    )
}

export default AddNote

// AddNote.jsx or AddNotePage.jsx
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import appwriteService from '../appwrite/config';
// import NoteForm from '../components/NoteForm';

// export default function AddNote() {
//   const { slug } = useParams(); // slug is usually the note ID
//   const [note, setNote] = useState(null);
//   const [loading, setLoading] = useState(!!slug);

//   useEffect(() => {
//     if (slug) {
//       appwriteService.getNote(slug).then((fetchedNote) => {
//         setNote(fetchedNote);
//         setLoading(false);
//       });
//     }
//   }, [slug]);

//   if (loading) return <div className="text-center py-8">Loading...</div>;

//   return <NoteForm note={note} />;
// }
