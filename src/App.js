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
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      saveCards: [],
    };
  }

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
    } = this.state;
    const newCard = { cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    };
    this.setState((prev) => ({ saveCards: [...prev.saveCards, newCard] }));
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
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
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
        />
        <Card
          onInputChange={ this.onInputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
      </div>
    );
  }
}

export default App;
