import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const NoProjectSelected = () => {
    return (
        <div className="flex flex-col align-center p-5">
            <FontAwesomeIcon className='text-5xl' icon={solid( 'cubes' )} />
            <p className="text-center text-md mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus imperdiet magna eget feugiat. Quisque elementum est tellus. Cras non dolor mauris. Donec pulvinar eleifend fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
        </div>
    )
}

export default NoProjectSelected