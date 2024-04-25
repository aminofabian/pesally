import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from './ui/card';
import WorldCoin from './WorldCoin';
import BongaPoints from './BongaPoints';
import AirTime from './AirTime';
import Image from 'next/image';


function OrderDisplay() {
  return (
    <div className='md:container flex justify-center py-5 w-screen md:w-full'>
    <Tabs defaultValue="account" className="container gap-x-2">
    <TabsList className='flex mx-auto mb-5'>
    <TabsTrigger value="account" className=''>
    <Image
    src='/worldcoin.png'
    width={100}
    height={64}
    alt='worldcoin logo'
    />
    </TabsTrigger>
    <TabsTrigger value="password" className='mx-2 px-5'>
    <Image
    src='/bonga1.png'
    width={44}
    height={30}
    alt='worldcoin logo'
    />
    <p className='text-xs font-semi-bold'>POINTS</p>
    </TabsTrigger>
    </TabsList>
    <TabsContent value="account" className='w-8xl'>
    <WorldCoin />
    </TabsContent>
    <TabsContent value="password">
    <BongaPoints />
    </TabsContent>
    <TabsContent value="airtime">
    
    <AirTime />
    </TabsContent>
    </Tabs>
    </div>
  )
} 

export default OrderDisplay