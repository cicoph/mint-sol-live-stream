interface Project {
    _id: Object;
    project_symbol?: string;
    cm_address: string;
    creator?: [any];
    latest_update: Date;
    description?: string;
    project_collection?: string;
    nfts_minted?: [any];
    image?: string;
    platform?: string;
}

export default Project;
