import  prisma  from "@/lib/db";
import { NextResponse } from 'next/server';


export async function GET(request: Request){

    const {searchParams} = new URL(request.url);
    const userId = searchParams.get('userId');

    console.log(userId)

    try{

        if(userId){
         const attendance = await prisma.attendance.findMany({
            select: {
                date: true,
                isPresent: true
            },
           where: {

                userId: userId
              }
        })
        return NextResponse.json(attendance, {status: 200})
    }

    return NextResponse.json({message: 'Please provide a userId'}, {status: 400})

}
    catch(e){
        console.log(e)
    }
}