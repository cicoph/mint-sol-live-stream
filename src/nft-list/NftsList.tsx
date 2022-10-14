import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

import NftCard from './utilis/NftCard';
import Nft from './utilis/Nft';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL
console.log( SOCKET_URL)
const socket = socketIOClient( `${SOCKET_URL}` );

const NftsList = () => {
    const [ paused, setPaused ] = useState<boolean>(false);
    const [ nfts, setNfts ] = useState<Nft[]>([]);
    // const [ size, setSize ] = useState<number>(50);

    // useEffect( () => {
    //     const handlerMinted = ( nft: Nft ) => setNfts( prevNfts => [ nft, ...prevNfts ] );
    //     paused ? socket.off('nft:New', handlerMinted) : socket.on('nft:New', ( nft: Nft ) => handlerMinted( nft ) );
    //     // Otherwise you'll start getting errors when the component is unloaded
    //     return () => {
    //         socket.off('nft:New', handlerMinted)
    //     }
    // }, [paused]);
    useEffect( () => {
        const handlerMinted = ( nft: Nft ) => setNfts( prevNfts => [ nft, ...prevNfts ] );
        console.log( paused )
        paused ? socket.off('nft:New', handlerMinted) : socket.on('nft:New', handlerMinted);
        return () => {
            socket.off('nft:New', handlerMinted);
        }
    }, [ paused ] ); //
    
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