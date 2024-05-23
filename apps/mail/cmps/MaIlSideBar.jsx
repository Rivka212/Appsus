import {ComposeMail} from './ComposeMail.jsx'

export function MailSideBar() {
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
        { name: 'Inbox', icon: 'inbox' },
        { name: 'Starred', icon: 'starred' },
        { name: 'Snoozed', icon: 'snoozed' },
        { name: 'Important', icon: 'important' },
        { name: 'Sent', icon: 'sent' },
        { name: 'Draft', icon: 'draft' },
        { name: 'Categories', icon: 'categories' },
        { name: 'Spam', icon: 'spam' },
        { name: 'Trash', icon: 'trash' }
    ]

    return <section className="mail-sidebar">
        <ComposeMail/>
        <ul>
            {menuItems.map(item => (
                <li key={item.name} className="mail-item">
                    <button>
                        <img src={icons[item.icon]} alt={item.name} className="menu-icon" />
                        {item.name}
                    </button>
                </li>
            ))}
        </ul>
    </section>

}
