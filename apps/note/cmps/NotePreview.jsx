const { useState, useEffect } = React

export function NotePreview({ note }) {
    // , onClick
    const [isSelected, setIsSelected] = useState(false)
    // console.log('onClick', onClick)
    // const isEditable = typeof onClick === 'function'
    // const editClass = isEditable ? 'edit' : ''
    // const handleClick = () => {
    //     setIsSelected(!isSelected);
    //     onClick(note);
    // }

    return (
        <article className={`note-preview ${isSelected ? 'selected' : ''}`} >
                {/* // <article className={`note-preview ${isSelected ? 'selected' : ''}`} onClick={handleClick}> */}

            <i className="fa-solid fa-thumbtack hidden" />
            {/* // <article className={`note-preview ${editClass}`} onClick={onClick}> */}
            <h3>{note.info.txt}</h3>
            <h3>{note.info.title}</h3>
            <img src={`../assets/img/${note.info.url}.png`} alt='' />
            <section className="action-note hidden">
                <i className="fa-solid fa-ellipsis-vertical"></i>
                <i className="fa-regular fa-image"></i>
                {/* <i className="fa-regular fa-user-plus"></i> */}
                <i className="fa-regular fa-bell-plus"></i>
                <img src="../assets/img/palette.png" alt='' />
            </section>
        </article>
    )

}

{/* // export function NotePreview({ note, onClick }) { */ }
{/* //         <article className="note-preview" onClick={() => onClick(note)}> */ }




