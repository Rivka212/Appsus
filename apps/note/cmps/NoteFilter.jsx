const { useState, useEffect } = React

export function NoteFilter({ filterBy, onFilter }) {
    const [filterByNote, setFilterByNote] = useState({ ...filterBy })

    useEffect(() => {
        onFilter(filterByNote)
    }, [filterByNote])

    function handleChange({ target }) {
        const { name, type } = target
        let value = target.value
        setFilterByNote(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    const { txt } = filterByNote
    return (
        <section className="note-filter">
            {/* <div> */}
                <input onChange={handleChange} value={txt} name="txt" type="text"
                    //  &#128269;    // placeholder={<span><i className="fa-solid fa-magnifying-glass"></i> Search</span>}
                    placeholder="Search" />
                {/* <img className="search" src="../../../../../img/magnifying-glass.png" alt="" /> */}
            {/* </div> */}
        </section>
    )
}