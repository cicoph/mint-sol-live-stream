import { FunctionComponent } from 'react';
import Project from './Project';
import Moment from 'react-moment';

interface Props {
    project: Project;
    selectProject: ( arg0: Project ) => any;
}

const ProjectCard: FunctionComponent<Props> = ( { project, selectProject } ) => {
    const width = ( ( project?.itemsMinted as number ) / ( project?.maxSupply as number)  * 100 ).toFixed(0);
    const progressStyle = {
       width: `${width}%`
    }
    const returnProject = ( project: Project ) => selectProject( project )
    return (
        <div onClick={ () => returnProject( project ) } className="flex items-center space-x-4 py-4 px-4 -mx-6 text-xs cursor-pointer">
            <img src={project.image || project.nftsMinted?.at(0).image} alt="" width="60" height="60" className="flex-none rounded-md bg-slate-100" />
            <div className="w-full">
                <div className="grid grid-cols-2 gap-2">
                    <div className="w-auto">
                        <h2 className="font-semibold text-slate-900 truncate">{project.name}</h2>
                        <dl className="mt-2 flex flex-wrap">
                            <dt className="sr-only">Total Mints</dt>
                            <dd className="flex items-center">
                                {project.nftsMinted?.length}Mints
                            </dd>
                            <div className="mx-2">
                                <dt className="sr-only">Price Mint</dt>
                                <dd>
                                    <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                                        <circle cx="1" cy="1" r="1" />
                                    </svg>
                                    {project.price} SOL
                                </dd>
                            </div>
                            <dt className="sr-only">Platform</dt>
                            <dd className="px-1.5 ring-1 ring-slate-200 rounded">{project.platform}</dd>
                        </dl>
                    </div>
                    <div className='w-65 self-center'>
                        <div className="flex-none w-full mt-2 font-normal">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={progressStyle}></div>
                            </div>
                        </div>
                        <div className="mt-2">
                            {`${project?.itemsMinted} / ${project?.maxSupply} ${width}%`}
                        </div>
                    </div>
                </div>
                <div className="w-full mt-2">Latest mint: <Moment fromNow>{project.latestUpdate}</Moment></div>
            </div>
        </div>
    );
};

export default ProjectCard;