const { useState, useEffect } = React

export function NoteImg({note, onSetNoteImg}){
        const [image, setImage] = useState(null)
    
     
function onSetNoteImg(){
    console.log('hi');
}
    
        return (  <section>
            <h3>{note.info.title}</h3>
            <div>
                {/* <input type="file" onChange={handleImageUpload} /> */}
                {image && <img src={image} alt="" style={{ maxWidth: '200px' }} />}
            </div>
              </section>
        )
    }
    
    





    // return(
      
    //         {/* <img src={`${note.info.title}`} alt="" /> */}
    //         {/* <img src={`../../../../icons/${team.icon}.png`} alt='' /> */}
    //         {/* img/flower.png */}

      
 




// info: {
//     url: 'http://some-img/me',
//     title: 'Bobi and Me'
// },

