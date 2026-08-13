import confirm from '../assets/check-mark.png'

export default function ConfirmAlert({ title, message, onConfirm, onCancel, confirmText = 'Hapus', cancelText = 'Batal' }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-2">
            <div className="w-full max-w-lg lg:max-w-md h-60 overflow-auto rounded-3xl bg-white shadow-2xl text-center flex justify-center items-center">
                <div className='flex items-center flex-col gap-4'>
                    <div className={`relative flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-[0_0_35px_rgba(96,165,250,0.35)]`}>
                        <img
                            src={confirm}
                            className="w-14 h-14 object-contain"
                            alt=""
                        />
                    </div>
                    <div>
                        <h3>{title}</h3>
                        <p>{message}</p>
                    </div>
                    <div className="flex gap-4 w-full px-4">
                        <button type='button' className='bg-gray-100 w-1/2 rounded-xl p-2' onClick={onCancel}>{cancelText}</button>
                        <button type='button' className='bg-red-600 text-white w-1/2 rounded-xl p-2' onClick={onConfirm}>{confirmText}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}