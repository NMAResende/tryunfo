import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      saveCards: [],
      hasTrunfo: false,
    };
  }

  handleClearButtun = () => {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
    });
  };

  handleTrunfo = () => {
    const { saveCards } = this.state;
    const trunfo = saveCards.some((card) => card.cardTrunfo);
    this.setState({
      hasTrunfo: trunfo,
    });
  };

  // Graças ao João e Sumo na mentoria
  handleDelete = (item) => {
    // e.preventDefault();
    const { saveCards, hasTrunfo } = this.state;
    // const { cardName } = e.target;
    const delet = saveCards.filter((card) => card.cardName !== item);
    this.setState({
      saveCards: delet,
      hasTrunfo: !hasTrunfo });
  };

  onSaveButtonClick = (e) => {
    e.preventDefault();
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardTrunfo,
      hasTrunfo,
    } = this.state;
    const newCard = { cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardTrunfo,
      hasTrunfo,
    };
    this.setState((prev) => ({
      saveCards: [...prev.saveCards, newCard] }), this.handleTrunfo);
    this.handleClearButtun();
  };

  handleInputs = () => {
    const { cardName, cardDescription, cardImage, cardRare } = this.state;
    if (cardName !== '' && cardDescription !== ''
    && cardImage !== '' && cardRare !== '') {
      return true;
    }
  };

  handleSumAttr = () => {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const positive = 0;
    const maxAttr = 90;
    const max = 210;
    // Referência: https://pt.stackoverflow.com/questions/268673/converter-string-em-number
    const verificarPositivo = Number(cardAttr1) >= positive
    && Number(cardAttr2) >= positive
    && Number(cardAttr3) >= positive;

    const verificarMax = Number(cardAttr1) <= maxAttr
    && Number(cardAttr2) <= maxAttr
    && Number(cardAttr3) <= maxAttr;

    const sum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const total = sum <= max;
    if (verificarPositivo && verificarMax && total) {
      return true;
    }
  };

  isSaveButton = () => {
    this.setState({
      isSaveButtonDisabled: !(this.handleInputs() && this.handleSumAttr()),
    });
  };

  onInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    const check = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: check,
    }, () => this.isSaveButton());
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      saveCards,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo Turma da Mônica</h1>
        <Form
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
          isSaveButton={ this.isSaveButton }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          hasTrunfo={ hasTrunfo }
          handleTrunfo={ this.handleTrunfo }
        />
        <Card
          onInputChange={ this.onInputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        {/* Graças ao Tiago na mentoria */}
        <div>
          {saveCards.map((cardList, index) => (
            <div key={ index }>
              <Card
                key={ index }
                cardName={ cardList.cardName }
                cardDescription={ cardList.cardDescription }
                cardAttr1={ cardList.cardAttr1 }
                cardAttr2={ cardList.cardAttr2 }
                cardAttr3={ cardList.cardAttr3 }
                cardImage={ cardList.cardImage }
                cardRare={ cardList.cardRare }
                cardTrunfo={ cardList.cardTrunfo }
                handleDelete={ this.handleDelete }
              />
              <button
                key={ `button ${cardList.cardName}` }
                onClick={ () => this.handleDelete(cardList.cardName) }
                type="button"
                data-testid="delete-button"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
