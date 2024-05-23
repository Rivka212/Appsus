export function NotePreview({note, onClick}){

    console.log('onClick', onClick);
    const isEditable = typeof onClick === 'function'
    const editClass = isEditable ? 'edit' : ''

return (
    <article className={`note-preview ${editClass}`} onClick={onClick}>
    <h3>{note.info.txt}</h3>
    <h3>{note.info.title}</h3>
    <img src={`../assets/img/${note.info.url}.png`} alt='' />
</article>
)

}

// export function NotePreview({ note, onClick }) {
//     return (
//         <article className="note-preview" onClick={() => onClick(note)}>
