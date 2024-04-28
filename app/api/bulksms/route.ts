import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: NextRequest){
    const accountSid = process.env.accountSid;
    const authToken = process.env.authToken;
    const client = twilio(accountSid, authToken);

    const { coinNumber, getKshs, phonenumber, email, mpesaName } = await request.json();

    try {
        const result = await client.messages.create({
            body: `${mpesaName} selling ${coinNumber} worldcoins for Kes ${getKshs}. phone number ${phonenumber}`,
            to: phonenumber,
            from: `+254714282874`
        });
        
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        console.error("Error sending SMS:", error);
        return NextResponse.json({ message: 'error' }, { status: 500 });
    }
}
