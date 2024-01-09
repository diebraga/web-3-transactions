import { AlertType } from "./@types";
import {
  Alert,
  Footer,
  Navbar,
  Services,
  Transactions,
  Welcome,
} from "./components";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useTransactions } from "./hooks/useTransaction";

function App() {
  const { isMetamaskInstalled, toggleMetamaskAlert } = useTransactions();
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        {!isMetamaskInstalled && (
          <div className="flex justify-center w-full">
            <div className="p-4 max-w-[900px] w-full">
              <Alert
                isVisible
                type={AlertType.Danger}
                content="Please download Metamask extension"
                icon={<IoAlertCircleOutline />}
                onClose={toggleMetamaskAlert}
              />
            </div>
          </div>
        )}

        <Welcome />
        <Services />
        <Transactions />
      </div>
      <Footer />
    </div>
  );
}

export default App;
