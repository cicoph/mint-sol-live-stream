import { FunctionComponent } from 'react';
import Project from './Project';
import moment from "moment";
import Moment from 'react-moment';

interface Props {
    // style: CSSProperties;
    project: Project;
}
 
const NftCard: FunctionComponent<Props> = ({ project }) => {
  return (
    <div className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                <a rel="noreferrer" target="_blank" href={`https://explorer.solana.com/address/${project.cm_address}`}>
                    <img className="h-8 w-8 rounded-full" src='#' alt={project.name} />
                </a>
            </div>
            <div className="flex-1 min-w-0">
                <a rel="noreferrer" href={`https://explorer.solana.com/address/${project.cm_address}`} target="_blank" className="text-sm font-medium text-gray-900 truncate">
                {project.name} - Latest Update: <Moment interval={1000} fromNow>{moment( project.latest_update )}</Moment>
                {project.description}
                </a>
            </div>
        </div>
    </div>
  );
};
 
export default NftCard;