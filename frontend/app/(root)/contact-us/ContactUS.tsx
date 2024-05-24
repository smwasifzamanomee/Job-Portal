import React from 'react'
import ContactForm from './ContactForm'
import ContactDetails from './ContactDetails'


const ContactUS = () => {
    return (
        <>
            <div className='lg:flex xl:flex md:flex-col sm:flex-col justify-between md:gap-4 lg:gap-10 p-10 container mx-auto sm:space-y-10'>
                <ContactForm />
                <ContactDetails />
            </div>
        </>
    )
}

export default ContactUS