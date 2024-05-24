import React from 'react'
import { MdOutlineLocationOn, MdCall, MdEmail } from 'react-icons/md'


const ContactDetails = () => {
    return (
        <div className="w-[50%] md:w-full sm:w-full space-y-10 xl:p-10 lg:p-10 md:p-10 flex items-center text-white">
            <div>
                <div>
                    <h2 className="font-bold text-xl my-4">Get In touch</h2>
                    <p>
                        Do you have a RFQ or questions about our services? Send us an email
                        and we answer you the same day. If you need a car service with
                        urgency, please call or text us at 0000-0000-0000
                    </p>
                </div>

                <ul>
                    <li className="my-4">
                        <h2 className="text-xl font-bold">Contact Detail</h2>
                    </li>
                    <li className='flex items-center gap-2'><MdOutlineLocationOn /><a href="#">Australia</a></li>
                    <li className='flex items-center gap-2'><MdCall /> <a href="#">+0000-1111-2222</a></li>
                    <li className='flex items-center gap-2'><MdEmail /><a href="#">example@gmail.com</a></li>
                </ul>
                <ul>
                    <li className="my-4 font-bold">
                        <h2>Social Media</h2>
                    </li>
                    <li className="flex items-center gap-4">
                        <a href="#" className="text-white">Instagram</a>
                        <a href="#" className="text-white">Facebook</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ContactDetails