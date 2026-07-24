import { FaRegUser, FaSearch } from "react-icons/fa"
import { MdNotificationsNone } from "react-icons/md"
import { RxHamburgerMenu } from "react-icons/rx"
import UserMenuDropdwn from "./UserMenuDropdown"
import NotificationModal from "./NotificationModal"
import { useState } from "react"

const NavTop = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    return (
        <>
            <div className='flex items-center justify-between m-4'>
                <div className='flex items-center gap-4'>
                    <RxHamburgerMenu size={24} />
                    <div className='flex gap-2 items-center bg-white h-10 px-4 w-72 rounded-full border border-gray-100'>
                        <FaSearch size={24} />
                        <input type='search' className='w-72 h-8 rounded-full' />
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => setIsNotificationOpen(true)}
                        className='relative inline-block bg-gray-200 w-10 h-10 p-2 rounded-full hover:bg-gray-300 transition'
                    >
                        <MdNotificationsNone size={24} className='position' />
                        <p className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-semibold'>10</p>
                    </button>

                    <UserMenuDropdwn />
                </div>

            </div>
            <NotificationModal isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />

        </>
    )
}
export default NavTop 