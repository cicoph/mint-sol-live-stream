import { FunctionComponent, ReactNode } from "react";

interface Props {
    children?: ReactNode;
    size?: string;
}

const Grid: FunctionComponent<Props> = ( { children, size } ) => {
    return (
        <div className={size}>
            {children}
        </div>
    );
}

export default Grid;
