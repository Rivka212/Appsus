const { useState } = React

export function AccordionInput({ input, children }) {

    const [isOpen, setIsOpen] = useState(false)

    const openClass = isOpen ? 'open' : ''
    return (
        <section className={`accordion ${openClass}`}>
            <section onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)} className="title-container">
                {/* <h2>{title}</h2> */}
                {input}
            </section>
            <section className="content">
                {children}
            </section>
        </section>
    )
}