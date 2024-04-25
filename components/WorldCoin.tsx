'use client'
import React, { useState } from 'react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { createTransaction } from '@/app/actions';

function MyForm() {
  const [worldcoin, setWorldcoin] = useState<number>(1);
  const [kshsAmount, setKshsAmount] = useState<number>(450);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  
    if (isLoading) {
      return;
    }
    setIsLoading(true);
  
    const formData = new FormData(e.currentTarget);
  
    const coinNumber = formData.get('coinNumber') as string;
    const getKshs = formData.get('getKshs') as string;
    const phonenumber = formData.get('phonenumber') as string;
    const email = formData.get('email') as string;
    const mpesaName = formData.get('mpesaName') as string;
  
    if (!coinNumber || !getKshs || !phonenumber || !mpesaName) {
      toast({
        title: "Kindly Fill in all the fields before clicking submit",
        description: "It seems like you skipped some of the fields. Please fill in all the fields before clicking the submit page",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
  
    try {
      // await createTransaction({
      //   coinNumber,
      //   getKshs,
      //   phonenumber,
      //   email,
      //   mpesaName,
      // });
  
      const response = await fetch("/api/worldcoin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coinNumber,
          getKshs,
          phonenumber,
          email,
          mpesaName,
        }),
      });
  
      if (response.status === 200) {
        toast({
          title: "Message Sent",
          description: "You've successfully sent us a message. We'll respond within 24 hours",
          variant: "default"
        });
        e.currentTarget.reset();
      } else {
        toast({
          title: "Message Not Sent",
          description: "Failed to send message. Please try again later",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Message Not Sent",
        description: "Failed to send message. Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
      const handleWorldcoinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      setWorldcoin(value);
      const amount = value * 450;
      setKshsAmount(amount);
    }
    
    return (
        <form action={createTransaction} onSubmit={formHandler} method='POST' className="flex flex-col space-y-12 w-screen: md:w-full border border-secondary rounded-2xl p-3 shadow-sm shadow-primary">
        <fieldset className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 rounded-md shadow-sm w-full">
        <div className="space-y-2 col-span-full lg:col-span-1 border p-5 rounded border-secondary shadow-sm shadow-primary">
        <p className="font-medium text-primary">1 Worldcoin</p>
        <p className="text-xs bg-secondary text-primary px-5 font-bold py-1 rounded text-center shadow"> 450/=</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 col-span-full lg:col-span-3 border-2 shadow-sm shadow-primary p-5 rounded border-secondary">
        <div className="col-span-full sm:col-span-2">
        <label htmlFor="coinNumber" className="text-sm text-center text-primary">Sell WorldCoin</label>
        <input id="coinNumber" name="coinNumber" type="number" value={worldcoin} onChange={handleWorldcoinChange} placeholder="No. of Worldcoin" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-primary border px-5" />
        </div>
        <div className="col-span-full sm:col-span-1">
        <label htmlFor="getKshs" className="text-sm text-primary">You'll Recieve (in Kshs)</label>
        <input id="getKshs" name="getKshs" type="text" value={kshsAmount} readOnly className="w-full rounded-md bg-primary text-white font-bold text-center focus:ring focus:ring-opacity-75 focus:ring-primary dark:text-gray-50 dark:focus:ring-gray-400 dark:border-gray-600" />
        </div>
        <div className="col-span-full sm:col-span-3">
        <label htmlFor="email" className="text-sm text-primary">Phone Number</label>
        <input id="phonenumber" name="phonenumber" type="tel" placeholder="0700000000" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-secondary border border-secondary dark:border-slate-500 px-5" />
        </div>
        <div className="col-span-full">
        <input hidden id="service" type="text" name='service' defaultValue='worldcoin' placeholder="Enter the Mpesa Number to Recieve the Cash" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-primary border border-primary dark:border-slate-500 px-5" />
    </div>
    <div className="col-span-full sm:col-span-1">
    <label htmlFor="city" className="text-sm text-primary">Name</label>
    <input id="mpesaName" name="mpesaName" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-primary border border-primary px-5 dark:border-slate-500" />
    </div>
    <div className="col-span-full sm:col-span-1">
    <label htmlFor="state" className="text-sm text-primary">Email (optional)</label>
    <input id="name" name="email" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-primary dark:text-gray-500 border border-primary px-5 dark:border-slate-500" />
    </div>
    </div>
    </fieldset>
    <div className='flex w-full'>
    <Button className='mx-auto border-2 px-3 py-1  border-primary shadow-lg shadow-primary rounded-lg bg-primary text-secondary font-bold ml-auto dark:border-primary' type='submit' disabled={isLoading}> {isLoading ? 'Submitting...' : 'Submit'}
</Button>
    </div>
    
    </form>
);
}

export default MyForm;
