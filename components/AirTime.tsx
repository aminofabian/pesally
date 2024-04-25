'use client'
import React, { useState } from 'react';
import { Button } from './ui/button';

function AirTime() {
    const [worldcoin, setWorldcoin] = useState("");
    const [kshsAmount, setKshsAmount] = useState("");

    const handleWorldcoinChange = (e: any) => {
        const value = e.target.value;
        setWorldcoin(value);
        const amount = value * 0.80; // Assuming the conversion rate is 400
        setKshsAmount(amount.toFixed(0)); // Adjusted to two decimal places
    }

    return (
        <form action="" className="container flex flex-col mx-auto space-y-12 w-full border p-5">
            <fieldset className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 rounded-md shadow-sm w-full">
                <div className="space-y-2 col-span-full lg:col-span-1">
                    <p className="font-medium">1/= Airtime</p>
                    <p className="text-xs bg-primary px-5 font-bold text-secondary py-1 rounded text-center"> 0.80</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full sm:col-span-2">
                        <label htmlFor="selling" className="text-sm text-center">Selling</label>
                        <input id="selling" type="number" value={worldcoin} onChange={handleWorldcoinChange} placeholder="Airtime Amount" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border px-5" />
                    </div>
                    <div className="col-span-full sm:col-span-1">
                        <label htmlFor="getKshs" className="text-sm">You Recieve (in Kshs)</label>
                        <input id="getKshs" type="text" value={kshsAmount} readOnly className="w-full rounded-md bg-primary text-white font-bold text-center focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:text-gray-50 dark:focus:ring-gray-400 dark:border-gray-600" />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <label htmlFor="email" className="text-sm">Phone Number</label>
                        <input id="phonenumber" type="tel" placeholder="0700000000" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border border-primary px-5" />
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="address" className="text-sm">Send via?</label>
                        <input id="number" type="number" placeholder="Enter the Mpesa Number to Recieve the Cash" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border border-primary px-5" />
                    </div>
                    <div className="col-span-full sm:col-span-1">
                        <label htmlFor="city" className="text-sm">Name</label>
                        <input id="city" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border border-primary px-5" />
                    </div>
                    <div className="col-span-full sm:col-span-1">
                        <label htmlFor="state" className="text-sm">Email (optional)</label>
                        <input id="state" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:text-gray-500 border border-primary px-5" />
                    </div>
                </div>
            </fieldset>
            <div className='flex w-full'>
            <Button className='mx-auto border px-3 py-1 rounded-lg bg-primary text-secondary font-bold ml-auto'>Submit</Button>
            </div>

        </form>
    );
}

export default AirTime;
