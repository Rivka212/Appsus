export function NoteImg({note}){
    return(
        <section>
            <h3>{note.info.title}</h3>
            <img src={`${note.info.title}`} alt="" />
            {/* <img src={`../../../../icons/${team.icon}.png`} alt='' /> */}
            {/* img/flower.png */}

        </section>
    )
}




// info: {
//     url: 'http://some-img/me',
//     title: 'Bobi and Me'
// },



