import React, {useState, useEffect} from 'react'
import {Container, NoteForm} from '../components/index'
import appwriteService from '../appwrite/config'
import {useNavigate, useParams} from 'react-router-dom'

function EditNote(){
    const [note, setNote] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if (slug){
            appwriteService.getNote(slug).then((note)=>{
                if (note){
                    setNote(note)
                }
            })
        }
        else{
            navigate("/")
        }
    }, [slug, navigate])
    return (
        note? (
            <div className='py-8'>
                <Container>
                    <NoteForm note={note} />
                </Container>
            </div>
        ):null
    )
}

export default EditNote