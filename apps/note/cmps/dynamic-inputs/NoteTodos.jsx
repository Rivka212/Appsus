export function NoteTodos({ note }) {
    const { info } = note    
        return (
            <section className="note-todos">
                <h3>{info.title}</h3>
                <ul>
                    {info.todos.map((todo, index) => (
                        <li key={index}>{todo.txt}</li>
                    ))}
                </ul>
            </section>
        )
    }

// note = {
//     info: {
//         title: 'Get my stuff together',
//         todos: [
//             { txt: 'Driving license', doneAt: null },
//             { txt: 'Coding power', doneAt: 187111111 }
//         ]
//     }
// }