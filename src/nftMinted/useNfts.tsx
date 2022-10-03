import { useEffect, useState } from 'react';
import Nft from './Nfts';
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://powerful-citadel-18328.herokuapp.com/";
const socket = socketIOClient(ENDPOINT);
 
function useNfts ( paused: boolean ) {
    const [nfts, setNfts] = useState<Nft[]>([]);
    useEffect( () => {
        paused ? socket.off("nft:Emitted") : socket.on("nft:Emitted", ( nft: Nft ) => handlerMinted( nft ) );
    }, [paused]);

    const handlerMinted = ( nft: Nft ) => setNfts( prevNfts => [nft, ...prevNfts ] );

    return {
        nfts,
    };
}
 
export default useNfts;