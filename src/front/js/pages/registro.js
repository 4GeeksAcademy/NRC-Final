import React, { useState , useContext} from "react";
import styles from "../../styles/registro.module.css";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


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
            .then(response => Swal.fire({
              title: "Bienvenido",
              text: "Usuario registrado correctamente",
              icon: "success"
            }))
            .catch(error => Swal.fire({
              title: "Error",
              text: "No ha sido posible registrar el usuario",
              icon: "error"
            })) 
        }
    



    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            sendFormData(email,password)
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }else{
          Swal.fire({
            title: "Error",
            text: "La contraseña no coincide",
            icon: "error"
          }) 
        }
        

    };

    return( 
      <div className={styles.imgfondo} style={{ backgroundImage: "url('https://scontent-bcn1-1.xx.fbcdn.net/v/t39.30808-6/326342168_852036582572276_1342480683664754514_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qLBF2A6IfTMQ7kNvgFtyMtT&_nc_ht=scontent-bcn1-1.xx&oh=00_AYDH22A6JVJwKiwzaDVoYkrHNrWSajHKleNzw5Zb-zcy2g&oe=664FFB96')" }}>
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
                   <Link to="/login">
                      <div className={styles.yaEresUsuario}>¿Ya eres usuario? Accede</div>
                  </Link>
            </form>
        </div>
        </div>
   </div>
    );
};
export default Registro