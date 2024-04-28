import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: NextRequest){
    const accountSid = 'AC6ce55df97b5a30dad02c0cc527282a37';
    const authToken = 'caa830acec967dfc096223102fb19e04';
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
