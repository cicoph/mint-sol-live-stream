import { FunctionComponent, ReactNode } from "react";

interface Props {
    title: string;
    children?: ReactNode;
    size: string;
}

const Grid: FunctionComponent<Props> = ( { title, children, size } ) => {
    return (
        <div className={`${size} relative`}>
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
