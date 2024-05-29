import { noteService } from "../services/note.service.js"
const { useState, useEffect } = React
const { useNavigate, NavLink } = ReactRouterDOM

export function NoteSideBar({ onChange, status }) {
    // const [teams, setTeams] = useState(noteService.createTeams())

    const teams = [
        { type: 'notes', icon: 'idea' },
        { type: 'reminders', icon: 'bell' },
        { type: 'categories', icon: 'categories' },
        { type: 'edit labels', icon: 'compose' },
        { type: 'archive', icon: 'download-file' },
        { type: 'trash', icon: 'trash' }
    ]

    return (
        <section className="note-sidebar">
            <ul>
                {teams.map(team =>
                    <NavLink to={`/note/${team.type}`} className="active" key={team.type}>
                        <li className={`note-teams ${status === team.type ? 'active' : ''}`}>
                            <img src={`../../../../icons/${team.icon}.png`} alt='' />
                            <span className="name-teams hidden">{team.type}</span>
                        </li>
                    </NavLink>
                )}
            </ul>
        </section>
    )
}
    // activeclassName   onClick={() => onChange(team.type)}

    // return (
    //     <section className="note-sidebar">
    //         <ul>
    //             {teams.map(team =>
    //                 <li key={team.type} className="note-teams" onClick={() => onChange(team.type)}>
    //                     <img src={`../../../../icons/${team.icon}.png`} alt='' />
    //                     <span className="name-teams hidden">{team.type}</span>
    //                 </li>
    //             )}
    //         </ul>
    //     </section>
    // )
