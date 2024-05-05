import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const Messages = () => {
    const { store, actions } = useContext(Context);


    return (
        <>
            <div className=" text-center mt-5 mx-5">
                <h2 className="mb-2 text-light">Mensajes</h2>
                <div className="container text-center">
                    {store.messages.map((message) => (
                        <div className="card mb-3"  style={{ width: '18rem' }}>
                        <h5 className="card-header">{message.from_user}</h5>
                        <div className="card-body">
                          <h5 className="card-title">{message.email}</h5>
                          <p className="card-text">{message.comment}</p>
                          <a href="#" className="btn btn-primary">Borrar mensaje</a>
                        </div>
                      </div>
                    ))};
                </div>
            </div>

        </>
    )
}

export default Messages