import { useState, useEffect } from "react";

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import './index.css';

interface MintDetail {
  tokenAddress: string;
  signature: string;
  description: string;
  image?: string;
  name?: string;
  symbol: string;
  collection?: string;
  creator?: string;
}

function App() {

  const WSS_ENDPOINT = 'wss://ws-nd-845-886-528.p2pify.com/47063e02dff99a453ff6b863a7b137ce';
  const HTTP_ENDPOINT = 'https://nd-845-886-528.p2pify.com/47063e02dff99a453ff6b863a7b137ce';
  const ACCOUNT_TO_WATCH = 'ArAA6CZC123yMJLUe4uisBEgvfuw2WEvex9iFmFCYiXv';

  const [ mints, setMints ] = useState<MintDetail[]>([]);
  const [ txs, setTxs ] = useState( [] );

  const solanaConnection = new Connection( clusterApiUrl('mainnet-beta'), {
    wsEndpoint: WSS_ENDPOINT,
    commitment: 'confirmed'
  });

  const handlerTxs = ( logs: any ) => setTxs( ( prevLogs: any ) => logs.err === null && !prevLogs.includes( logs.signature ) ? [ logs.signature, ...prevLogs ] : prevLogs );

  const handlerMinted = async ( mint: string, tx: string ) => {
    const metadata: Metadata = await getMintedMetadata( mint )
    const { image, name, symbol, collection, description, properties } = await fetch( metadata.data?.data.uri ).then( response => response.json() )
    let details: MintDetail = {
      tokenAddress: mint,
      signature: `https://explorer.solana.com/tx/${tx}`,
      image: image || 'https://via.placeholder.com/150/',
      name: name || 'noname',
      symbol: symbol,
      collection: collection?.name || 'no collection name',
      creator: properties.creators.lenght > 0 ? `https://www.launchmynft.io/profile/${properties.creators[0].address}` : '#',
      description: description || 'no description'
    }
    setMints( ( prevMints: any ) => [ details, ...prevMints ] ); 
  }


  const getMintedMetadata = async ( mint: string ) => {
    let mintPubAddress = new PublicKey( mint );
    let tokenMetaPubkey = await Metadata.getPDA( mintPubAddress );
    let metaData = await Metadata.load<Metadata>( solanaConnection, tokenMetaPubkey );
    return metaData;
  };
 

  useEffect( () => {
    const accountLMNT: PublicKey = new PublicKey( ACCOUNT_TO_WATCH );
    const subScriptionLogs: number = solanaConnection.onLogs(
      accountLMNT,
      ( logs: any ) => handlerTxs( logs ),
      "finalized"
    );    
    return () => {
      solanaConnection.removeAccountChangeListener(subScriptionLogs);
    }
  }, []);

  useEffect( () => {  
    if( txs.length === 0 ) return
    const getTransactionDetails = async () => {
      await solanaConnection.getParsedTransaction( txs[0] ).then( ( tx ) => {
        if( tx?.meta?.logMessages?.includes('Program log: Instruction: InitializeMint') ) {
          tx?.meta?.postTokenBalances?.forEach( ( token: any ) => {
            if( token.mint ) handlerMinted( token.mint, txs[0] )
          })
        }
      });
    }
    getTransactionDetails();
  }, [txs]);

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
      <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-900">Latest Mint</h3>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200">
          {mints.map( ( mint ) => (
            <li key={mint.tokenAddress} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img className="h-8 w-8 rounded-full" src={mint.image} alt={mint.collection} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {mint.symbol} - {mint.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {mint.description}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  <a rel="noreferrer" target="_blank" title="Vai a LMNT" href={mint.creator} >
                    LMNFT
                  </a>
                </div>
              </div>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
    
  );
}

export default App;
