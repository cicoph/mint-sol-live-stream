interface Project {
    _id: Object;
    symbol?: string;
    candyMachineId: string;
    creator?: [any];
    latestUpdate: Date;
    description?: string;
    name?: string;
    nfts: [any];
    image?: string;
    platform?: string;
    price?: number;
    itemsAvaiable?: number;
    itemsMinted?: number;
    externalUrl: [string];
    goLiveDate: number;
}

export default Project;
