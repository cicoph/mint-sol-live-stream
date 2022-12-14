import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const NoProjectSelected = () => {
    return (
        <div className="flex text-center flex-col align-center p-5">
            <FontAwesomeIcon className="text-3xl" icon={solid( 'cubes' )} />
            <h3 className="text-lg mt-5">No data yet!</h3>
            <p className="text-md mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus imperdiet magna eget feugiat. Quisque elementum est tellus. Cras non dolor mauris. Donec pulvinar eleifend fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
        </div>
    )
}

export default NoProjectSelected