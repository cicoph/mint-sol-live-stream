import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

import NftCard from './utilis/NftCard';
import Nft from './utilis/Nft';
import dotenv from 'dotenv'
dotenv.config()

const { SOCKET_URL } = process.env // "https://powerful-citadel-18328.herokuapp.com/";
const socket = socketIOClient( `${SOCKET_URL}` );

const NftsList = () => {
    const [ paused, setPaused ] = useState<boolean>(false);
    const [ nfts, setNfts ] = useState<Nft[]>([]);
    // const [ size, setSize ] = useState<number>(50);
    useEffect( () => {
        paused ? socket.off("nft:Minted") : socket.on("nft:Minted", ( nft: Nft ) => handlerMinted( nft ) );
    }, [paused]);
    useEffect( () => {
        socket.on("projects:Added", result => console.log( result ) )
    },[]);
    
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
                <NftCard key={ nft.address } nft={ nft } />
            ))}
        </div>
    );
};
 
export default NftsList;