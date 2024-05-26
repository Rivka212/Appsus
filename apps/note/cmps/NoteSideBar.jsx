import { useEffect } from "react"
import { noteService } from "../services/note.service.js"

const { useState } = React
const { useNavigate } = ReactRouterDOM

export function NoteSideBar({ onChange }) {
    // const [teams, setTeams] = useState(noteService.createTeams())

    const teams = [
        { type: 'notes', icon: 'light-bulb' },
        { type: 'reminders', icon: 'bell' },
        { type: 'categories', icon: 'categories' },
        { type: 'edit labels', icon: 'compose' },
        { type: 'archive', icon: 'download-file' },
        { type: 'trash', icon: 'trash' }
    ]


    // useEffect(() => {
    //         setCategories(categories)
    // }, [])



    return (
        <section className="note-sidebar">
            <ul>
                {teams.map(team =>
                    <li key={team.type} className="note-teams" onClick={() => onChange(team.type)}>
                        <img src={`../../../../icons/${team.icon}.png`} alt='' />
                        <span className="name-teams hidden">{team.type}</span>
                    </li>
                )}
            </ul>
        </section>
    )
}