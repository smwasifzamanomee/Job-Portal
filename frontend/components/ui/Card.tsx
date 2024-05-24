
import { job } from '@/hooks/reactQuery/AllJobQuery'
import { useCreateSaveJob } from '@/hooks/reactQuery/SaveJobQuery'
import { getCookie } from 'cookies-next'
import React from 'react'
import { BsArrowRight, BsArrowRightShort } from 'react-icons/bs'
import { toast } from 'react-toastify'


const Card = (item: job) => {
    const authData = getCookie("authData");
    const {createSaveJob} = useCreateSaveJob()
    const handleClick = () => {
        if(!authData) {
            toast.error("You need to login first")
            return
        }
        const payload = {
            id: item.id,
            title: item.title,
            description: item.description
        }
        createSaveJob.mutate(payload, { // Fix: Pass the id as an object with the property 'id'
            onSuccess: () => {
                toast.success("Job saved successfully")
            },
            onError: () => {
                toast.error("Job already saved")
            }
        })      
    }
    return (
        <div className="bg-white rounded-3xl shadow-md">
            <div className='p-4 py-20'>
                <div className="font-semibold text-neutral-600 flex">
                    {item.title}
                </div>
                <p className="mt-3 text-base text-gray-500">
                    {item.description}
                </p>
                <p className="mt-3 text-base text-gray-500">
                    30k to 49k
                </p>
            </div>
            <div onClick={handleClick} className='bg-[#82CE52] rounded-3xl  text-white'>
                <div className="p-4 flex justify-between ">
                    <h2 className=" font-bold font-bebas uppercase">Save Jobs</h2>
                    <p className=" text-xl"><BsArrowRight /></p>
                </div>
            </div>
        </div>
    )
}

export default Card