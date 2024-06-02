export function ContextMenu({ x, y, onHide }) {
  const icons = {
    reply: './icons/reply.png',
    forward: './icons/reply.png',
    archive: './icons/archive.png',
    trash: './icons/trash.png',
    unread: './icons/mark unread.png',
    snoozed: './icons/snoozed.png',
    important: './icons/important.png',
    categories: './icons/categories.png',
    spam: './icons/spam.png',
  };

  const items = [
    { name: 'Reply', icon: 'reply' },
    { name: 'Forward', icon: 'reply' },
    { name: 'Archive', icon: 'archive' },
    { name: 'Delete', icon: 'trash' },
    { name: 'Mark unread', icon: 'unread' },
    { name: 'Snooze', icon: 'snoozed' },
    { name: 'Add to Tasks', icon: 'important' },
    { name: 'Label as', icon: 'categories' },
    { name: 'Spam', icon: 'spam' },
  ];

  return (
    <div className="context-menu" style={{ top: `${y}px`, left: `${x}px` }}>
      <ul className="menu">
        {items.map((item, index) => (
          <li key={index} className={`item ${item.name}`} onClick={onHide}>
            <img src={icons[item.icon]} alt={item.name} className="menu-icon" />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;