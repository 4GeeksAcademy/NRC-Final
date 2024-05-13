import React, { useState, useContext } from "react";
import { Context } from '../store/appContext';

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
    }
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      sendNewVideo(title, url);
      setTitle("");
      setUrl("");
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center">
                <div className="col-auto">
                    <label className="visually-hidden" htmlFor="autoSizingInput">Title</label>
                    <input type="text" className="form-control" id="inputTitle" onChange={handleChangeTitle} placeholder="Titulo del vídeo"/>
                </div>
                <div className="col-auto">
                    <label className="visually-hidden" htmlFor="autoSizingInput">URL</label>
                    <input type="text" className="form-control" id="inputUrl" onChange={handleChangeUrl} placeholder="URL del vídeo"/>
                </div>
                <div className="col-auto">
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </>
    )
}

export default AddContent;