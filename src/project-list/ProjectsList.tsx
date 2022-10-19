import { time } from 'console';
import { useEffect, useState } from 'react';

import Project  from './utils/Project';
import ProjectCard  from './utils/ProjectCard';


const ProjectsList = () => {
    const [ timeFrame, setTimeFrame ] = useState<number>(5);
    const [ projects, setProjects ] = useState<Project[]>([]);
    const [ timeOut, setTimeOut ] = useState<number>(5);
    // const [ size, setSize ] = useState<number>(50);

    useEffect(() => {
        const getProjectsWithFetch = async ( timeFrame: number ) => {
            const response = await fetch(`http://localhost:4001/projects/${timeFrame}`);
            const jsonData = await response.json();
            setProjects( jsonData );
        };
        const timer = setTimeout(() => {
            getProjectsWithFetch( timeFrame );
        }, 5000);
      
        return () => clearTimeout(timer);
    }, [ timeFrame ]);
    
        
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