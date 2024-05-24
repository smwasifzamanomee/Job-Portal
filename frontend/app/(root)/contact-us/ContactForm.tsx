"use client";

import React, { useState, FormEvent } from 'react';

const ContactForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Handle form submission here
    };

    return (
        <div className="w-1/2 md:w-full sm:w-full xl:bg-[#171717] lg:bg-[#171717] md:bg-[#171717] rounded-3xl text-white">
            <form className="mt-6 xl:p-10 lg:p-10 md:p-10" onSubmit={handleSubmit}>
                <h1 className="flex justify-center items-center mb-4 text-2xl">What do you want to ask</h1>

                <div className="flex-1">
                    <label className="block mb-2 text-sm">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="block w-full px-5 py-3 mt-2 sm:border outline-none"
                        required
                        style={{
                            borderRadius: '55px',
                            background: "#131313"
                        }}
                    />
                </div>

                <div className="flex-1 mt-6">
                    <label className="block mb-2 text-sm">Email address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="block w-full px-5 py-3 mt-2 sm:border outline-none"
                        required
                        style={{
                            borderRadius: '55px',
                            background: "#131313"
                        }}
                    />
                </div>

                <div className="flex-1 mt-6">
                    <label className="block mb-2 text-sm">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter your subject"
                        className="block w-full px-5 py-3 mt-2 sm:border outline-none"
                        required
                        style={{
                            borderRadius: '55px',
                            background: "#131313"
                        }}
                    />
                </div>

                <div className="w-full mt-6">
                    <label className="block mb-2 text-sm">Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                        className="block w-full px-5 py-3 mt-2 sm:border outline-none custom_scrollbar"
                        required
                        style={{
                            borderRadius: '25px',
                            background: "#131313"
                        }}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 mt-6 text-lg font-medium tracking-wide text-primary"
                    style={{
                        width: '100%',
                        borderRadius: '55px',
                        background: '#82CE52',
                        boxShadow:
                            '0px -4px 4px 0px rgba(0, 0, 0, 0.25) inset, 0px 4px 24px 0px #9CFF5E inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactForm;