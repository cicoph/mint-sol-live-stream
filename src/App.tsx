import { useState, useEffect } from "react";
// import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import socketIOClient from "socket.io-client";
import moment from "moment";

import './index.css';

const ENDPOINT = "https://powerful-citadel-18328.herokuapp.com/";

interface MintDetail {
  blockTime: number;
  tokenAddress: string;
  signature: string;
  description: string;
  image?: string;
  name?: string;
  symbol: string;
  collection?: string;
  creator?: string;
  time: string;
}
const socket = socketIOClient(ENDPOINT);

function App() {
  const [ mints, setMints ] = useState<MintDetail[]>([]);
  const handlerMinted = ( details: MintDetail ) => {
    details.time = moment.unix( details.blockTime ).fromNow();
    setMints( prevMinted => [details, ...prevMinted ] )  
  }
  useEffect( () => {
    socket.on("nft:emitted", details => handlerMinted( details ) );
  }, []);

  return (
    <div className="flex overflow-hidden">
      <nav className="side-nav">
        <ul>
          <li>
            <a href="javascript:;" className="side-menu">Mint Live</a>
          </li>
        </ul>
      </nav>
      <div className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64 px-4">
        <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
          <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold leading-none text-gray-900">Latest Mint</h3>
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200">
              {mints.map( ( mint ) => (
                <li key={mint.tokenAddress} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="h-8 w-8 rounded-full" src={mint.image} alt={mint.collection} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {mint.symbol} - {mint.name} - {mint.time}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {mint.description}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      <a rel="noreferrer" target="_blank" title="Vai a LMNT" href={mint.creator} >
                        LMNFT
                      </a>
                    </div>
                  </div>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    
  );
}

export default App;
