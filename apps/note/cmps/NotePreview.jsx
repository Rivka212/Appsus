export function NotePreview({note}){
console.log(note);

return (
    <article className="note-preview">
    <h3>{note.info.txt}</h3>
    <h3>{note.info.title}</h3>
    <img src={`../assets/img/${note.info.url}.png`} alt='' />
</article>
)

}