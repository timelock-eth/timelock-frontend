import "./App.css";
import { useEffect, useState } from "react";
import connectWallet from "../../utils/connectWallet";
import loadContract from "../../utils/loadContract";
import HomePage from "../HomePage";
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import GlobalContext from "../../context/Global";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState({
    address: null,
    balance: null,
    chainID: null,
  });

  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")) {
      handleConnectWallet();
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleConnectWallet = async () => {
    const connection =
        await connectWallet(handleConnectWallet);

    if (connection._signer) {
      await loadContract(
          connection._signer,
          connection._chainId,
          setContract,
          connection._address
      );
    }

    console.log("connection._signer", connection._signer);

    setProvider(connection._provider);
    setSigner(connection._signer);
    setAccount({
      address: connection._address,
      balance: connection._balance,
      chainID: connection._chainId,
    });
  };

  return (
      <div className="app-wrapper">
        <GlobalContext.Provider
            value={ {
              provider,
              setProvider,
              signer,
              setSigner,
              account,
              setAccount,
              handleConnectWallet,
              contract,
              setContract,
              loading,
              setLoading,
            } }
        >
          { !loading ? (
              <div>
                <Header />
                {/*<ToastContainer*/ }
                {/*    position="top-center"*/ }
                {/*    theme="dark"*/ }
                {/*    toastStyle={{*/ }
                {/*      backgroundColor: "#1e40af",*/ }
                {/*      fontWeight: "bold",*/ }
                {/*      fontFamily: "poppins",*/ }
                {/*      borderRadius: "5rem",*/ }
                {/*    }}*/ }
                {/*/>*/ }
                <ToastContainer
                    position="top-center"
                    // theme="dark"
                    // toastStyle={{
                    //   backgroundColor: "#1e40af",
                    //   fontWeight: "bold",
                    //   fontFamily: "poppins",
                    //   borderRadius: "5rem",
                    // }}
                />
                <div className="screen-wrapper">
                    <Routes>
                      <Route exact path ="/" element={<HomePage />} />
                    </Routes>
                </div>
                {/*<div className="flex justify-center items-end">*/}
                {/*  <Footer />*/}
                {/*</div>*/}
              </div>
          ) : (
              <Loading />
          ) }
        </GlobalContext.Provider>
      </div>
  );
}

export default App;
