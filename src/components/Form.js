import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="nameCart">
          Nome da carta
          <input type="text" id="nameCart" name="nameCart" data-testid="name-input" />
        </label>
        <label htmlFor="descriptionCart">
          Descrição da carta
          <textarea
            id="descriptionCart"
            name="descriptionCart"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="attribute1">
          <input
            type="number"
            id="attribute1"
            name="attribute1"
            data-testid="attr1-input"
          />
        </label>
        <label htmlFor="attribute2">
          <input
            type="number"
            id="attribute2"
            name="attribute2"
            data-testid="attr2-input"
          />
        </label>
        <label htmlFor="attribute3">
          <input
            type="number"
            id="attribute3"
            name="attribute3"
            data-testid="attr3-input"
          />
        </label>
        <label htmlFor="imageCart">
          Imagem da carta
          <input
            type="text"
            id="imageCart"
            name="imageCart"
            data-testid="image-input"
          />
        </label>
        <label htmlFor="rarity">
          Raridade da carta
          <select
            id="rarity"
            name="rarity"
            type="select"
            data-testid="rare-input"
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
        </label>
        <label htmlFor="superTrunfo">
          <select
            id="superTrunfo"
            name="superTrunfo"
            type="checkbox"
            data-testid="trunfo-input"
          >
            Super Trunfo
          </select>
        </label>
        <button type="button" onClick="" data-testid="save-button">Salvar</button>
      </form>
    );
  }
}

export default Form;
