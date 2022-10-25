import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const NoProjectSelected = () => {
    return (
        <div className="flex items-center justify-between mt-4">
            <FontAwesomeIcon icon={solid( 'cubes' )} />
        </div>
    )
}

export default NoProjectSelected