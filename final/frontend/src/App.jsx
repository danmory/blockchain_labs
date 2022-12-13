import { Main } from "./components/Main";

function App() {
  window.ethereum.on('accountsChanged', function (accounts) {
    window.location.reload();
  })
  return (
      <Main />
  );
}

export default App;
