import React from "react"
import Calendly from "../component/calendar"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { Context } from "../store/appContext";

import styles from "../../styles/admin.module.css";
import AddContent from "../component/addComponent";
import GCalendar from "../component/GCalendar";

export const Admin = () => {
  const { store, actions } = useContext(Context);
  console.log("USER", store.users)

  /*const deleteUser = (id) => {
    fetch(``, {
      method: "GET",
    })
    .then(response => response.json())
    setTimeout(() => {
      window.location.reload();
    }, 250);
  };*/



  return (
    <div className="container-fluid" style={{ backgroundColor: '#0A0E1A'}}>
      <div className="row ms-5">
        <div className="col-md-6">
          <div className="text-center mt-5">
            <div className={styles.card1}>
              <div className={styles.titulo1}>
                <h2>VISTA DE USUARIOS</h2>
                <ul className="card-list p-0">
                  {store.users.length === 0 ? <h3 className="mt-4">No hay ningún usuario</h3> :
                    store.users.map((user, index) => (
                      <div className="container user-card" key={user.user_id}>
                        <div className="row no-gutters mb-2">
                          <div className="col-md-12">
                            <div className="d-flex justify-content-evenly">
                              <div className="card-body">
                                <h5 className="card-title">
                                  {user.name} {user.last_name}</h5>
                              </div>
                              <button type="button" class="btn text-light" data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`}>
                              <i class="fa-solid fa-arrow-right"></i>
                              </button>
                            </div>
                            <div class="modal fade" id={`exampleModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title text-dark" id={`exampleModal${index}`}>{user.name} {user.last_name}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body text-dark">
                                    <p>Email: {user.user.email}</p>
                                    <p>Edad: {user.age}</p>
                                    <p>Genero: {user.genre}</p>
                                    <p>Altura: {user.height}</p>
                                    <p>Lesión: {user.injury}</p>
                                    <p>Información adicional: {user.additional_info}</p>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <div className={styles.card1}>
              <div className={styles.titulo1}>
                <h2>VISTA DE CONTENIDO</h2>
                <div><AddContent /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-5">
          <div className="text-center mt-5">
            <div className="align-items-center">
              <GCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


