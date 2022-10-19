import { FunctionComponent, ReactNode } from "react";

interface Props {
    title: string;
    children?: ReactNode;
}

const Grid: FunctionComponent<Props> = ( { title, children } ) => {
    return (
        <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4 bg-white shadow rounded-md p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900">{title}</h3>
            </div>
            <div className="flow-root">
                { children }
            </div>
        </div>
    );
}

export default Grid;
