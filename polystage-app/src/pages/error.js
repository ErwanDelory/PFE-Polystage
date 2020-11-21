import React from 'react';
import { Link } from 'react-router-dom';
import img from './../img/404.jpg';

function Error() {
  return (
    <div>
      <img src={img} class="img-404" alt="Page non trouvée" />
      <Link to="/">Retourner à l'accueil !</Link>
    </div>
  );
}
export default Error;
