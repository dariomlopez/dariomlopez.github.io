import "./App.css";
import styled from "styled-components";


function App() {
  return (
    <div className="container">
    <h1 className="title">Password Generator</h1>
    
      <form>
        <Row>
          <label>Número de caracteres:</label>
          <Control>
            <Button>-</Button>
            <span>0</span>
            <Button>+</Button>
          </Control>
        </Row>
        <Row>
          <label>Incluir simbolos</label>
          <Button>Sí</Button>
        </Row>
      </form>
    
    </div>
  );
}

export default App;

const Row = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  background: #684BFF;
  color: #fff;
  font-size: 2rem;
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 1s ease;

  &:hover {
    background: #866FFD;
  }
`;


const Control = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;

  & > * {
    flex: 1;
  }

  span {
    line-height: 40px;
    background: #33257E;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-radius: 5px;
  }
`;