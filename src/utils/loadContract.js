// import { ethers } from "ethers";
import { toast } from "react-toastify";

async function loadContract(signer, chainId, setContract, address) {
  if (chainId !== 1) {
    toast.error(
        "Please Change your network to Ethereum"
    );
    return;
  }

}

export default loadContract;