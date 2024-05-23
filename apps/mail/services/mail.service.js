import { utilService } from '../../../services/util.service.js'

const STORAGE_KEY = 'emailsDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    sortEmailsByDate,
}

function _loadMailsFromStorage() {
    return utilService.loadFromStorage(STORAGE_KEY)
}

function _saveMailsToStorage(mails) {
    utilService.saveToStorage(STORAGE_KEY, mails)
}
function query(filterBy = null) {

    let emails = _createMails()
    if (filterBy) emails = _getFilteredMails(emails, filterBy)
    return Promise.resolve(emails)
}

function _getFilteredMails(books, filterBy) {
    let { title, minPrice, maxPrice } = filterBy
    if (!minPrice) minPrice = 0
    if (!maxPrice) maxPrice = Infinity
    return books.filter((book) => {
        return (
            book.title.includes(title)
            &&
            book.listPrice.amount >= minPrice &&
            book.listPrice.amount <= maxPrice
        )
    })
}

function _createMails() {
    let emails = _loadMailsFromStorage()
    if (!emails || !emails.length) {
        
        emails = [
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                inbox: _isInbox('user@appsus.com')
            },
            {
                id: utilService.makeId(),
                subject: 'Project update',
                body: `Dear sivan,
                I hope this email finds you well.
                Could you please provide an update on the status of the current project? 
                The client has been asking for the latest progress report, 
                and I need to compile all the information by the end of this week.
                Your prompt response would be greatly appreciated.
                Thank you,
                John`,
                isRead: true,
                sentAt: 1551133930601,
                removedAt: null,
                from: 'john@momo.com',
                to: 'user@appsus.com',
                inbox: _isInbox('user@appsus.com')
            },
            {
                id: utilService.makeId(),
                subject: 'Invitation for workshop',
                body: `Dear sivan,
                I am excited to invite you to a workshop on "Effective Communication Skills" 
                that we are hosting next month. 
                Your participation would be invaluable, 
                and I believe you would gain a lot from the experience. 
                Please let me know if you are interested, 
                and I will send you further details.
                Best regards,
                Emma`,
                isRead: false,
                sentAt: 1705276800000,
                removedAt: null,
                from: 'emma@momo.com',
                to: 'user@appsus.com',
                inbox: _isInbox('user@appsus.com')
            },
            {
                id: utilService.makeId(),
                subject: 'Happy birthday!',
                body: `Dear sivan,
                Just wanted to drop you a quick note to wish you a very happy birthday! 
                I hope you have a fantastic day filled with joy and celebration. 
                Let's get together soon to celebrate properly!
                Cheers,
                Mike`,
                isRead: true,
                sentAt: 1662533930601,
                removedAt: null,
                from: 'mike@momo.com',
                to: 'user@appsus.com',
                inbox: _isInbox('user@appsus.com')
            },
            {
                id: utilService.makeId(),
                subject: 'Catching up',
                body: `Hi Sarah,
                It's great to hear from you! 
                I'd love to catch up next week. 
                How about Tuesday at 3 PM at our usual café? 
                Let me know if that works for you.                
                Yours,
                Sivan`,
                isRead: false,
                sentAt: 1662533930601,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'sarah@momo.com',
            inbox: _isInbox('sarah@momo.com')
            },
            {
                id: utilService.makeId(),
                subject: 'Re: project update',
                body: `Hi John,
                The project is progressing well. 
                I have attached the latest report for your review. 
                If you need any additional information, please let me know. 
                I will be available for a call if necessary.
                Best regards,
                Sivan`,
                isRead: true,
                sentAt:1716449332523,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'john@momo.com',
            inbox: _isInbox('john@momo.com')
            },
            {
                id: utilService.makeId(),
                subject: 'Thank you!',
                body: `Hi Mili,
                I wanted to take a moment to thank you for all your hard work and dedication on the recent project. 
                Your contributions were invaluable, and I truly appreciate everything you have done. 
                Let's keep up the great work!
                Best regards,
                Sivan`,
                isRead: true,
                sentAt: 1382713930601,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'mili@momo.com',
            inbox: _isInbox('mili@momo.com')
            },
            {
                id: utilService.makeId(),
                subject: 'Team meeting',
                body: `Hi Team,
                Just a reminder that our quarterly team meeting is scheduled for this Friday at 10 AM 
                in the conference room. Please come prepared with updates on your projects and any questions or concerns you might have.
                Looking forward to seeing you all there.
                Best regards,
                Sivan`,
                isRead: false,
                sentAt: 1382713930901,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'jake@momo.com',
                inbox: _isInbox('jake@momo.com')
            },
            {
                id: utilService.makeId(),
                subject: 'Re: invitation to workshop',
                body: `Hi Emma,
                Thank you so much for the invitation. 
                The work_shop sounds fantastic, and I would love to attend. 
                Please send me the details, and I will make sure to mark it on my calendar.
                Best,
                Sivan`,
                isRead: true,
                sentAt: 1582713930901,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'MentalWellnessLibra@momo.com',
                inbox: _isInbox('emma@momo.com')
            },
        ]
        _saveMailsToStorage(emails)
    }
    return emails

}

function _isInbox(to) {
    if(to === loggedinUser.email) return true
    else return false
}

function sortEmailsByDate(emails) {
    return emails.sort((a, b) => b.sentAt - a.sentAt)
}