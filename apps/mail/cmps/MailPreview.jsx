export function MailPreview({ mail }) {
    function formatDate(timestamp) {
        const date = new Date(timestamp)
        const today = new Date()
        
        if (date.toDateString() === today.toDateString()) {
          const hours = date.getHours().toString().padStart(2, '0')
          const minutes = date.getMinutes().toString().padStart(2, '0')
          return `${hours}:${minutes}`

        } else {
          const year = date.getFullYear()
          const month = date.toLocaleString('default', { month: 'short' }); // Get month abbreviation

          const monthNum = date.getMonth() + 1 // Month is zero-based, so we add 1
          const day = date.getDate()
          
          if (year === today.getFullYear()) {
            return `${day + ' ' }${month.toString().padStart(2, '0')}`
        } else {
            const shortYear = year.toString().slice(-2)
            return `${day}/${monthNum.toString().padStart(2, '0')}/${shortYear}`
          }
        }
      }
    

    
    
    return <div className="mail-preview">
        <span className="sender" >{mail.inbox ? mail.from.split('@')[0] : mail.to.split('@')[0]}</span>
        <div>
        <span className="subject">{mail.subject}</span>
        <span className="body">{mail.body}</span>
        </div>
        <span className="sent-time">{formatDate(mail.sentAt)}</span>
        
    </div>
}