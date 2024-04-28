'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { RedirectType, redirect } from "next/navigation";
import prisma from "./lib/db";
import Reviews from "@/components/Reviews";


export async function createTransaction(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user || user === null || !user.id) {
        return redirect('/api/auth/login')}

        const amount = Number(formData.get('getKshs'));
        const service = formData.get('service') as string;
        const phonenumber = formData.get('phonenumber') as string;
        const coinNumber = Number(formData.get('coinNumber'));


        const data = await prisma.transaction.create({
            data: {
                userId: user.id,
                coinNumber: coinNumber,
                amount: amount,
                service: service,
                status: 'PENDING',
                createdAt: new Date(),
                phoneNumber: phonenumber,
            }
        });

        return redirect('/dashboard');
  
}

   export async function createReview(formData: FormData    ){
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user || user === null || !user.id) {
        return redirect('/api/auth/login')}

        const reviewText = formData.get('reviewText') as string;

        const data = await prisma.review.create({
            data: {
                userId: user.id,
                reviewText: reviewText,
                createdAt: new Date(),
                rating: 'ONE',
            }
        });


        return redirect('/');


   }