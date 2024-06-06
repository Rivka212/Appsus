const { useState, useEffect } = React


    export function NoteTodos({ note, onUpdatedTodoNote }) {
        const { info } = note
        const [todos, setTodos] = useState(info.todos)
    
        function handleCheckboxChange(index, isChecked,ev) {
            ev.stopPropagation()
            console.log(isChecked, 'isChecked');
            console.log(index, note);
            const updatedTodos = [...todos]
            console.log(updatedTodos);
            updatedTodos[index].doneAt = isChecked ? Date.now() : null;

            // updatedTodos[index].doneAt = !updatedTodos[index].doneAt
            // updatedTodos[index].doneAt = updatedTodos[index].doneAt ? Date.now() : null;
            setTodos(updatedTodos);
            onUpdatedTodoNote({
                ...note,
                info: {
                    ...info,
                    todos: updatedTodos
                }
            })
        }
    
     return (
        <section className="note-todos">
            <h3>{info.title}</h3>
            <ul>
                {info.todos.map((todos, index) => (
                    <li key={index}>
                        {/* {info.todos} ?  <img src="../../../../img/check.png" alt="" /> :
                          <img src="../../../../img/unchecked.png" alt="" /> */}
                        <input
                            type="checkbox"
                            id={`todos-${index}`}
                            checked={todos.doneAt}
                            onChange={(ev) =>{ev.stopPropagation(), handleCheckboxChange(index, ev.target.checked,ev)}}
                         /> 
                       
                      
                        <label htmlFor={`todo-${index}`}>{todos.txt}</label>
                    </li>
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