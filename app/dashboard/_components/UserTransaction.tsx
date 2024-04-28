import prisma from '@/app/lib/db';
import DateDifference from '@/components/DateDifference';
import { Button } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';



async function getData(){
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    const data = await prisma.user.findUnique({
      where: {
        id: user?.id
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        imageUrl: true,
        userTransactions: {
          select: {
            id: true,
            service: true,
            coinNumber: true,
            amount: true,
            phoneNumber: true,
            status: true,
            createdAt: true,

          },
          orderBy: {
            createdAt: 'desc'
        }
        }
   
      }
  
    })
     return data;
  
    }



async function UserTransactions() {
    const data = await getData();
  return (
<div className="container p-2 mx-auto sm:p-2 dark:text-gray-800 my-5 rounded flex flex-col justify-center w-full">
	<h2 className="mb-4 text-2xl font-semibold leading-tight mx-auto">Your Transaction History</h2>
	<div className="overflow-x-auto">
		<table className="lg:w-fit text-xs mx-auto px-5">
			<colgroup>
				<col />
				<col />
				<col />
				<col />
				<col />
				<col className="w-12" />
			</colgroup>
			<thead className="dark:bg-gray-300">
				<tr className="text-left border-x">
					<th className="p-3">Transaction Id #</th>
					<th className="p-3">Service</th>
					<th className="p-3">Number of Coins</th>
					<th className="p-3">Date</th>
					<th className="p-3">Amount</th>
					<th className="p-3">Status</th>
                    <th className="p-3">Status</th>


				</tr>
			</thead>
			<tbody>
                {
                    data?.userTransactions.slice(0, 10).map(data =>(
				<tr className="border-b border-x border-opacity-20">
					<td className="px-3">
                    <p>{data.id}</p>
                    {data.status === 'PENDING' ? <Button variant='secondary' className='hover:bg-orange-100'>Mark Complete</Button> : null}
				</td>
					<td className="p-3">
						<p>{data.service}</p>
					</td>
					<td className="p-3 bg-lime-50">
						<p>{data.coinNumber}</p>
						<p className="dark:text-gray-600">{data.amount}/=</p>
					</td>
					<td className="p-3 bg-teal-50">
						<p>{data.createdAt.toLocaleDateString()}</p>
                        <DateDifference createdAt={data.createdAt} />
                        					</td>
					<td className="p-3">
						<p>{data.amount}</p>
					</td>
					<td className="p-3">
						<span className="px-3 py-1 font-semibold rounded-md bg-orange-50">
							<span>{data.status}</span>
						</span>
					</td> 
                    <td className="p-3">
						<span className="px-3 py-1 font-semibold rounded-md bg-green-50">
							<span>{data.status}</span>
						</span>
					</td>                     
				</tr>))}
			</tbody>
		</table>
	</div>
</div>
  )
}

export default UserTransactions;