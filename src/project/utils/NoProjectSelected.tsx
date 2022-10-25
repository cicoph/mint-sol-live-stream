import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const NoProjectSelected = () => {
    return (
        <div className="flex items-center justify-between mt-4 text-9xl">
            <FontAwesomeIcon icon={solid( 'cubes' )} />
            <p className="text-center">Lorem et ipsum </p>
        </div>
    )
}

export default NoProjectSelected