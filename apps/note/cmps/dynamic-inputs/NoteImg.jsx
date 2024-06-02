const { useState, useEffect } = React

export function NoteImg({note}){
        const [image, setImage] = useState(null);
    
        function handleImageUpload(e){
            const file = e.target.files[0]
            const reader = new FileReader()
    
            reader.onload = () => {
                setImage(reader.result)
            }
            if (file) {
                reader.readAsDataURL(file)
            }
        }
    
        return (  <section>
            <h3>{note.info.title}</h3>
            <div>
                {/* <input type="file" onChange={handleImageUpload} />
                {image && <img src={image} alt="" style={{ maxWidth: '200px' }} />} */}
            </div>  </section>
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

