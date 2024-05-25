const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailApp } from "./apps/mail/views/MailApp.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { MailDetails } from "./apps/mail/views/MailDetails.jsx"
import {NoteEdit} from "./apps/note/cmps/NoteEdit.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route path="/note" element={<NoteIndex />} />
                <Route path="/mail" element={<MailApp />}>
                    <Route index element={<MailIndex />} />
                    <Route path=":status" element={<MailIndex />} />
                    <Route path="details/:id" element={<MailDetails />} />
                </Route>
                <Route path="/note/edit/:noteId" element={<NoteEdit />} />
            </Routes>
        </section>
    </Router>
}
