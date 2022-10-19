import { FunctionComponent } from 'react';
import Nft from './Nft';
import moment from "moment";
import Moment from 'react-moment';

interface Props {
    // style: CSSProperties;
    nft: Nft;
}
 
const NftCard: FunctionComponent<Props> = ({ nft }) => {
  return (
    <div className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                <a rel="noreferrer" target="_blank" href={`https://explorer.solana.com/address/${nft.address}`}>
                    <img className="h-8 w-8 rounded-full" src={nft.image} alt={nft.name} />
                </a>
            </div>
            <div className="flex-1 min-w-0">
                <a rel="noreferrer" href={`https://explorer.solana.com/address/${nft.address}`} target="_blank" className="text-sm font-medium text-gray-900 truncate">
                    {nft.name} - <Moment interval={1000} fromNow>{moment( nft.blockTime )}</Moment>
                </a>
            </div>
        </div>
    </div>
  );
};
 
export default NftCard;