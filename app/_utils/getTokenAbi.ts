import { sepolia } from "viem/chains";

import { daiAbi as sepoliaDai } from "../_services/sepolia/dai/abi";
import { usdcAbi as sepoliaUsdc } from "../_services/sepolia/usdc/abi";
import { daiAbi as amoyDai } from "../_services/amoy/dai/abi";
import { usdcAbi as amoyUsdc } from "../_services/amoy/usdc/abi";

export function getTokenAbi(chainId: number, token: "DAI" | "USDC") {
  return chainId === sepolia.id
    ? token === "DAI"
      ? sepoliaDai
      : sepoliaUsdc
    : token === "DAI"
    ? amoyDai
    : amoyUsdc;
}
