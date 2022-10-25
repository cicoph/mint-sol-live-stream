import { FunctionComponent } from 'react'
import Moment from 'react-moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import Project from './utils/Project'
import NoProjectSelected from './utils/NoProjectSelected'

interface Props {
    project: Project | null;

}
const ProjectDetails: FunctionComponent<Props> = ( { project } ) => {
    return( 
        <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900">
                    Top Collection Holder Minted
                </h3>
            </div>
            { project ? 
                <div className="flow-root">
                    <div className="flex items-center space-x-6 py-4 px-4 -mx-6 text-xs">
                        <img src={project.nftsMinted?.at(0).image} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />
                        <div className="w-full">
                            <h2 className="font-semibold text-slate-900 truncate">{project.symbol}</h2>
                            <span className="truncate w-15">{project.cmAddress}</span>
                            <ul className="ml-auto flex items-center mt-2">
                                <li className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-800 text-white mr-2"><FontAwesomeIcon icon={ brands( 'twitter' ) } /></li>
                                <li className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-800 text-white mr-2"><FontAwesomeIcon icon={ brands( 'discord' ) } /></li>
                                <li className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-800 text-white mr-2"><FontAwesomeIcon icon={ solid( 'earth' ) } /></li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="grid font-md grid-cols-4 gap-2">
                            <div className="flex flex-col">
                                <span className="text-medium">Minted</span>
                                <span className="flex items-center">
                                    {project.itemsMinted}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-medium">Supply</span>
                                <span className="flex items-center">
                                    {project.maxSupply}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-medium">Price Mint</span>
                                <span> {project.price} SOL </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-medium">Mint Date</span>
                                <span><Moment format='D MMM'>{project.nftsMinted?.at(0).blockTime}</Moment></span>
                            </div>
                        </div>
                    </div>
                </div> 
                :  <NoProjectSelected />
            }
        </div> 
    )
}

export default ProjectDetails;