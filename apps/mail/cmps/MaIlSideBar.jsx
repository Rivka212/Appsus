const { useNavigate } = ReactRouterDOM
import { ComposeMail } from './ComposeMail.jsx'

export function MailSideBar({ onFilterChange, readCount }) {
    const nav = useNavigate()
    const icons = {
        inbox: '../../../../icons/inbox.png',
        starred: '../../../../icons/starred.png',
        snoozed: '../../../../icons/snoozed.png',
        important: '../../../../icons/important.png',
        sent: '../../../../icons/sent.png',
        draft: '../../../../icons/draft.png',
        categories: '../../../../icons/categories.png',
        spam: '../../../../icons/spam.png',
        trash: '../../../../icons/trash.png'
    }

    const menuItems = [
        { name: 'inbox', icon: 'inbox' },
        { name: 'stared', icon: 'starred' },
        { name: 'snoozed', icon: 'snoozed' },
        { name: 'important', icon: 'important' },
        { name: 'sent', icon: 'sent' },
        { name: 'draft', icon: 'draft' },
        { name: 'categories', icon: 'categories' },
        { name: 'spam', icon: 'spam' },
        { name: 'trash', icon: 'trash' }
    ]
    function handleFilterChange(status) {

        nav(status)
    }

    return <section className="mail-sidebar">
        <ComposeMail />
        <ul>
            {menuItems.map(item => (
                <li key={item.name} className="mail-item" onClick={() => handleFilterChange((item.name))}>
                    <button>
                            <img src={icons[item.icon]} alt={item.name} className="menu-icon" />
                            {item.name}
                    </button>
                    {item.name === 'inbox' && <span className="read-count"> {readCount}</span>}
                </li>
            ))}
        </ul>
    </section>

}
