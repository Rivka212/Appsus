const { useState, useEffect } = React


export function NoteAction({ note, onRemove }) {
    const [notes, setNotes] = useState([])

    function onDuplicate(event, note) {
        event.stopPropagation()
        // noteId !== params
        noteService.duplicate(note)
            .then((duplicatedNote) => {
                setNotes(prevNotes => [...prevNotes, duplicatedNote])
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('There was a problem')
            })
    }


return (
    <section className="action-note hidden">
        <img src={"../../../../img/more.png"} alt='' />
        <img src={"../../../../icons/download-file.png"} alt='' />
        <img src={"../../../../img/picture.png"} alt='' />
        <img src={"../../../../img/palette.png"} alt='' />
        {/* <img src={"../../../../icons/person_add.png"} alt='' /> */}
        <img src={"../../../../img/add_alert.png"} alt=''
            onClick={(event) => onDuplicate(event, note)} />
        <img src={"../../../../icons/remove.png"} alt=''
            onClick={(event) => onRemove(event, note.id)} />
    </section>

)
}