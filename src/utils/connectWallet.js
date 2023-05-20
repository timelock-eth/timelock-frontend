import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {},
    opera: {
      package: true,
    },
  },
};

async function connectWallet(handleConnectWallet) {
  try {
    // Web3Modal
    const web3modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
      theme: {
        background: "#00256C",
        main: "#FFF",
        secondary: "#FFF",
        border: "#00256C",
        hover: "#00259F",
      },
    });

    const web3modalInstance = await web3modal.connect();

    //Provider and Signer
    const _provider = new ethers.providers.Web3Provider(web3modalInstance);

    const _signer = _provider.getSigner();

    //Account
    let _address = await _provider.getSigner().getAddress();
    let _balance = ethers.utils.formatEther(
        await _provider.getSigner().getBalance()
    );
    const { chainId } = await _provider.getNetwork();
    const _chainId = chainId;

    //Events
    _provider.provider.on("accountsChanged", () => {
      console.log('changed')
      handleConnectWallet();
    });

    _provider.provider.on("chainChanged", () => {
      handleConnectWallet();
    });

    _provider.provider.on("connect", () => {
      console.log('connect')
      handleConnectWallet();
    });

    _provider.provider.on("disconnect", () => {
      console.log('disconnect')
      handleConnectWallet();
    });

    // _provider.provider.on("accountDiscone", (chainId) => {
    //   handleConnectWallet();
    // });

    // Subscribe to provider disconnection
    _provider.provider.on("disconnect", async (error) => {
      await web3modal.clearCachedProvider();
    });
    console.log("success");

    return {
      _provider,
      _signer,
      _address,
      _balance,
      _chainId,
    };
  } catch (error) {
    console.error(error);
    console.log("Huh?!");

    return {
      _provider: null,
      _signer: null,
      _address: null,
      _balance: null,
      _chainId: null,
    };
  }
}

export default connectWallet;