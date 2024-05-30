const { useState } = React
import { ComposeList } from './ComposeList.jsx'

export function ComposeBtn({ setNewMail, isOpen }) {
    const [isClicked, setIsClicked] = useState(false)

    function openModal() {
        setIsClicked(true)
    }

    function closeModal() {
        setIsClicked(false)
    }
    return <div className={`compose-btn-container ${isOpen ? 'open' : 'collapsed'}`}>
        <button className="compose-btn" onClick={openModal}>
            <img src="../../../../icons/compose.png" />
            <span>Compose</span>
            </button>
        {isClicked && (<ComposeList closeModal={closeModal} setNewMail={setNewMail} />)}
    </div>

}