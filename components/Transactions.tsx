import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import DateDifference from './DateDifference';
 

  

const Transactions = ({
  id,
  User,
  service,
  coinNumber,
  amount,
  phoneNumber,
  status,
  createdAt,

}: {
key: string,
  id: string,
  User: string,
  service: string,
  coinNumber: string,
  amount: string,
  phoneNumber: string,
  status: string,
  createdAt: Date,
}) => {
  return (
<Table className='container rounded-xl p-5 md:w-[50dvw] border border-secondary mx-2'> 
  <TableBody>
    <TableRow key={id} className='border bg-secondary dark:bg-gray-900 dark:text-secondary'>
      <TableCell className="font-sm my-2 text-primary">      <DateDifference createdAt={createdAt} /></TableCell>
      <TableCell>{User}</TableCell>
      <TableCell>{service}</TableCell>
      <TableCell className='text-xs text-primary'>{phoneNumber}</TableCell>
      <TableCell className="text-right"><span className='text-xs'>{coinNumber}</span> {service}s</TableCell>
      <TableCell className="text-right"><span className='text-xs font-light'>KES</span>{amount}</TableCell>
      <TableCell className='text-primary text-xs'>{status}</TableCell>

    </TableRow>
  </TableBody>
</Table>
  )
}

export default Transactions;