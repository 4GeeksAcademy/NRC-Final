import React, { useState } from "react";
import styles from "../../styles/registro.module.css";

export const Registro = () => {
   

      const [email,setEmail]= useState('')
      const [password,setPassword]= useState('')
      const [confirmPassword,setConfirmPassword]= useState('')



      const handleChangeEmail = (e) =>{
        setEmail(e.target.value)
      }

      const handleChangePassword = (e) =>{
        setPassword(e.target.value)
      }

      const handleChangeConfirm = (e) =>{
        setConfirmPassword(e.target.value)
      }

        
     const sendFormData = (email,password) => {
          fetch(`${process.env.BACKEND_URL}/user`, {
            method: "POST",
            body: JSON.stringify({
                "email":email,
                "password":password,
                "rol":"user"
            }),
            headers: { "Content-Type": "application/json" }
          })
            .then(response => response.json())
            .then(response => console.log(response))
        }
    



    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            sendFormData(email,password)
        }else{
            alert('La contraseña no coincide')
        }
        

    };

    return( 

      <div className={styles.forms}>
        <div className={styles.registro}>
             <h2>Registro</h2>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className={styles.email}>
                    <label htmlFor="emailId" className="form-label"></label>
                    <input type="email" name="email" value={email} onChange={handleChangeEmail} className={` ${styles.customInput} `} id="emailId"placeholder="Email" required/>
                </div>
                <div className={styles.contraseña}>
                    <label htmlFor="passwordId" className="form-label"></label>
                    <input type="password" name="password" value={password} onChange={handleChangePassword} className={`${styles.customInput} `} id="passwordId"placeholder="Contraseña" required/>
                </div>
                <div className={styles.repetirContraseña}>
                    <label htmlFor="password1Id" className="form-label"></label>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChangeConfirm} className={`${styles.customInput} `} id="password1Id" placeholder="Repetir contraseña" required/>
                 </div>
                    <button type="submit" className={styles.button}>Registrarse  <i className="fas fa-long-arrow-alt-right"></i></button>
                <div className={styles.yaEresUsuario}>¿Ya eres usuario? Accede</div>
            </form>
        </div>
        </div>

   
    );
};
export default Registro