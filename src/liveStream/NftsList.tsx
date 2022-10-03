import { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";
import NftCard from './NftCard';
import Nft from './Nft';

const ENDPOINT = "https://powerful-citadel-18328.herokuapp.com/";
const socket = socketIOClient(ENDPOINT);

const NftsList = () => {
    const [ paused, setPaused ] = useState<boolean>(false);
    const [ nfts, setNfts ] = useState<Nft[]>([]);
    useEffect( () => {
        paused ? socket.off("nft:Emitted") : socket.on("nft:Emitted", ( nft: Nft ) => handlerMinted( nft ) );
    }, [paused]);

    const handlerMinted = ( nft: Nft ) => setNfts( prevNfts => [ nft, ...prevNfts ] );
    
    //if (!nfts) return null;
    
    return (
        <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4 bg-white shadow rounded-md p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold leading-none text-gray-900">Latest Minted</h3>
                </div>
                <div className="flow-root">
                    <div
                        className="divide-y divide-gray-200"
                        onMouseOver={ () => setPaused(true) } 
                        onMouseLeave={ () => setPaused(false) }>
                        { nfts.map( ( nft: any ) => (
                            <NftCard key={ nft.tokenAddress } nft={ nft } />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default NftsList;