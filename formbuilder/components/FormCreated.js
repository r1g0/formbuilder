import React from "react";
import { Link } from "react-router";
import {getUserToken, getUserURL, getAdminURL} from "../utils";
import URLDisplay from "./URLDisplay";

export default function FormCreated(props) {

  return (
    <form>
      <h3>Encuesta creada con éxito.</h3>
      <p>Ya esta disponible para utilizarla en la aplicación Android.</p>
      <Link to="/builder/" >
         <a onClick={() => props.resetForm()}>
          NUEVA ENCUESTA
        </a>
      </Link>
    </form>
  );
}
