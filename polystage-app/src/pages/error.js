import React from "react";
import img from "./../img/404.jpg";
import "./../styles/bootstrap.min.css";
import "./../styles/custom.css";

function Error() {
    return (
        <div class="div-404 d-flex justify-content-center align-items-center">
            <img src={img} class="img-404" alt="Page non trouvée" />
        </div>
    );
}
export default Error;