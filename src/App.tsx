import React from "react";
// import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import NftsList from "./liveStream/NftsList"
import './index.css';

function App() {  
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
        <NftsList />
      </div>
    </div>
  );
}

export default App;