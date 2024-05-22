import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import styles from "../../styles/messages.module.css";

const Messages = () => {
    const { store, actions } = useContext(Context);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/contact_form/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Error deleting contact");
            }
            location.reload()
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(()=>{
        actions.loadMessagesContactForm()
    },[store.Messages])

    return (
        <>
            <div className={`text-center ${styles.formBack} `}>
                <h2 className="mb-3 text-light">Mensajes</h2>
                <div className="container">
                    <div className='row'>
                        {store.messages.map((message) => (
                            <div key={message.id} className={`${styles.message_card} card mb-3 align-self-center`}>
                                <h5 className="card-header">{message.from_user}: {message.email}</h5>
                                <div className="card-body">
                                    <p className="card-text">{message.comment}</p>
                                    <button href="#" className={`${styles.button}`} onClick={()=>handleDelete(message.id)}>Borrar mensaje</button>
                                </div>
                            </div>
                        ))};
                    </div>
                </div>
            </div>

        </>
    )
}

export default Messages