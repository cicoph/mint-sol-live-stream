import React from "react";
// import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import NftsList from "./nft-list/NftsList";
import ProjectsList from "./project-list/ProjectsList";
import Grid from "./grid/Grid";
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
        <div className="grid grid-cols-12 gap-6 mt-5">
          <Grid title="Latest Projects Mint">
            <ProjectsList />
          </Grid>
          <Grid title="Latest Mint">
            <NftsList />
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default App;