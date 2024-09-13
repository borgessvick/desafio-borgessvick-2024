import { ANIMAIS_VALIDOS, GAZELA, LEAO, MACACO } from "./constants";
import { Recinto } from "./recinto";

class RecintosZoo {
  #recintos = [
    new Recinto(1, 10, ["savana"], { animal: MACACO, quantidade: 3 }),
    new Recinto(2, 5, ["floresta"]),
    new Recinto(3, 7, ["savana", "rio"], { animal: GAZELA, quantidade: 1 }),
    new Recinto(4, 8, ["rio"]),
    new Recinto(5, 9, ["savana"], { animal: LEAO, quantidade: 1 }),
  ];

  analisaRecintos(especie, quantidade) {
    if (quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const animal = ANIMAIS_VALIDOS.find((animal) => animal.especie === especie);
    if (!animal) {
      return { erro: "Animal inválido" };
    }

    const recintosViaveis = this.#recintos
      .map((recinto) => recinto.verificaRecintoViavel(animal, quantidade))
      .filter((recinto) => !!recinto);

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis: recintosViaveis };
  }
}

export { RecintosZoo as RecintosZoo };
