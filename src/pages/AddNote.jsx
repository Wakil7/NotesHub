import React from 'react'
import {Container, NoteForm} from '../components/index'

function AddNote(){
    return (
        <div className='py-8'>
            <Container>
                <NoteForm />
            </Container>
        </div>
    )
}

export default AddNote

