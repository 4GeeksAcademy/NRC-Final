import React, { useState, useContext } from "react";
import { Context } from '../store/appContext';
import Swal from 'sweetalert2'

const AddContent = () => {
    const { store, actions } = useContext(Context);

    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

  
    const handleChangeTitle = (e) => {
      setTitle(e.target.value)
    }
  
    const handleChangeUrl = (e) => {
      setUrl(e.target.value)
    }
    
    const sendNewVideo = (title, url) => {
      fetch(`${process.env.BACKEND_URL}/video`, {
        method: "POST",
        body: JSON.stringify({
          "exercise_name": title,
          "url": url
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(response => console.log(response))
        .then(response => Swal.fire({
          title: "Video subido",
          text: "Video subido correctamente",
          icon: "success"
        }))
        .catch(error => Swal.fire({
          title: "Error",
          text: "No ha sido posible subir su video",
          icon: "error"
        })) 
    }
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      sendNewVideo(title, url);
      setTitle("");
      setUrl("");
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="row d-flex flex-column gy-2 gx-3 align-items-center">
                <div className="col-auto mt-4">
                    <label className="mb-2" htmlFor="autoSizingInput">Title</label>
                    <input type="text" className="form-control" id="inputTitle" onChange={handleChangeTitle} placeholder="Titulo del vídeo" value={title}/>
                </div>
                <div className="col-auto mt-2">
                    <label className="mb-2" htmlFor="autoSizingInput">URL</label>
                    <input type="text" className="form-control" id="inputUrl" onChange={handleChangeUrl} placeholder="URL del vídeo" value={url}/>
                </div>
                <div className="col-auto mt-4">
                    <button type="submit" className="btn text-light"><i class="fa-solid fa-arrow-up-from-bracket"></i> Subir video</button>
                </div>
            </form>
        </>
    )
}

export default AddContent;