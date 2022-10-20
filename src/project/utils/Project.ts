interface Project {
    _id: Object;
    name?: string;
    cm_address: string;
    creator?: [any];
    latest_update: Date;
    description?: string;
    nfts_minted?: [any];
    image?: string;
    platform?: string;
}

export default Project;
