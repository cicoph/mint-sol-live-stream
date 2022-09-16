import { useState, useEffect } from "react";

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Icon, Image, Card, Transition } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

interface MintDetail {
  tokenAddress: string;
  signature: string;
  description: string;
  image: string;
  name: string;
  symbol: string;
  collection: string;
  creator: string;
}

function App() {

  const WSS_ENDPOINT = 'wss://ws-nd-777-071-689.p2pify.com/4a5e64a684014a6fdd923d5d7dde3970';
  // const HTTP_ENDPOINT = 'http://ws-nd-777-071-689.p2pify.com/4a5e64a684014a6fdd923d5d7dde3970';
  const ACCOUNT_TO_WATCH = 'ArAA6CZC123yMJLUe4uisBEgvfuw2WEvex9iFmFCYiXv';

  const [ mints, setMints ] = useState<MintDetail[]>([]);
  const [ txs, setTxs ] = useState( [] );

  const solanaConnection = new Connection( clusterApiUrl('mainnet-beta'), {
    wsEndpoint: WSS_ENDPOINT,
  });

  const handlerTxs = ( logs: any ) => setTxs( ( prevLogs: any ) => logs.err === null && !prevLogs.includes( logs.signature ) ? [ logs.signature, ...prevLogs ] : prevLogs );

  const handlerMinted = async ( mint: string, tx: string ) => {
    const metadata: Metadata = await getMintedMetadata( mint )
    const response = await fetch( metadata.data?.data.uri )
    const { image, name, symbol, collection, description, properties } = await response.json();
    let details: MintDetail = {
      tokenAddress: mint,
      signature: tx,
      image: image,
      name: name,
      symbol: symbol,
      collection: collection?.name,
      creator: properties.creators[0].address,
      description: description
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
    <div className="container text ui">
      <Transition.Group
          as={Card}
          duration={200}
          divided
          size='huge'
        >
          {mints.map( ( mint, index ) => (
            <Card 
              key={index}
              title="Vai su solana ecplorer"
              rel="noreferrer" target="_blank"
              href={`https://explorer.solana.com/tx/${mint.signature}`}
              >
              <Image src={mint.image} wrapped alt={mint.collection} ui={false} />
              <Card.Content>
                <Card.Header>{mint.name}</Card.Header>
                <Card.Meta>
                  <span className='symbols'>{mint.symbol}</span>
                </Card.Meta>
                <Card.Description>
                  {mint.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a rel="noreferrer" target="_blank" title="Vai a LMNT" href={`https://www.launchmynft.io/profile/${mint.creator}`} >
                  <Icon name='linkify' />
                  LMNFT
                </a>
              </Card.Content>
            </Card>
          ))}
      </Transition.Group>
    </div>
  );
}

export default App;
