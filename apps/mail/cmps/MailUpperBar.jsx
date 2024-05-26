const { NavLink } = ReactRouterDOM;

export function MailUpperBar({ onFilterChange }) {
    const icons = {
        back: '../../../../icons/back.svg',
        archive: '../../../../icons/archive.png',
        spam: '../../../../icons/spam.png',
        trash: '../../../../icons/trash.png',
        unread: '../../../../icons/mark unread.png',
        snooze: '../../../../icons/snoozed.png',
        addTask: '../../../../icons/addTask.png',
        labels: '../../../../icons/important.png',
    more: '../../../../icons/more.png',
    };

    const menuItems = [
        'back',
        'archive',
        'spam',
        'trash',
        'unread',
        'snooze',
        'addTask',
        'labels',
        'more',
    ];
    return (
        <section className="mail-upper-bar">
            <ul>
                <NavLink to={`/mail/back`}>
                    <li className="mail-item back-item">
                        <img src={icons['back']} alt='back' className={`menu-icon back`} />
                    </li>
                </NavLink>
                <div className="icon-group">
                    {menuItems.slice(1).map((item, index) => (
                        <React.Fragment key={item}>
                            <NavLink to={`/mail/${item}`}>
                                <li className="mail-item">
                                    <img src={icons[item]} alt={item} className={`menu-icon ${item}`} />
                                </li>
                            </NavLink>
                            {(index + 1) % 3 === 0 && index < menuItems.slice(1).length - 1 && (
                                <li className="divider" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </ul>
        </section>
    );
}