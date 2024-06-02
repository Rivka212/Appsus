import {hey} from '../'
export function Home() {
    return <section className="home">
        <h1>Welcome to Appsus!</h1>
        <h2>Streamline Your Communication and Organization</h2>
        <p>Welcome to Appsus- the ultimate solution for managing your emails and keeping your notes organized in one powerful, user-friendly app. Whether you’re a busy professional, a student, or anyone looking to enhance productivity, our app is designed to make your life easier.
        </p>
        <h3> Key Features: </h3>
        <section className="cards">

            <div className="card-info txt">
                <h4> Unified Inbox</h4>
                <p>Access all your emails from different providers in one place. Say goodbye to switching between multiple email accounts and enjoy the convenience of a single, unified inbox.
                </p>
            </div>

            <div className="card-info">
                <img src="./img/pic1.jpg"></img>
            </div>

            <div className="card-info">
                <img src="./img/pic2.jpg"></img>
            </div>


            <div className="card-info txt">
                <h4> Effortless Note Taking</h4>
                <p>Capture your thoughts, ideas, and important information with our intuitive note-taking feature. Organize your notes with tags, categories, and search functionality to find what you need quickly.

                </p>
            </div>

            <div className="card-info txt">
                <h4> Enhanced Email Organization</h4>
                <p>
                    Sort, filter, and categorize your emails to manage your inbox more effectively. Prioritize important messages and minimize clutter for a streamlined email experience.
                </p>
            </div>


            <div className="card-info">
                <img src="./img/pic3.jpg"></img>
            </div>
        </section>
    </section>
}

