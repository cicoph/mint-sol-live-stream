import { FunctionComponent } from 'react';
import Project from './Project';
import moment from "moment";
import Moment from 'react-moment';

interface Props {
    project: Project;
}

const ProjectCard: FunctionComponent<Props> = ({ project }) => {
    return (
        <div className="flex items-center space-x-6 py-4 px-4 -mx-6">
            <img src={project.nfts_minted?.at(0).image} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />
            <div className="min-w-0 relative flex-auto">
                <h2 className="font-semibold text-slate-900 truncate pr-20">{project.project_symbol}</h2>
                <dl className="mt-2 text-xs flex flex-wrap leading-6 font-medium">
                    <div>
                        <dt className="sr-only">Platform</dt>
                        <dd className="px-1.5 ring-1 ring-slate-200 rounded">{project.platform}</dd>
                    </div>
                    <div className="ml-2">
                        <dt className="sr-only">Price Mint</dt>
                        <dd>project.price</dd>
                    </div>
                    <div className="ml-2">
                        <dt className="sr-only">Total Mints</dt>
                        <dd className="flex items-center">
                            <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                                <circle cx="1" cy="1" r="1" />
                            </svg>
                            {project.nfts_minted?.length}Mint
                        </dd>
                    </div>
                    <div className="ml-2">
                        <dt className="sr-only">Max Supply</dt>
                        <dd className="flex items-center">
                            <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                                <circle cx="1" cy="1" r="1" />
                            </svg>
                            {project.maxSupply}Mint
                        </dd>
                    </div>
                    <div>
                        <dt className="sr-only">Symbol</dt>
                        <dd className="flex items-center">
                            <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                                <circle cx="1" cy="1" r="1" />
                            </svg>
                            {project.project_symbol}
                        </dd>
                    </div>
                    <div>
                        <dt className="sr-only">Latest Update</dt>
                        <dd className="flex items-center">
                            <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                                <circle cx="1" cy="1" r="1" />
                            </svg>
                            <Moment fromNow>{project.latest_update}</Moment>
                        </dd>
                    </div>
                    <div className="flex-none w-full mt-2 font-normal">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-blue-600 h-2.5 rounded-full w-50"></div>
                        </div>
                    </div>
                    <div className="flex-none w-full mt-2 font-normal">
                        <dt className="sr-only">Description</dt>
                        <dd className="text-slate-400">{project.description}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default ProjectCard;