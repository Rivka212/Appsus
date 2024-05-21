

export function NoteHeader() {


    return <section className="note-header">
        <div className="header-action">
            <i className="fas fa-cog" />
            <i className="fa-solid fa-rotate-right" />
        </div>
         <div className="note-logo">
            <h1>Keep</h1>
            <img src="img/note.png" alt="" />
            <i className="fa-solid fa-bars" />
        </div>
    </section>
}