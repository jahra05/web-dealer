import checkIcon from '../assets/check.png'
import cancelIcon from '../assets/cancel.png'
import warningIcon from '../assets/warning.png'

export default function CustomAlert({ type, message, onClose }) {
    const alertConfig = {
        success: {
            title: "Berhasil",
            icon: checkIcon,
            iconStyle: "shadow-[0_0_35px_rgba(74,222,128,0.35)]"
        },
        error: {
            title: "Gagal",
            icon: cancelIcon,
            iconStyle: "shadow-[0_0_35px_rgba(239,68,68,0.35)]"

        },
        warning: {
            title: "peringatann",
            icon: warningIcon,
            iconStyle: "shadow-[0_0_35px_rgba(250,204,21,0.35)]"
        }
    }
    const config = alertConfig[type]
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-2">
                <div className="w-full max-w-lg lg:max-w-md h-60 overflow-auto rounded-3xl bg-white shadow-2xl text-center flex justify-center items-center">
                    <div className='flex items-center flex-col gap-4'>
                        <div className={`relative flex items-center justify-center w-24 h-24 rounded-full bg-white ${config.iconStyle}`}>
                            <img
                                src={config.icon}
                                className="w-14 h-14 object-contain"
                                alt=""
                            />
                        </div>
                        <div>
                            <h3>{config.title}</h3>
                            <p>{message}</p>
                        </div>
                        <button type='button' className='bg-gray-100 w-full rounded-xl p-1' onClick={onClose}>Ok</button>
                    </div>
                </div>

            </div>

        </>
    )
}