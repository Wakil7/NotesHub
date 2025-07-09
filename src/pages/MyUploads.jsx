import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import {NoteInfo, Container} from '../components/index'
import { useSelector } from 'react-redux'

function MyUploads(){
    const [notes, setNotes] = useState([])
    const userData = useSelector((state) => state.auth.userData);

    useEffect(()=>{
        appwriteService.getNotesByUser(userData.$id).then((notes)=>{
            if (notes){
                // console.log(notes)
                setNotes(notes.documents)
            }
        })
    }, [])
    return (
        <div className='w-full py-8 my-10'>
            <Container>
                <div className='flex flex-wrap'>
                    {notes.map((note)=>(
                        <div key={note.$id} className='p-2 w-full'>
                            <NoteInfo 
                                $id={note.$id}
                                title={note.title}
                                coverImageId={note.coverImageId}
                                pricing={note.pricing}
                                price={note.price}
                                uploadDate={note.$createdAt}
                                updateDate={note.$updatedAt}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default MyUploads