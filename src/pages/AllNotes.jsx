import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import {NoteCard, Container} from '../components/index'

function AllNotes(){
    const [notes, setNotes] = useState([])

    useEffect(()=>{
        appwriteService.getAllNotes([]).then((notes)=>{
            if (notes){
                // console.log(notes)
                setNotes(notes.documents)
            }
        })
    }, [])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {notes.map((note)=>(
                        <div key={note.$id} className='p-2 w-1/4'>
                            <NoteCard 
                                $id={note.$id}
                                title={note.title}
                                coverImageId={note.coverImageId}
                                pricing={note.pricing}
                                price={note.price}
                                userName={note.userName}
                            />

                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllNotes
