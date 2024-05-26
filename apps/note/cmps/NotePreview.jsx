const { useState, useEffect } = React

export function NotePreview({ note }) {

    return (
        <article className="note-preview" >
            {/* // <article className={`note-preview ${editClass}`} onClick={onClick}> */}
            <h3>{note.info.txt} </h3>
            <div className="action-note hidden">
                <i className="fa-solid fa-thumbtack" />
            </div>
            <h3>{note.info.title}</h3>
            <img src={`../assets/img/${note.info.url}.png`} alt='' />
            <section className="action-note hidden">
                <i className="fa-regular fa-image"></i>
                {/* <i className="fa-regular fa-user-plus"></i> */}
                <i className="fa-sharp fa-regular fa-bell" ></i>
                <img src="../../../assets/img/palette.png" alt='' />
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </section>
        </article>
    )

    // o <NoteTxt>
    // o <NoteImg>
    // o <NoteVideo>
    // o <NoteTodos>
}


