import { MailFilter } from "./MailFilter.jsx"
export function MailHeader({ toggleSideBar , filterBy, onFilter}) {


    return <section className="mail-header">
        <div className="menu" >
            <i className="fa-solid fa-bars" onClick={toggleSideBar} />
            <img className="logo" src="./icons/gmail-logo.png" alt="" />

        </div>
        <MailFilter filterBy={filterBy} onFilter={onFilter}/>
        <img className="user" src="./icons/User.png" alt="" />


    </section>
}