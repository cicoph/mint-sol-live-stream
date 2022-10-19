import { useEffect, useState, useRef } from 'react';

import Project  from './utils/Project';
import ProjectCard  from './utils/ProjectCard';

type IntervalCallback = () => string;

const url = `http://localhost:4001/projects/`;


const ProjectsList = () => {
    const cachedCallback = useRef<number | null>(null);

    const [ timeFrame, setTimeFrame ] = useState<number>(150);
    const [ projects, setProjects ] = useState<Project[]>([]);
    // const [ timeOut, setTimeOut ] = useState<number>(5);
    // const [ size, setSize ] = useState<number>(50);
    const getProjectsWithFetch = async ( timeFrame: number ) => {
        console.log('test')
        fetch( `${url}${timeFrame}` )
        .then( async (response) => await response.json())
        .then( ( result: Project[] ) => setProjects( result ) );
    };

    useEffect(() => {
        cachedCallback.current = setInterval( getProjectsWithFetch, 5 * 60 * 1000 )
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
            { projects.map( ( project: Project ) => (
                <ProjectCard key={ project.cm_address } project={ project } />
            ))}
        </div>
    );
};
 
export default ProjectsList;