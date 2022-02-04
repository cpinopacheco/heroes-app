import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../selectors/getHeroByName";
import { HeroCard } from "../hero/HeroCard";
import queryString from "query-string";
import { useMemo } from "react";

/* el hook useForm toma el valor del input */

export const SearchScreen = () => {
  const navigate = useNavigate(); //useNavigate se importa
  const location = useLocation(); //useLocation se importa
  const { q = "" } = queryString.parse(location.search);

  /* el customHook useForm espera el estado inicial como parametro, se importa*/
  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = formValues;

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `?q=${searchText}`
    ); /* asignamos el query paramas con el uso se useNavigate() */
  };

  return (
    <>
      <h1>Búsquedas</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar un héroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            />

            <button className="btn btn-outline-primary mt-2" type="submit">
              Buscar
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Resultados</h4>
          <hr />
          {q === "" ? (
            <div className="alert alert-info">Buscar un héroe</div>
          ) : (
            heroesFiltered.length === 0 && (
              <div className="alert alert-danger">
                No hay resultados para: {q}
              </div>
            )
          )}
          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
