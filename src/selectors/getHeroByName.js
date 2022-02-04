import { heroes } from "../data/heroes";

export const getHeroesByName = (name = "") => {
  /* Si name no tiene valor, retornamos un array vacio y no se renderiza nada */
  if (name === "") {
    return [];
  }

  name = name.toLocaleLowerCase();

  return heroes.filter((hero) =>
    hero.superhero.toLocaleLowerCase().includes(name)
  );

  //return heroes;
};
