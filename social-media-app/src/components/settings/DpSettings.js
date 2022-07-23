import { useAuth, upload } from "../../store/AuthContext"
import { useState} from "react"
import Modal from "../../Layout/Modal"
import classes from './DpSettings.module.css'
import ImageUploader from 'react-images-upload';


const DpSettings = (props) => {

  const btnstyles = {
    backgroundColor:'#CDB4DB',
    borderRadius: '0px',
    border: 'solid black 2px', 
    color: 'black',
    padding: '0.8rem 2rem',
    fontFamily: 'Mali, cursive',
    fontSize: '1.1rem',
    marginTop: '20px'
}
const stylesA = {
    backgroundColor: 'white',
    padding: '1.5rem 1.9rem',
    boxShadow: 'none'
}

    const currentUser = useAuth()
    const [photo, setPhoto] = useState(null)
    const [preview, setPreview] = useState(false)

    

    const imageChangeHandler = (event) => {
        if(event[0]){
            setPhoto(event[0])
            setPreview(true)

        }
        else{
          alert('nothing is selected')
        }
    }
    const imageUploadHandler = async () => {         
        props.onHideBox()          
        await  upload(photo, currentUser)  
    }  

      return(
            <Modal onClose={props.onHideBox}>
                <h1 className={classes.head}>Update Display Pictue</h1>
                <div>
                <ImageUploader 
                withIcon={preview? false : true}
                buttonStyles={btnstyles}
                fileContainerStyle={stylesA}
                withPreview={preview}
                buttonText='Choose a Picture'
                withLabel={false}
                singleImage={true}
                onChange={imageChangeHandler}/>

                {preview && <button onClick={imageUploadHandler} className={classes.upload}>upload</button>}
                </div>
                
               
            </Modal>
      )
}
export default DpSettings