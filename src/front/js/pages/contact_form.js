import React, { useState, useContext } from "react";
import { Context } from '../store/appContext';
import styles from "../../styles/contacto.module.css";

export const Contact_form = () => {
  const { store, actions } = useContext(Context);

  const [email, setEmail] = useState('')
  const [from_user, setFrom_user] = useState('')
  const [comment, setComment] = useState('')



  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangeFrom_user = (e) => {
    setFrom_user(e.target.value)
  }

  const handleChangeComment = (e) => {
    setComment(e.target.value)
  }


  const sendFormData = (from_user, email, comment) => {
    fetch(`${process.env.BACKEND_URL}/contact_form`, {
      method: "POST",
      body: JSON.stringify({
        "from_user": from_user,
        "email": email,
        "comment": comment
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(response => console.log(response))
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    sendFormData(from_user, email, comment);
    setEmail("");
    setFrom_user("");
    setComment("");
    actions.loadMessagesContactForm();
  };

  return (

    <div className={styles.formBody}>
      <div className={styles.formulario_contacto}>
        <h2 className="mt-4">No te quedes con dudas</h2>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className={styles.camposContact}>
            <label htmlFor="emailId" className="form-label"></label>
            <input type="email" name="email" value={email} onChange={handleChangeEmail} className={` ${styles.formInput} `} id="emailId" placeholder="Email" required />
          </div>
          <div className={styles.camposContact}>
            <label htmlFor="nameId" className="form-label"></label>
            <input type="text" name="password" value={from_user} onChange={handleChangeFrom_user} className={`${styles.formInput} `} id="nameId" placeholder="Nombre" required />
          </div>
          <div className={styles.commentContact}>
            <label htmlFor="commentId" className="form-label"></label>
            <textarea type="text" name="comment" value={comment} maxLength={550} onChange={handleChangeComment} className={`${styles.formInputComment}`} rows="4" id="commentId" placeholder="Tu mensaje" required />
          </div>
          <button type="submit" className={styles.button}>Enviar  <i className="fas fa-long-arrow-alt-right"></i></button>
        </form>
      </div>
    </div>


  );
};
export default Contact_form