import { Footer, Navbar, Services, Transactions, Welcome } from "./components";

function App() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
        <Services />
        <Transactions />
      </div>
      <Footer />
    </div>
  );
}

export default App;
