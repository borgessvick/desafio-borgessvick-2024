import { HIPOPOTAMO, MACACO } from "./constants";

class Recinto {
  #animais = [];

  constructor(nro, valorTotal, biomas, lote) {
    this.nro = nro;
    this.valorLivre = valorTotal;
    this.valorTotal = valorTotal;
    this.biomas = biomas;
    if (lote) {
      this.#adicionarAnimal(lote.animal, lote.quantidade);
    }
  }

  verificaRecintoViavel(animal, quantidade) {
    if (!this.#verificaRegraBioma(animal)) {
      return;
    }
    if (!this.#verificaRegraMacaco(animal, quantidade)) {
      return;
    }
    if (!this.#verificaRegraHipopotamo(animal)) {
      return;
    }
    const temEspecieDiferente = this.#animais.some(
      ({ especie }) => especie !== animal.especie
    );
    if (!this.#verificaRegraCarnivoro(animal, temEspecieDiferente)) {
      return;
    }
    const valorRestante = this.#getValorRestante(
      animal,
      quantidade,
      temEspecieDiferente
    );
    if (valorRestante < 0) {
      return;
    }

    return `Recinto ${this.nro} (espaço livre: ${valorRestante} total: ${this.valorTotal})`;
  }

  #verificaRegraBioma(animal) {
    return animal.biomas.some((bioma) => this.biomas.includes(bioma));
  }

  #verificaRegraMacaco(animal, quantidade) {
    return (
      animal.especie !== MACACO.especie ||
      this.#animais.length ||
      quantidade > 1
    );
  }

  #verificaRegraHipopotamo(animal) {
    const temHipopotamo = this.#animais.some(
      ({ especie }) => especie === HIPOPOTAMO.especie
    );
    if (!temHipopotamo && animal.especie !== HIPOPOTAMO.especie) {
      return true;
    }
    const saoHipopotamos = this.#animais.every(
      ({ especie }) => especie === HIPOPOTAMO.especie
    );
    if (
      animal.especie === HIPOPOTAMO.especie &&
      (saoHipopotamos || !this.#animais.length)
    ) {
      return true;
    }

    return this.biomas.some((bioma) => ["savana", "rio"].includes(bioma));
  }

  #verificaRegraCarnivoro(animal, temEspecieDiferente) {
    const temCarnivoro = this.#animais.some(({ carnivoro }) => carnivoro);
    return !(temEspecieDiferente && (animal.carnivoro || temCarnivoro));
  }

  #getValorRestante(animal, quantidade, temEspecieDiferente) {
    const tamanho = animal.tamanho * quantidade;
    return this.valorLivre - tamanho - temEspecieDiferente;
  }

  #adicionarAnimal(animal, quantidade) {
    this.valorLivre = this.valorLivre - animal.tamanho * quantidade;
    this.#animais.push(...new Array(quantidade).fill(animal));
  }
}

export { Recinto as Recinto };
