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
  

const Transactions = () => {
  return (
<Table className='container border border-primary rounded p-5 md:w-[50dvw] my-5'>
  <TableCaption className='text-primary'>A list of recent transactions.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px] text-primary">Time</TableHead>
      <TableHead className='text-primary'>Name</TableHead>
      <TableHead className='text-primary'>Transaction Type</TableHead>
      <TableHead className='text-primary'>Status</TableHead>
      <TableHead className='text-primary'>Phone Number</TableHead>
      <TableHead className="text-right text-primary">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">2hrs ago</TableCell>
      <TableCell>John</TableCell>
      <TableCell>Worldcoin</TableCell>
      <TableCell>Completed</TableCell>
      <TableCell>0724******</TableCell>
      <TableCell className="text-right">KES2500.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">2hrs ago</TableCell>
      <TableCell>John</TableCell>
      <TableCell>Worldcoin</TableCell>
      <TableCell>Completed</TableCell>
      <TableCell>0724******</TableCell>
      <TableCell className="text-right">KES2500.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">2hrs ago</TableCell>
      <TableCell>John</TableCell>
      <TableCell>Worldcoin</TableCell>
      <TableCell>Completed</TableCell>
      <TableCell>0724******</TableCell>
      <TableCell className="text-right">KES2500.00</TableCell>
    </TableRow>

  </TableBody>
</Table>
  )
}

export default Transactions