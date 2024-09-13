import { Animal } from "./animal";

const LEAO = new Animal("LEAO", 3, ["savana"], true);
const LEOPARDO = new Animal("LEOPARDO", 2, ["savana"], true);
const CROCODILO = new Animal("CROCODILO", 3, ["rio"], true);
const MACACO = new Animal("MACACO", 1, ["savana", "floresta"], false);
const GAZELA = new Animal("GAZELA", 2, ["savana"], false);
const HIPOPOTAMO = new Animal("HIPOPOTAMO", 4, ["savana", "rio"], false);

const ANIMAIS_VALIDOS = [LEAO, LEOPARDO, CROCODILO, MACACO, GAZELA, HIPOPOTAMO];

export {
  ANIMAIS_VALIDOS,
  CROCODILO,
  GAZELA,
  HIPOPOTAMO,
  LEAO,
  LEOPARDO,
  MACACO,
};
