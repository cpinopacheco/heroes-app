import { useMemo } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { getHeroById } from "../../selectors/getHeroById";

export const HeroScreen = () => {
  const { heroeId } = useParams();

  const navigate = useNavigate();

  /* 
    hook useMemo memoriza valores. 
    el primer paramemtro es el valor que quiero memorizar, el retorno de la funcion es lo que se memoriza
    el segundo parametro es la dependencia que se va a evaluar si cambia.
    useMemo(() => first, second);
  */
  const hero = useMemo(() => getHeroById(heroeId), [heroeId]);

  const { id, superhero, publisher, alter_ego, first_appearance, characters } =
    hero;

  if (!hero) {
    return <Navigate to="/" />; //redirigimos al usuario de la vista si introduce una url que no existe.
  }

  const imagePath = `/assets/${id}.jpg`;

  const handleReturn = () => {
    /* navigate no solo puede resibir un string como parametro. Si le pasamos un -1 hace que se vuelva a la pogina anterior */
    navigate(-1);
  };

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={imagePath}
          alt={superhero}
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>

      <div className="col-8 animate__animated animate__fadeIn">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego: </b>
            {alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher: </b>
            {publisher}
          </li>
          <li className="list-group-item">
            <b>First Appearance: </b>
            {first_appearance}
          </li>
        </ul>
        <h5 className="mt-3">Characters</h5>
        <p>{characters}</p>

        <button className="btn btn-outline-info" onClick={handleReturn}>
          Rergresar
        </button>
      </div>
    </div>
  );
};
