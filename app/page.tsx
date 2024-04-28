import CoinPrice from "@/components/CoinPrice";
import Footer from "@/components/Footer";
import LeaveReview from "@/components/LeaveReview";
import OrderDisplay from "@/components/OrderDisplay";
import Reviews from "@/components/Reviews";
import Transactions from "@/components/Transactions";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import prisma from "./lib/db";
import { FileStack, TractorIcon } from "lucide-react";
import { TransformIcon } from "@radix-ui/react-icons";

async function getData(){
  const data = await prisma.transaction.findMany({
    select: {
      id: true,
      User: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          imageUrl: true,

        }

      },
      service: true,
      coinNumber: true,
      amount: true,
      phoneNumber: true,
      status: true,
      createdAt: true,
  

    },
    orderBy: {
      createdAt: 'desc',
    }

  }

)
return data;

}

export default async function Home() {
  const data = await getData();
  const limitedData = data.slice(0, 12);




  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-3 mx-auto flex-shrink overflow-x-auto w-full">
      <OrderDisplay />
      <CoinPrice />
      <LeaveReview />
      <Reviews />
      <div className='border border-primary rounded py-3 flex flex-col'>
      <div className="flex items-center p-6 space-x-4 rounded-md dark:bg-gray-900 mx-auto bg-secondary mb-3">
	<div className="flex items-center self-stretch justify-center">
    <FileStack width='34' height='34' />
	</div>
	<span>transactions in real time, watch the money dance as it happens</span>
</div>

      {limitedData.map((transaction: any)=>(
              <Transactions 
              key={transaction.id}
              id={transaction.id}
              User={transaction.User.firstName}
              service={transaction.service}
              coinNumber={transaction.coinNumber}
              amount={transaction.amount}
              phoneNumber={transaction.phoneNumber.slice(0, -4) + '****'}
              status={transaction.status}
              createdAt={transaction.createdAt.toLocaleString()}

        
              />


      )

      )}
      </div>
      

    </div>
  );
}
