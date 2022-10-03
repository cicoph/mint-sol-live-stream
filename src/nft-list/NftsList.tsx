import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

import NftCard from './utilis/NftCard';
import Nft from './utilis/Nft';

const ENDPOINT = "https://powerful-citadel-18328.herokuapp.com/";
const socket = socketIOClient(ENDPOINT);

const NftsList = () => {
    const [ paused, setPaused ] = useState<boolean>(false);
    const [ nfts, setNfts ] = useState<Nft[]>([]);
    // const [ size, setSize ] = useState<number>(50);
    useEffect( () => {
        paused ? socket.off("nft:Emitted") : socket.on("nft:Emitted", ( nft: Nft ) => handlerMinted( nft ) );
    }, [paused]);
    
    const handlerMinted = ( nft: Nft ) => setNfts( prevNfts => [ nft, ...prevNfts ] );

    // useEffect( () => {
    //     setSize(nfts.length);
    // },[nfts]);
    
    //if (!nfts) return null;
    
    return (
        <div
            className="divide-y divide-gray-200"
            onMouseOver={ () => setPaused(true) } 
            onMouseLeave={ () => setPaused(false) }>
            { nfts.map( ( nft: any ) => (
                <NftCard key={ nft.tokenAddress } nft={ nft } />
            ))}
        </div>
    );
};
 
export default NftsList;