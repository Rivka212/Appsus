
export function MailHeader({ toggleSideBar }) {


    return <section className="mail-header">
        <div className="menu" >
            <i className="fa-solid fa-bars" onClick={toggleSideBar} />
            <img className="logo" src="./icons/gmail-logo.png" alt="" />

        </div>
        <div className="search-container">
            <span className="material-symbols-outlined search-icon">
                search
            </span>
            <input type="search" placeholder="Search mail" />
        </div>
        <img className="user" src="./icons/User.png" alt="" />


    </section>
}