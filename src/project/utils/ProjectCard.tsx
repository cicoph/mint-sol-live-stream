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
    <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
            <span className="text-sm font-light text-gray-600 dark:text-gray-400">Latest Mint <Moment interval={1000} fromNow>{moment( project.latest_update )}</Moment></span>
            <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" role="button">{project.platform}</a>
        </div>
        <div className="mt-2">
            <a href="#" className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" role="link">
                {project.name}
            </a>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
                {project.description}
            </p>
        </div>
        <div className="flex items-center justify-between mt-4">
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" role="link">
                Read more
            </a>
            <div className="flex items-center">
                <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" 
                    src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar" />
                <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" role="link">Khatab wedaa</a>
            </div>
        </div>
    </div>
  );
};
 
export default NftCard;