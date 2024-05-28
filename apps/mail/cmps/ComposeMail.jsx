const {useState} = React
import {ComposeList} from './ComposeList.jsx'

export  function ComposeMail({setNewMail}){
    const [isOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }

    function closeModal(){
        setIsOpen(false)
    }
    return <section>
         <button className="compose-btn" onClick={openModal}>
            <img src="../../../../icons/compose.png"/>
            Compose</button>
            {isOpen && (<ComposeList closeModal={closeModal} setNewMail={setNewMail}/>)}
    </section>
   
}