const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { NoteHeader } from './NoteHeader.jsx'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx';
import { NoteEdit } from "../cmps/NoteEdit.jsx";
import { NoteSideBar } from "../cmps/NoteSideBar.jsx";


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [newNote, setNewNote] = useState()

    const [searchParams, setSearchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))
    // const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    // const [filterByToTxt, setFilterByToTxt] = useState(noteService.getFilterFromSearchParams(searchParams))
    const [filterBy, setFilterBy] = useState({ status: 'notes', txt: '' })

    const [criteria, setCriteria] = useState({ status: 'notes' })
    const { status } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
            .catch(() => setNotes([]));
    }, [filterBy, setSearchParams]);

    useEffect(() => {
        const filterFromSearchParams = noteService.getFilterFromSearchParams(searchParams);
        const defaultFilter = noteService.getDefaultFilter(filterFromSearchParams);
        setFilterBy(defaultFilter)
    }, [searchParams])


    useEffect(() => {
        if (newNote) {

        }
    })

    useEffect(() => {
        noteService.query(criteria)
            .then(setNotes)
            .catch(() => setNotes([]))
    }, [criteria])

    useEffect(() => {
        if (status) {
            setCriteria(prevCriteria => ({ ...prevCriteria, status }))
        }
    }, [status])

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    function handleChange(status) {
        console.log(status)
        navigate(`/note/${status}`)
    }
    // console.log(status);


    function removeNote(ev, noteId) {
        // noteId !== params
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('There was a problem')
            })
    }


    function handleSetNotePinned(noteId, isPinned) {
        const updatedNotes = noteService.query()
        console.log(updatedNotes)
            .then(() => {
                setNotes(updatedNotes)
                console.log(updatedNotes)
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('There was a problem')
            })
    }

    function handleNoteClick(noteId) {
        console.log('noteId', noteId);
        setSelectedNote(noteId)
    }

    function handleCloseModal() {
        setSelectedNote(null)
    }


    function handleNoteChange(noteId, changeType, change) {
        console.log(noteId);
        if (changeType === 'duplicate') {
            noteService.duplicate(noteId)
                .then((duplicatedNote) => {
                    setNotes(prevNotes => [...prevNotes, duplicatedNote])
                })
                .catch(err => {
                    console.log('err:', err)
                    // showErrorMsg('There was a problem')
                })
        } else if (changeType === 'getImg') {
            noteService.updateNoteWithImage(noteId, change)
                .then((change) => {
                    getNoteImg(noteId, change)
                        .then((updatedNote) => {
                            setNotes(prevNotes => [...prevNotes, updatedNote])
                        })
                    console.log('Note updated with image:', updatedNote)
                })
                .catch((error) => {
                    console.error('Error updating note with image:', error)
                })
        } else if (changeType === 'color') {
            noteService.colorStyle(noteId, change)
                .then((updatedNoteColor) => {
                    console.log(updatedNoteColor)
                    setNotes(prevNotes => {
                        return prevNotes.map(prevNote => {
                            if (prevNote.id === noteId) {
                                return { ...prevNote, ...updatedNoteColor }
                            }
                            return prevNote;
                        })
                    })
                })
        } else if (changeType === 'archive') {
            noteService.getArchive(noteId)
                .then(() => {
                    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                })
                .catch(err => {
                    console.log('err:', err)
                    // showErrorMsg('There was a problem')
                })
        }
    }

    function addNote(noteId) {
        setNotes(prevNotes => prevNotes.push(note => note.id === noteId))
    }

    function editNote(note){
        setNotes(prevNotes => {
            return prevNotes.map(prevNote => {
                if (prevNote.id === note.id) {
                    return { ...prevNote, ...note }
                }
                return prevNote
            })})

    }

    return <section>
        <NoteHeader notes={notes} filterBy={filterBy} onFilter={onSetFilterBy} />
        <section className="main-container-note">
            <NoteSideBar onChange={handleChange} status={status} />
            <main>
                <NoteAdd noteId={selectedNote} onAddNote={addNote}/>
                <NoteList notes={notes} onRemove={removeNote} onSetNotePinned={handleSetNotePinned}
                    onNoteClick={handleNoteClick} onNoteChange={handleNoteChange} />
            </main>
        </section>
        {selectedNote && (
            <NoteEdit
                noteId={selectedNote}
                onClose={handleCloseModal}
                onEditNote={editNote}
            />
        )}
    </section>
}


