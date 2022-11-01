import React from "react";
// import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import NftsList from "./nft-list/NftsList";

import ProjectsList from "./project/ProjectsList";

import ProjectDetails from "./project/ProjectDetails";
import Project from "./project/utils/Project";
import Grid from "./grid/Grid";
import './index.css';

function App() {  
  const [ projectDetail, setProjectDetail ] = React.useState<null | Project>(null)

  return (
    <div className="flex overflow-hidden">
      <div className="content">
        <div className="grid grid-cols-12 gap-0 mt-5 bg-white shadow rounded-md">
          <Grid size={`col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-4 p-6`}>
            <ProjectsList projectSelected={ (project: Project) => setProjectDetail( project )}/>
          </Grid>
          <Grid size={`col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-5 p-6 bg-slate-50 border-x border-gray-100`}>
            <ProjectDetails project={ projectDetail }/>
          </Grid>
          <Grid size={`col-span-12 sm:col-span-12 md:col-span-2 lg:col-span-3 xl:col-span-3 p-6 h-screen max-h-screen overscroll-contain`}>
            <NftsList />
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default App;