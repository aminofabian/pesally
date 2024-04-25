'use client'
import React, { useState } from 'react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { createTransaction } from '@/app/actions';


const formHandler = async (e: any) => {
    e.preventDefault();
    const selling = e.target.selling.value;
    const getKshs = e.target.getKshs.value;
    const phonenumber = e.target.phonenumber.value;
    const email = e.target.email.value;
    const mpesaName = e.target.mpesaName.value;
    
    if (!selling || !getKshs || !phonenumber || !mpesaName) {
      toast({
        title: "Kindly Fill in all the fields before clicking submit",
        description: "It seems like you skipped some of the fields. Please fill in all the fields before clicking the submit page",
        variant: "destructive"
      });
      return; 
    }
    
    const formData = {
      selling,
      getKshs,
      phonenumber,
      email,
      mpesaName,
    };
    
    try {
      const response = await fetch("/api/bongapoints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.status === 200) {
        toast({
          title: "Message Sent",
          description: "You've successfully sent us a message. We'll respond within 24 hours",
          variant: "default"
        })
        e.target.reset();
        console.log(formData);
      } else {
        toast({
          title: "Message Not Sent",
          description: "Failed to send message. Please try again later",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Message Not Sent",
        description: "Failed to send message. Please try again later",
        variant: "destructive"
      })  }
    };
      


function BongaPoints() {
    const [worldcoin, setWorldcoin] = useState("");
    const [kshsAmount, setKshsAmount] = useState("");

    const handleWorldcoinChange = (e: any) => {
        const value = e.target.value;
        setWorldcoin(value);
        const amount = value * 0.15; // Assuming the conversion rate is 400
        setKshsAmount(amount.toFixed(0)); // Adjusted to two decimal places
    }

    return (
        <div>
        <form action={createTransaction} className="container flex flex-col mx-auto space-y-12 w-full m-5 p-6">
            <fieldset className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 rounded-md shadow-sm w-full">
                <div className="space-y-2 col-span-full lg:col-span-1 rounded-md border border-primary p-5">
                    <p className="font-medium">1 Bonga Point</p>
                    <p className="text-xs bg-primary px-5 font-bold text-secondary py-1 rounded text-center"> 0.15/=</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 col-span-full lg:col-span-3 border border-primary rounded p-7">
                    <div className="col-span-full sm:col-span-2">
                        <label htmlFor="selling" className="text-sm text-center">Selling</label>
                        <input id="selling" name='selling' type="number" value={worldcoin} onChange={handleWorldcoinChange} placeholder="No. of Bonga Points" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border px-5" />
                    </div>
                    <div className="col-span-full sm:col-span-1">
                        <label htmlFor="getKshs" className="text-sm">You Recieve (in Kshs)</label>
                        <input id="getKshs" name='getKshs' type="text" value={kshsAmount} readOnly className="w-full rounded-md bg-primary text-white font-bold text-center focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:text-gray-50 dark:focus:ring-gray-400 dark:border-gray-600" />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <label htmlFor="email" className="text-sm">Phone Number</label>
                        <input id="phonenumber" name='phonenumber' type="tel" placeholder="0700000000" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border border-primary px-5" />
                    </div>
                    <div className="col-span-full">
                        <input id="service" type="text" hidden name='service' defaultValue='Bonga Points' placeholder="Enter the Mpesa Number to Recieve the Cash" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border border-primary px-5" />
                    </div>
                    <div className="col-span-full sm:col-span-1">
                        <label htmlFor="city" className="text-sm">Name</label>
                        <input id="mpesaName" name='mpesaName' type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border border-primary px-5" />
                    </div>
                    <div className="col-span-full sm:col-span-1">
                        <label htmlFor="state" className="text-sm">Email (optional)</label>
                        <input id="state" type="text" name='email' placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 dark:text-gray-500 border border-primary px-5" />
                    </div>
                </div>
            </fieldset>
            <div className='flex w-full'>
            <Button className='mx-auto border px-3 py-1 rounded-lg bg-primary text-secondary font-bold ml-auto' type='submit'>Submit</Button>
            </div>

        </form>
        </div>
    );
}

export default BongaPoints;
