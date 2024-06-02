import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React


export function MailFilter({filterBy, onFilter}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])
 
    function handleChange({ target }) {
        const name = target.name
        const value = target.value
        setFilterByToEdit(prevFilterBy=> ({ ...prevFilterBy, [name]: value }))
    }
    return <React.Fragment>
        <div className="search-container">
            <span className="material-symbols-outlined search-icon">
                search
            </span>
            <input onChange={handleChange} value={filterByToEdit.txt} type="search" placeholder="Search mail" name="txt" />
        </div>
    </React.Fragment>
}