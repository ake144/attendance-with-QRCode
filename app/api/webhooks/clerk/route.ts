import prisma from '@/lib/db';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define a type for the user data structure from Clerk's webhook
interface UserData {
  id: string;
  email_addresses: { email_address: string }[];
  username?: string;
  image_url?: string;
  first_name?: string;
  last_name?: string;
}

export async function POST(req: Request) {
  try {
    console.log('Webhook received');
    const evt = (await req.json()) as WebhookEvent;
    console.log('Event:', evt);

    // Type-cast the data as UserData
    const userData = evt.data as UserData;
    const { id: clerkUserId, email_addresses, username, image_url } = userData;
    const email = email_addresses?.[0]?.email_address;

    if (!clerkUserId) {
      console.error('No user ID provided');
      return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
    }

    let user = null;
    switch (evt.type) {
      case 'user.created':
        // Create a new user or update an existing one
        user = await prisma.user.upsert({
          where: { clerkUserId },
          update: {
            email,
            name: username || '',
            profilePic: image_url || null,
          },
          create: {
            clerkUserId,
            email,
            name: username || '',
            profilePic: image_url || null,
          },
        });
        console.log('User created/updated:', user);
        break;

      case 'user.deleted':
        // Delete the user
        user = await prisma.user.delete({
          where: { clerkUserId },
        });
        console.log('User deleted:', user);
        break;

      default:
        console.warn('Unhandled event type:', evt.type);
        break;
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({message: error }, { status: 500 });
  }
}
