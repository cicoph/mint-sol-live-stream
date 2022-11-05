import { useState, useEffect, FunctionComponent, CSSProperties } from 'react';
import Nft from './Nft';
import moment from "moment";
import Moment from 'react-moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { NONAME } from 'dns';

interface Props {
    // style: CSSProperties;
    nft: Nft;
}

const NftCard: FunctionComponent<Props> = ({ nft }) => {
    const [ notLoad, setNotLoad ] = useState<Boolean>(false)
    const [ display, setDisplay ] = useState<{
        icon:CSSProperties, 
        image:CSSProperties
    }>({
        icon: { display: 'none' },
        image: { display: 'block'}
    })
    useEffect( () => {
        if( notLoad ) 
            setDisplay( { icon: { display: 'block'}, image: { display: 'none' } } )
    }, [ notLoad ])


    return (
        <div className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <a rel="noreferrer" target="_blank" href={`https://explorer.solana.com/address/${nft.address}`}>
                        <FontAwesomeIcon style={display.icon} icon={ solid( 'file-image' ) } />
                        <img style={display.image} className="h-8 w-8 rounded-md" onError={ () => setNotLoad(true)} src={nft.image} alt={nft.name} />
                    </a>
                </div>
                <div className="flex-1 min-w-0 text-xs">
                    <a rel="noreferrer" href={`https://explorer.solana.com/address/${nft.address}`} target="_blank" className="font-medium text-gray-900 truncate">
                        {nft.name}
                    </a>
                    <div className="font-medium text-gray-900 truncate">
                        <Moment interval={1000} fromNow>{moment(nft.blockTime)}</Moment>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NftCard;