import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

import NftCard from './utils/NftCard';
import Nft from './utils/Nft';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL
const socket = socketIOClient( `${SOCKET_URL}` );

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
        <div
            className="divide-y divide-gray-200"
            onMouseOver={ () => setPaused(true) } 
            onMouseLeave={ () => setPaused(false) }
        >
            <span className="absolute h-5 w-5 top-5 left-1">
                <span className={ `${( paused ? 'bg-yellow-400' : 'bg-green-400' )} absolute animate-ping inline-flex h-full w-full rounded-full opacity-75`}></span>
                <span className={ `${( paused ? 'bg-yellow-400' : 'bg-green-400' )} relative inline-flex rounded-full h-5 w-5`}></span>
            </span>
            { nfts.map( ( nft: any ) => (
                <NftCard key={ nft.address } nft={ nft } />
            ))}
        </div>
    );
};
 
export default NftsList;