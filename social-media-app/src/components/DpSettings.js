import { useAuth, upload } from "../store/AuthContext"
import { useState} from "react"
import Modal from "../Layout/Modal"


const DpSettings = (props) => {

    const currentUser = useAuth()
    const [photo, setPhoto] = useState(null)

    

    const imageChangeHandler = (event) => {
        if(event.target.files[0]){
            setPhoto(event.target.files[0])
        }
        else{
          alert('nothing is selected')
        }
    }
    const imageUploadHandler = async () => {      
      if(photo){
        await  upload(photo, currentUser)  
      }
      else{
        alert('nothing is selected')
      }
          
    }  

      return(
            <Modal onClose={props.onHideCart}>
                <label htmlFor="myfile">Select a file</label>
                <input type="file" accept="image/*" id='myfile' onChange={imageChangeHandler}/>
                <button onClick={imageUploadHandler}>upload</button>
               
            </Modal>
      )
}
export default DpSettings