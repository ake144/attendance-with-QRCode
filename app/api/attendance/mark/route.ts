import prisma from "@/lib/db"
import { NextResponse } from "next/server"


export async function POST(request:Request){
    const {userId, date, isPresent} = await request.json()

    console.log(userId,date,isPresent)
    try{
        if(userId && date && isPresent){
            const attendance = await prisma.attendance.create({
                data: {
                    date: date,
                    isPresent: isPresent,
                    userId: userId
                }
            })
            return NextResponse.json(attendance, {status: 200})
        }
        return NextResponse.json({message: 'Please provide userId, date and isPresent'}, {status: 400})
    }
    catch(e){
        console.log(e)
    }
    
}