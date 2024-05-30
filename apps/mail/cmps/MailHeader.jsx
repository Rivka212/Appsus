
export function MailHeader({toggleSideBar}) {


    return <section className="mail-header">
        <div className="menu" >
            <i className="fa-solid fa-bars"onClick={toggleSideBar} />
            <img className="logo" src="../../../icons/gmail-logo.png" alt="" />

        </div>
        <div className="search-container">
        <img src="../../../icons/search.svg" alt="Search Icon" className="search-icon"/>
            <input type="search" placeholder="Search mail" />
        </div>
        <img className="user" src="../../../icons/User.png" alt="" />


    </section>
}