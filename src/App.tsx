import { useState, useEffect } from "react";
import Moment from 'react-moment';
// import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import socketIOClient from "socket.io-client";
import moment from "moment";

import './index.css';

const ENDPOINT = "https://powerful-citadel-18328.herokuapp.com/";

interface MintDetail {
  blockTime: any;
  tokenAddress: string;
  signature: string;
  image?: string;
  name?: string;
}
const socket = socketIOClient(ENDPOINT);

function App() {
  const [ mints, setMints ] = useState<MintDetail[]>([]);
  const [ paused, setPaused ] = useState<boolean>(false);

  // const handlerMinted = ( details: MintDetail ) => setMints( prevMinted => [details, ...prevMinted ] )  
  useEffect( () => {
    paused ? socket.off("nft:Emitted") : socket.on("nft:Emitted", ( details: MintDetail ) => setMints( prevMinted => [details, ...prevMinted ] ) );
  }, [paused]);
  
  return (
    <div className="flex overflow-hidden">
      <nav className="side-nav">
        <ul>
          <li>
            <a href="/" className="side-menu">Mint Live</a>
          </li>
        </ul>
      </nav>
      <div className="content">
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4 bg-white shadow rounded-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold leading-none text-gray-900">Latest Minted</h3>
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200" onMouseOver={ () => setPaused(true) } onMouseLeave={ () => setPaused(false) }>
              {mints.map( ( mint ) => (
                <li key={mint.tokenAddress} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="h-8 w-8 rounded-full" src={mint.image} alt={mint.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <a href={`https://explorer.solana.com/address/${mint.tokenAddress}`} target="_blank" className="text-sm font-medium text-gray-900 truncate">
                        {mint.name} - <Moment interval={1000} fromNow>{moment.unix( mint.blockTime )}</Moment>
                      </a>
                    </div>
                    <div className="flex flex-col items-center text-base font-semibold text-gray-900">
                      <a rel="noreferrer" target="_blank" title="Vai a LMNT" href={`https://explorer.solana.com/tx/${mint.signature}`}>
                        TX
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