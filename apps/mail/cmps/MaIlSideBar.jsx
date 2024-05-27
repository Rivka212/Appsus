const{ NavLink, useLocation } = ReactRouterDOM
import { ComposeMail } from './ComposeMail.jsx';

export function MailSideBar({ onFilterChange, readCount }) {
    const icons = {
        inbox: '../../../../icons/inbox.png',
        stared: '../../../../icons/starred.png',
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
        { name: 'stared', icon: 'stared' }, // Corrected from 'stared' to 'starred'
        { name: 'snoozed', icon: 'snoozed' },
        { name: 'important', icon: 'important' },
        { name: 'sent', icon: 'sent' },
        { name: 'draft', icon: 'draft' },
        { name: 'categories', icon: 'categories' },
        { name: 'spam', icon: 'spam' },
        { name: 'trash', icon: 'trash' }
    ]

    return (
        <section className="mail-sidebar">
            <ComposeMail />
            <ul>
                {menuItems.map(({ name, icon }) => (
                     <NavLink to={`/mail/${name}`}  key={name} >
                    <li className="mail-item" >
                       
                            <button>
                                <img src={icons[icon]} alt={name} className="menu-icon" />
                                {name}
                            </button>
                       
                        {name === 'inbox' && <span className="read-count">{readCount}</span>}
                    </li>
                    </NavLink>
                ))}
            </ul>
        </section>
    );
}
