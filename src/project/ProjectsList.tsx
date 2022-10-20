import { useEffect, useState, useRef } from 'react';

import Project  from './utils/Project';
import ProjectCard  from './utils/ProjectCard';

// type IntervalCallback = () => NodeJS.Timer | null;

const url = `http://localhost:4001/projects/`;


const ProjectsList = () => {

    const cachedCallback = useRef<NodeJS.Timer | null>(null);

    const [ timeFrame, setTimeFrame ] = useState<number>(5);
    const [ projects, setProjects ] = useState<Project[]>([]);
    const getProjectsWithFetch = async ( timeFrame: number ): Promise<void> => {
        fetch( `${url}${timeFrame}` )
        .then( async (response) => await response.json())
        .then( ( result: Project[] ) => setProjects( result ) );
        return
    };

    useEffect( () => {
        getProjectsWithFetch( timeFrame )
        cachedCallback.current = setInterval( () => getProjectsWithFetch( timeFrame ), 5 * 60 * 1000 )
        return () => {
            if( cachedCallback.current ) clearInterval( cachedCallback.current )
        }
    }, [timeFrame]);
    
    // useEffect( () => {
    //     setSize(nfts.length);
    // },[nfts]);
    
    //if (!nfts) return null;
    
    return (
        <div
            className="divide-y divide-gray-200"
            >
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" onClick={ () => setTimeFrame( 5 )}>5</button>
                <button className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" onClick={ () => setTimeFrame( 15 )}>15</button>
                <button className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" onClick={ () => setTimeFrame( 30 )}>30</button>
            </div>
            { projects.map( ( project: Project ) => (
                <ProjectCard key={ project._id.toString() } project={ project } />
            ))}
        </div>
    );
};
 
export default ProjectsList;