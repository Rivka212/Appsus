export function NoteTodos({ note }) {
    return (
        <section>
            <h3>{note.info.title}</h3>
            <ul><li>{note.info.todos}</li></ul>
        </section>
    )
}


// info: {
//     title: 'Get my stuff together',
//     todos: [
//         { txt: 'Driving license', doneAt: null },
//         { txt: 'Coding power', doneAt: 187111111 }
//     ]
// }