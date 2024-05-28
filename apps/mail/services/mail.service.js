import { utilService } from '../../../services/util.service.js'

const STORAGE_KEY = 'emailsDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    loggedinUser,
    query,
    sortEmailsByDate,
    getMail,
    getDefaultFilter,
    formatDate,
    formatDate2,
    countIsRead,
    addIsRead,
    changeMailType,

}

function _loadMailsFromStorage() {
    return utilService.loadFromStorage(STORAGE_KEY) || []
}

function _saveMailsToStorage(mails) {
    utilService.saveToStorage(STORAGE_KEY, mails)
}

function query(filterBy = { status: 'inbox', txt: '', isRead: undefined, isStared: undefined, labels: [] }) {
    let emails = _loadMailsFromStorage()
    if (!emails.length) emails = _createMails()
    if (filterBy) emails = _getFilteredMails(emails, filterBy)
    return Promise.resolve(emails)
}

function getMail(mailId) {
    const mails = _loadMailsFromStorage()
    const mail = mails.find(mail => mail.id === mailId)
    return Promise.resolve(mail)
}

function _getFilteredMails(mails, filterBy) {
    if (!mails || !Array.isArray(mails)) return []
    if (!filterBy) return mails

    const { status, txt, isRead, isStared, labels } = filterBy

    return mails.filter(mail => {
        return (
            (!status || mail.type === status) &&
            (!txt || mail.subject.includes(txt) || mail.body.includes(txt)) &&
            (isRead === undefined || mail.isRead === isRead) &&
            (isStared === undefined || mail.isStared === isStared) &&
            (!labels.length || labels.every(label => (mail.labels || []).includes(label)))
        )
    })
}

function getDefaultFilter(filterBy = { status: 'inbox', txt: '', isRead: '', isStared: '', labels: [] }) {
    return {
        status: filterBy.status || 'inbox',
        txt: filterBy.txt || '',
        isRead: filterBy.isRead || undefined,
        isStared: filterBy.isStared || undefined,
        labels: filterBy.labels || []
    }
}

function _createMails() {
    let emails = [
        {
            id: utilService.makeId(),
            subject: 'Miss you!',
            body: 'Would love to catch up sometime',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com',
            type: 'inbox'
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
            type: 'inbox'
        },
        {
            id: utilService.makeId(),
            subject: 'Invitation for workshop',
            body: `Dear sivan,
            I am excited to invite you to a workshop on "Effective Communication Skills" that we are hosting next month. 
            Your participation would be invaluable, and I believe you would gain a lot from the experience. 
            Please let me know if you are interested, and I will send you further details.
            
            Best regards,
            Emma`,
            isRead: false,
            sentAt: 1705276800000,
            removedAt: null,
            from: 'emma@momo.com',
            to: 'user@appsus.com',
            type: 'inbox'
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
            type: 'inbox'
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
            sentAt: 1662533930601,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'sarah@momo.com',
            type: 'sent'
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
            sentAt: 1716449332523,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'john@momo.com',
            type: 'sent'
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
            sentAt: 1382713930601,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'mili@momo.com',
            type: 'sent'
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
            sentAt: 1382713930901,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'jake@momo.com',
            type: 'sent'
        },
        {
            id: utilService.makeId(),
            subject: 'Re: invitation to workshop',
            body: `Hi Emma,
            Thank you so much for the invitation. 
            The workshop sounds fantastic, and I would love to attend. 
            Please send me the details, and I will make sure to mark it on my calendar.
            Best,
            Sivan`,
            sentAt: 1582713930901,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'MentalWellnessLibra@momo.com',
            type: 'sent'
        },
    ]
    _saveMailsToStorage(emails)
    return emails
}

function countIsRead(emails) {
    let count = 0
    emails.forEach(mail => {
        if (mail.isRead) count++
    })
    let wasntRead = emails.length - count
    return wasntRead
}

function sortEmailsByDate(emails) {
    return emails.sort((a, b) => b.sentAt - a.sentAt)
}

function formatDate(timestamp) {
    const date = new Date(timestamp)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

function formatDate2(timestamp) {
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
        return `${day + ' '}${month.toString().padStart(2, '0')}`
      } else {
        const shortYear = year.toString().slice(-2)
        return `${day}/${monthNum.toString().padStart(2, '0')}/${shortYear}`
      }
    }
  }

function addIsRead(mailId) {    
    const mails=_loadMailsFromStorage()
    const mailIndex = mails.findIndex(mail => mail.id === mailId)

    if (mails[mailIndex].isRead === true) return

    if (mailIndex >= 0) { // Check if the mail exists
        mails[mailIndex].isRead = true // Set isRead to true
        _saveMailsToStorage(mails) // Save the updated mails 
    }
}

function changeMailType(mailId, type){
    return new Promise((resolve, reject) => {
        const mails = _loadMailsFromStorage();
        const mailIndex = mails.findIndex(mail => mail.id === mailId);

        if (mailIndex === -1) {
            return reject('Mail not found');
        }

        if (mails[mailIndex].type === type) {
            return resolve(mails[mailIndex]);
        }

        mails[mailIndex].type = type;
        _saveMailsToStorage(mails);
        resolve(mails[mailIndex]);
    });
}