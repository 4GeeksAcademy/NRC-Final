import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate, BrowserRouter, Link } from "react-router-dom";
import { Context } from "../store/appContext";

import styles from "../../styles/login.module.css";

import { jwtDecode } from 'jwt-decode';

export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        "email": "",
        "password": ""
    })

    const handleLogin = async () => {
        await actions.login(user);
        const access_token = JSON.parse(localStorage.getItem("token"))
        const access_key = access_token.access_token
        const decodedToken = jwtDecode(access_key);
        const userId = decodedToken.user_id;
        store.user_id = userId
        const userRol = decodedToken.rol;
        if (userRol === `admin`) {
            navigate(`/admin`);
        } else {
            navigate(`/user`);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await handleLogin()
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <div className={styles.imgfondo} style={{ backgroundImage: "url('https://scontent-bcn1-1.xx.fbcdn.net/v/t39.30808-6/326342168_852036582572276_1342480683664754514_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qLBF2A6IfTMQ7kNvgFtyMtT&_nc_ht=scontent-bcn1-1.xx&oh=00_AYDH22A6JVJwKiwzaDVoYkrHNrWSajHKleNzw5Zb-zcy2g&oe=664FFB96')" }}>
            <div className={styles.forms}>
                <div className={styles.login}>
                    <h2>Acceso</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.email}>
                            <label htmlFor="emailId" className="form-label d-none">Email</label>
                            <input type="email"
                                className={`${styles.customInput} `}
                                id="emailId"
                                aria-describedby="emailHelp"
                                onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                                placeholder="Email" />
                        </div>
                        <div className={styles.password}>
                            <label htmlFor="passwordId" className="form-label d-none">Password</label>
                            <input type="password"
                                className={`${styles.customInput} `}
                                id="passwordId"
                                onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                                placeholder="Contraseña" />
                        </div>
                        <button type="submit" className={styles.button} onClick={handleLogin}>Acceder <i className="fas fa-long-arrow-alt-right"></i></button>
                        <Link to="/registro">
                            <div className={styles.noUser}>¿No eres usuario? Registrate</div>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};
