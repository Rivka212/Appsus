import { mailService } from "../services/mail.service.js"

const {useState} = React

export function MailFilter(){
const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())    

return <section>
    
</section>
}