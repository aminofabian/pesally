import React from 'react';
import OrderDisplay from '@/components/OrderDisplay';
import UserTransactions from './_components/UserTransaction';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';



export default async function page() {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect('/api/auth/login');  
  }
  return (
    <div className='container'>
      <OrderDisplay />
      <UserTransactions />
    </div>
  )
}

