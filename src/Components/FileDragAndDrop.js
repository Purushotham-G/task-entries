import React, { useState } from 'react'

//firebase
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

// fileUpoader
import { FileUploader } from 'react-drag-drop-files'

const fileTypes= ["JPG", "PNG", "GIF"];

const FileDragAndDrop = () => {

    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");

    const handleChange = (file) =>{
      if (!file) return;
        setFile(file);
        uploadFile(file);
    }

    const uploadFile = (file) => {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`); // Create a reference file location

      uploadBytes(storageRef, file).then((snapshot) => {
          console.log("Uploaded a blob or file!");
          // Get the file download URL
          getDownloadURL(snapshot.ref).then((url) => {
              console.log("File available at", url);
              setFileUrl(url);
          });
      }).catch((error) => {
          console.error("Error uploading file:", error);
      });
  };


  return (
  <div data-testid="file-drag-drop">
    {file && (
        <img 
          src={URL.createObjectURL(file)}
          alt="Uploaded Preview"
          style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%" }}
        />
      )} 
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />     
  </div>
  )
}

export default FileDragAndDrop
