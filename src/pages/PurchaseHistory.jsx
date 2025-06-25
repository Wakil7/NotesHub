import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import {PurchaseInfo, Container} from '../components/index'
import { useSelector } from 'react-redux'

function PurchaseHistory(){
    const [notes, setNotes] = useState([])
    const userData = useSelector((state) => state.auth.userData);

    useEffect(()=>{
        appwriteService.getUserDownloadedNotes(userData.$id).then((notes)=>{
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
                        <div key={note.$id} className='p-2 w-full'>
                            <PurchaseInfo 
                                $id={note.$id}
                                title={note.title}
                                coverImageId={note.coverImageId}
                                pricing={note.pricing}
                                price={note.price}
                                pdfId={note.pdfId}
                                uploaderName={note.userName}
                                userId={note.userId}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default PurchaseHistory