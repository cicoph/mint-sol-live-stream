import { useEffect, useState, useRef, FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
// import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import Moment from 'react-moment';

import Project  from './utils/Project';
import ProjectCard  from './utils/ProjectCard';
import ButtonsTime from './utils/ButtonsTime';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
// import ProjectDetails from './ProjectDetails';

const SERVER_URL = process.env.REACT_APP_SERVER_URL

export type onSelectProject = ( arg0: Project ) => any;

type Props = {
    projectSelected: onSelectProject;
}

const ProjectsList : FunctionComponent<Props> = ( { projectSelected } ) => {
    const cachedCallback = useRef<NodeJS.Timer | null>(null);

    const [ timeFrame, setTimeFrame ] = useState<number>(5);
    const [ projects, setProjects ] = useState<Project[]>([]);
    const [ lastUpdate, setLastUpdate ] = useState<Date>( new Date )

    const [ sort, setSort ] = useState<boolean>( true )
    const [ iconSort, setIconSort ] = useState<IconDefinition>( solid('arrow-down-wide-short' ) )

    const handlerProjectDetails = async ( id: string ) => {
        await fetch( `${SERVER_URL}/project/id/${id}` )
        .then( async (response) => await response.json())
        .then( ( result: Project ) => projectSelected( result ) )
        .catch( error => console.log(error) )
    }

    const sortDescByMintNumber = ( a: Project, b: Project ) => sort ? b.nfts?.length - a.nfts?.length : a.nfts?.length - b.nfts?.length

    async function getProjectsWithFetch ( timeFrame: number ): Promise<void> {
        fetch( `${SERVER_URL}/projects/${timeFrame}` )
        .then( async response => await response.json())
        .then( ( result: Project[] ) => setProjects( result.sort( sortDescByMintNumber ) ) )
        .catch( error =>  console.log(error) )
    };

    useEffect( () => setLastUpdate(new Date), [ projects ] )

    useEffect( () => {
        getProjectsWithFetch( timeFrame )
        cachedCallback.current = setInterval( () => getProjectsWithFetch( timeFrame ), 5 * 60 * 1000 )
        return () => {
            if( cachedCallback.current ) clearInterval( cachedCallback.current )
        }
    }, [ timeFrame ]);

    useEffect( () => {
        projects.sort( sortDescByMintNumber )
        sort ? setIconSort( solid('arrow-down-wide-short') ) : setIconSort( solid('arrow-up-short-wide' ) )
    }, [ sort ])
    
    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900">
                    Top Mints
                </h3>
                <span className="font-regular text-xs text-gray-500">
                    Last Update: <Moment format='HH:mm:ss'>{lastUpdate}</Moment>
                </span>
            </div>
            <div className="flow-root">
                <div className="divide-y divide-gray-200">
                    <div className="flex -mx-6 border-y p-2 justify-between items-center">
                        <div className="inline-flex" role="group">
                            <button 
                                onClick={() => getProjectsWithFetch( timeFrame )}
                                className="py-2 px-4 shadow-sm text-xs font-medium text-gray-900 bg-white rounded-sm hover:bg-gray-100">
                                {/* <FontAwesomeIcon icon={icon({name: 'rotate-right', style: 'solid'})} /> */}
                                <FontAwesomeIcon icon={solid('arrow-rotate-right')} />
                            </button>
                            <button 
                                onClick={ () => setSort( prevSort => !prevSort ) }
                                className="py-2 px-4 shadow-sm text-xs font-medium text-gray-900 bg-white rounded-sm hover:bg-gray-100">
                                <FontAwesomeIcon icon={ iconSort } />
                            </button>
                        </div>
                        <ButtonsTime onChosen={ (time: number) => setTimeFrame( time )} />
                    </div>
                    
                    { projects.map( ( project: Project ) => (
                        <ProjectCard key={ project._id.toString() } selectProject={ ( project ) => handlerProjectDetails(project._id.toString() ) } project={ project } />
                    ))}
                </div>
            </div>
        </section>
    );
};
 
export default ProjectsList;