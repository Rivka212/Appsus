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
    getDefaultFilter,
    getEmptyNote,
    getNoteById,
    createTeams,
    getSortByPinned,
    movePinnedNoteToTop,
}

function query() {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            const sortedNotes = getSortByPinned(notes)
            return sortedNotes
        })
}
// function query() {
//     return storageService.query(NOTE_KEY)
//         .then(notes => {
//             getSortByPinned()
//             return notes
//         })
// }
            // if (filterBy.title) {
            //     const regExp = new RegExp(filterBy.title, 'i')
            //     notes = notes.filter(note => regExp.test(note.title))
            // }
            // if (filterBy.minAmount) {
            //     notes = notes.filter(note => note.listPrice.amount >= filterBy.minAmount)
            // }



function getDefaultFilter(filterBy = { title: '', minAmount: 0 }) {
    return { title: filterBy.title, minAmount: filterBy.minAmount }
}
// function getFilterBy() {
//     return {
//         title: '',
//         minPrice: '',
//         maxPrice: '',
//     }
// }

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
        }
    }
}

// info: {
//     title: '',
//     txt: ''
// }

function getSortByPinned(notes) {
    const pinnedNotes = notes.filter(note => note.isPinned)
    const unpinnedNotes = notes.filter(note => !note.isPinned)

    const sortedNotes = [...pinnedNotes, ...unpinnedNotes]
    return sortedNotes
}

function movePinnedNoteToTop(noteId) {
    const noteToMove = notes.find(note => note.id === noteId)
    if (noteToMove && noteToMove.isPinned) {
        const updatedNotes = notes.filter(note => note.id !== noteId)
        updatedNotes.unshift(noteToMove)
        return updatedNotes
    }
    return notes
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


function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
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
                    txt: 'Fullstack Me Baby!'
                }
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
                }
            },
            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            },
            {
                id: 'n104',
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#F39F76'
                },
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
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
                }
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
                }
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
                }
            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}


function _loadNotesFromStorage() {
    return storageService.loadFromStorage(NOTE_KEY)
}