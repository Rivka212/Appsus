const { useState } = React
export function ComposeList({ closeModal }) {

function handleSubmit(){
    console.log('hi')
}

    return <section className="compose-mail">
        <header>
            <h2>New Message</h2>
            <div>
                <button>-</button>
                <button>~</button>
                <button className="close" onClick={closeModal}>X</button>
            </div>
        </header>
       <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Recipient"
            onFocus={(ev) => ev.target.placeholder = ''}
            onBlur={(ev) => ev.target.placeholder = 'Recipient'} required />
        <input type="text" placeholder="Subject"
            onFocus={(ev) => ev.target.placeholder = ''}
            onBlur={(ev) => ev.target.placeholder = 'Subject'} />
        <div className="text-box">
        <textarea type="text"  />
        </div>
        <button className="send-btn" type="submit">Send</button>
        </form>
    </section>
}