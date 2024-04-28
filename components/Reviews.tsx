import prisma from '@/app/lib/db';
import React, { useEffect, useState } from 'react';

interface Review {
	id: number;
	rating: string; 
	reviewText: string | null;
	createdAt: Date;
	User: {
	  id: string;
	  firstName: string;
	  lastName: string;
	  email: string;
	} | null;
  }
  
  const getData = async () => {
	try {
	  const data = await prisma.review.findMany({
		select: {
		  id: true,
		  rating: true,
		  reviewText: true,
		  createdAt: true,
		  User: {
			select: {
			  id: true,
			  firstName: true,
			  lastName: true,
			  email: true,
			},
		  },
		},
		orderBy: {
		  createdAt: 'desc',
		}
	  });
	  return data;
	} catch (error: unknown | any) {
	  throw new Error('Error fetching data: ' + error.message);
	}
  };
  



  
const Reviews = async () => {
	const data = await getData();

  return (
    <section className="my-8 border rounded border-primary">
      <div className="container mx-auto flex flex-col flex-wrap items-center pb-6 mb-4 md:p-10 md:px-12">
        <h1 className="text-4xl font-semibold leading-none text-center text-primary mt-3">What our customers are saying about us</h1>
      </div>
      {data.slice(0, 2).map((review) => (
  <div key={review.id} className='flex md:w-[50dvw]'>
    <div className="flex flex-col items-center mx-5 lg:mx-0 p-5">
      <div className="relative text-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute top-0 left-0 w-8 h-8 dark:text-gray-300">
          <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
          <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
        </svg>
        <p className="px-6 py-1 text-lg italic m-2">{review.reviewText}</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute bottom-0 right-0 w-8 h-8 dark:text-gray-300">
          <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
          <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
        </svg>
      </div>
      <span className="w-12 h-1 my-2 rounded-lg dark:bg-violet-600"></span>
      {review.User ? <p className='text-primary'>{review.User.firstName}</p> : <p className='text-primary'>No User Data</p>}
    </div>
  </div>
))}

    </section>
  );
};

export default Reviews;
