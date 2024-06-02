// note service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()


export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getNoteById,
    createTeams,
    getSortByPinned,
    // movePinnedNoteToTop,
    getFilterStatus,
    duplicate,
    colorStyle,
    updateNotePinnedStatus,
    getDefaultFilter,
    getFilterFromSearchParams,
    updatedTodoNote,
    getNoteImg,
}

function query(filterBy = { status: 'notes', txt: '' }) {
    // console.log(filterBy, 'filterBy');
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.status === 'notes' || !filterBy.status) {
                notes = notes.filter(note => !note.isTrashed)
                notes = getSortByPinned(notes)
                // console.log(notes);
            } else if (filterBy.status === 'trash') {
                notes = notes.filter(note => note.isTrashed)
            }
            if (filterBy.txt) {

                console.log(filterBy.txt);
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.info.txt))
                // console.log(note.info.txt);
                console.log(notes);
            }
            return notes
        })
}


function getDefaultFilter(filterBy = { status: 'notes', txt: '' }) {
    console.log(filterBy);
    return {
        status: filterBy.status || 'notes',
        txt: filterBy.txt || '',
    }
}

function getFilterFromSearchParams(searchParams) {
    return {
        // status,
        txt: searchParams.get('txt') || '',
    }
    // getDefaultFilter(filterBy)
}

function getFilterStatus(notes, filterBy = { status: 'notes', txt: '' }) {
    console.log(filterBy);
    if (filterBy.status === 'trash') {
        notes = notes.filter(note => note.isTrashed)
    }
    if (filterBy.txt) {
        notes = notes.filter(note => note.info.txt)
    }
    return Promise.resolve({ status: filterBy.status || 'notes', txt: filterBy.txt || '' })
}


function getEmptyNote(title = '', txt = '') {
    return {
        createdAt: new Date().toISOString().slice(0, 10),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#ffffff'
        },
        info: {
            title: title,
            txt: txt
        },
        isTrashed: false,
        trashDate: '',
    }
}

function getSortByPinned(notes) {
    const pinnedNotes = notes.filter(note => note.isPinned)
    const unpinnedNotes = notes.filter(note => !note.isPinned)

    const sortedNotes = [...pinnedNotes, ...unpinnedNotes]
    // const sortedNotes =[ {...pinnedNotes}, {...unpinnedNotes}]

    return sortedNotes
}


function getNoteById(noteId) {
    const notes = _loadNotesFromStorage()
    const note = notes.find((note) => note.id === noteId)
    return Promise.resolve(note)
}



function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => {
            // note = _setNextPrevnoteId(note)
            return note
        })
}

function updateNotePinnedStatus(noteId, newIsPinned) {
    console.log(noteId, 'noteId');
    const notes = _loadNotesFromStorage()
    const note = notes.find((note) => note.id === noteId)
    if (note) {
        const updatedNote = { ...note, isPinned: newIsPinned }
        save(updatedNote)
        // return Promise.resolve(updatedNote)
    }
}


// function movePinnedNoteToTop(noteId) {
//     const noteToMove = notes.find(note => note.id === noteId)
//     if (noteToMove && noteToMove.isPinned) {
//         const updatedNotes = notes.filter(note => note.id !== noteId)
//         updatedNotes.unshift(noteToMove)
//         return updatedNotes
//     }
//   return new Promise.resolve(notes)
// }


function getNoteImg(noteId, imageDataURL){
    const notes = _loadNotesFromStorage()
    const note = notes.find((note) => note.id === noteId)
    if (note) {
        // info: {
        //     url: 'http://some-img/me',
        const updatedImgNote = { ...note, info:imageDataURL }
        save(updatedImgNote)
        return Promise.resolve(updatedImgNote)
    } else {
        return Promise.reject("Note not found")
    }
}



function duplicate(noteCopy) {
    const notes = _loadNotesFromStorage()
    const note = notes.find((note) => note.id === noteCopy.id)
    if (note) {
        const duplicatedNote = { ...note, id: '' }
        save(duplicatedNote)
        return Promise.resolve(duplicatedNote)
    } else {
        return Promise.reject("Note not found")
    }
}
// note = storageService.find(NOTE_KEY, noteId)

function updatedTodoNote(noteId, newTodo) {
    console.log(noteId, newTodo);
    const notes = _loadNotesFromStorage()
    const note = notes.find((note) => note.id === noteId)
    if (note) {
        const updatedNote = { ...note, info: newTodo }
        console.log(updatedNote);
        save(updatedNote)
        return Promise.resolve(updatedNote)
    } else {
        return Promise.reject("Note not found")
    }
}




function colorStyle(noteId, newColor) {
    console.log(newColor, noteId);
    const notes = _loadNotesFromStorage()
    const note = notes.find((note) => note.id === noteId)
    if (note) {
        const updatedNote = { ...note, style: newColor }
        console.log(updatedNote);
        save(updatedNote)
        return Promise.resolve(updatedNote)
    } else {
        return Promise.reject("Note not found")
    }
}


function remove(noteId) {
    const notes = _loadNotesFromStorage()
    const note = notes.find((note) => note.id === noteId)
    if (note) {
        note.isTrashed = true
        note.trashDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        query()
        save(note)
    }
    return Promise.resolve(note)
    // return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function createTeams() {
    const teams = [
        { type: 'notes', icon: '../../../../icons/light-bulb.png' },
        { type: 'reminders', icon: '../../../../icons/bell.png' },
        { type: 'categories', icon: '../../../../icons/categories.png' },
        { type: 'edit labels', icon: '/../../../icons/compose.png' },
        { type: 'archive', icon: '../../../../icons/download-file.png' },
        { type: 'trash', icon: '../../../../icons/trash.png' }
    ]
    return teams
}



function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        const notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#F39F76'
                },
                info: {
                    txt: 'Fullstack is life!'
                },
                isTrashed: true,
                trashDate: '',

            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#B4DDD3'
                },
                info: {
                    url: 'http://some-img/me',
                    // url:'img/flower.png',
                    title: 'Bobi and Me'
                },
                isTrashed: false,
                trashDate: '',
            },
            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#B4DDD3'
                },
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                },
                isTrashed: false,
                trashDate: '',
            },
            {
                id: 'n104',
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#F39F76'
                },
                info: {
                    title: 'Must do',
                    todos: [
                        { txt: 'Finish reading the book', doneAt: null },
                        { txt: 'Go shopping', doneAt: 187111111 },
                        { txt: 'Take the dog for a walk', doneAt: null },
                        { txt: 'Wash the car', doneAt: 187111111 },
                    ]
                },
                isTrashed: false,
                trashDate: '',
            },
            {
                id: 'n105',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#EFEFF1'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                },
                isTrashed: false,
                trashDate: '',
            },
            {
                id: 'n106',
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#F6E2DD'

                },
                info: {
                    url: 'http://some-img/me',
                    // url:'img/flower.png',
                    title: 'Bobi and Me'
                },
                isTrashed: false,
                trashDate: '',
            },
            {
                id: 'n107',
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#E9E3D4'
                },
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                },
                isTrashed: true,
                trashDate: '',
            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}


function _loadNotesFromStorage() {
    // return storageService.loadFromStorage(NOTE_KEY)
    return utilService.loadFromStorage(NOTE_KEY)
}
