'use client'
import React, { useState } from 'react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { createTransaction } from '@/app/actions';
import CopyToClipboardButton from './copyAddress';


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
    const email = formData.get('email') as string | undefined; // Make email optional
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
      const amount = Number(getKshs);
  
      const response = await fetch("/api/worldcoin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coinNumber,
          getKshs: amount,
          phonenumber,
          email,
          mpesaName,
        }),
      });
  
      if (response.status === 200) {
        toast({
          title: "Message Sent",
          description: "We've received your order request. Kindly give us a few minutes to process it. In case of any delays, give us a call (0714282874)",
          variant: "default"
        });
        await createTransaction(formData);
        await sendSMS(coinNumber, getKshs, phonenumber, email || '', mpesaName);
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

  const sendSMS = async (coinNumber: string, getKshs: string, phonenumber: string, email: string, mpesaName: string) => {
    const response = await fetch('api/bulksms', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        coinNumber: coinNumber,
        getKshs: getKshs,
        phonenumber: phonenumber,
        email: email,
        mpesaName: mpesaName,
      }),
    });
  }
      
  return (
    <div className='border border-secondary rounded-2xl p-3 shadow-sm shadow-primary'>
      <div className='container text-primary bg-secondary w-fit hover:scale-105 rounded-xl'>
      <CopyToClipboardButton text='0xe478fb452135af0303ed15d132be51e492c9a092' />
      </div>
    <form onSubmit={formHandler} method='POST' className="flex flex-col space-y-12 w-screen: md:w-full">
      <fieldset className="grid grid-cols-1 lg:grid-cols-6 gap-6 p-6 rounded-md shadow-sm w-full">
        <div className="space-y-2 col-span-full lg:col-span-2 border rounded border-secondary shadow-sm shadow-primary flex flex-col flex-wrap w-full justify-center items-center">
          <p className="font-medium text-primary">1 Worldcoin</p>
          <p className="text-xs bg-secondary text-primary px-2 font-bold py-1 rounded text-center shadow"> 450/=</p>
          <p className='flex flex-col justify-center'> <p className='rounded-lg text-xs w-full hover:text-primary hover:bg-white h-8 flex flex-wrap ml-2'></p></p>
          <div>
    </div>


        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 col-span-full lg:col-span-4 border-2 shadow-sm shadow-primary p-5 rounded border-secondary">
          <div className="col-span-full sm:col-span-2">
            <label htmlFor="coinNumber" className="text-sm text-center text-primary">Sell WorldCoin</label>
            <input id="coinNumber" name="coinNumber" type="number" value={worldcoin} onChange={handleWorldcoinChange} placeholder="No. of Worldcoin" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-primary border px-5" />
          </div>
          <div className="col-span-full sm:col-span-1">
            <label htmlFor="getKshs" className="text-sm text-primary">You'll Receive (in Kshs)</label>
            <input id="getKshs" name="getKshs" type="text" value={kshsAmount} readOnly className="w-full rounded-md bg-primary text-white font-bold text-center focus:ring focus:ring-opacity-75 focus:ring-primary dark:text-gray-50 dark:focus:ring-gray-400 dark:border-gray-600" />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="phonenumber" className="text-sm text-primary">Phone Number</label>
            <input id="phonenumber" name="phonenumber" type="tel" placeholder="0700000000" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-secondary border border-secondary dark:border-slate-500 px-5" />
          </div>
          <div className="col-span-full">
            <input hidden id="service" type="text" name='service' defaultValue='worldcoin' placeholder="Enter the Mpesa Number to Receive the Cash" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-primary border border-primary dark:border-slate-500 px-5" />
          </div>
          <div className="col-span-full sm:col-span-1">
            <label htmlFor="mpesaName" className="text-sm text-primary">Name</label>
            <input id="mpesaName" name="mpesaName" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-primary border border-primary px-5 dark:border-slate-500" />
          </div>
          <div className="col-span-full sm:col-span-1">
            <label htmlFor="email" className="text-sm text-primary">Email (optional)</label>
            <input id="email" name="email" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-primary dark:text-gray-500 border border-primary px-5 dark:border-slate-500" />
          </div>
        </div>
      </fieldset>
      <div className='flex w-full'>
        <Button className='mx-auto border-2 px-3 py-1 border-primary shadow-lg shadow-primary rounded-lg bg-primary text-secondary font-bold ml-auto dark:border-primary' type='submit' disabled={isLoading}> {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
    </div>

  );
}

export default MyForm;
