import { useState } from 'react';
import { Input, Button } from 'antd'

function Changephoto({state, setState}) {
    const [canupload, setCanupload] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [newimage, setNewimage] = useState({image:state.auth.defimg});
    const fileSelectedHandler = event => {
        setCanupload(false);
        setSelectedFile(event.target.files[0]);
        if (event.target.files && event.target.files[0]) {
            setNewimage({
              image: URL.createObjectURL(event.target.files[0])
            });
          }
    };
    const fileUploadHandler = (event) => {
        console.log("handling upload; ", selectedFile.name);
    };

    return (
        <div className='edit-profile'>
            <h3>Change profile photo</h3>
            <div className='profile-photo'>
                <div>
                    <img src={`/api/rsc/images/${state.auth.userphoto}`} alt='profile' />
                </div>
                <div>
                    {/* <img src='https://thispersondoesnotexist.com/image' alt='new profile ' /> */}
                    <img src={`/api/rsc/images/{newimage.image}`} alt='new profile ' />
                </div>
                <div className='upload'>
                    <Input type='file' onChange={fileSelectedHandler} accept="image/*"/>
                    <Button type="primary" size='large' style={{ width: 'fit-content' }} onClick={fileUploadHandler} disabled={canupload}>Chnage Profile Photo</Button>
                </div>
            </div>


        </div>

    );
}

export default Changephoto