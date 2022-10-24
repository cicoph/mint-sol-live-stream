interface Project {
    _id: Object;
    symbol?: string;
    cm_address: string;
    creator?: [any];
    latestUpdate: Date;
    description?: string;
    name?: string;
    nftsMinted?: [any];
    image?: string;
    platform?: string;
    price?: number;
    maxSupply?: number;
    itemsMinted?: number;
}

export default Project;
