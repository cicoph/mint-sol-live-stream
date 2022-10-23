import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

import NftCard from './utils/NftCard';
import Nft from './utils/Nft';

const SERVER_URL = process.env.REACT_APP_SERVER_URL
const socket = socketIOClient( `${SERVER_URL}` );

const NftsList = () => {
    const [ paused, setPaused ] = useState<boolean>(false);
    const [ nfts, setNfts ] = useState<Nft[]>([]);

    useEffect( () => {
        const handlerMinted = ( nft: Nft ) => setNfts( prevNfts => [ nft, ...prevNfts ] );
        paused ? socket.off('nft:New', handlerMinted) : socket.on('nft:New', handlerMinted);
        return () => {
            socket.off('nft:New', handlerMinted);
        }
    }, [ paused ] );
    
    return (
        <section>
            <div className="flex items-center justify-start mb-4">
                <span className="h-3 w-3 relative mr-2">
                    <span className={ `${( paused ? 'bg-yellow-400' : 'bg-green-400' )} absolute animate-ping inline-flex h-full w-full rounded-full opacity-75`}></span>
                    <span className={ `${( paused ? 'bg-yellow-400' : 'bg-green-400' )} absolute inline-flex rounded-full h-3 w-3`}></span>
                </span>
                <h3 className="text-xl font-bold leading-none text-gray-900">
                    Live Mint
                </h3>
            </div>
            <div className="flow-root">
                <div
                    className="divide-y divide-gray-200"
                    onMouseOver={ () => setPaused(true) } 
                    onMouseLeave={ () => setPaused(false) }
                >
                    { nfts.map( ( nft: any ) => (
                        <NftCard key={ nft.address } nft={ nft } />
                    ))}
                </div>
            </div>
        </section>

    );
};
 
export default NftsList;