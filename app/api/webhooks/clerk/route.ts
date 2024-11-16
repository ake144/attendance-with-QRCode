import prisma from '@/lib/db';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    console.log('Webhook received');
    const evt = (await req.json()) as WebhookEvent;
    console.log('Event:', evt);

    const userData = evt.data as any; // Typecast to any to access properties directly
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
            name: username || null,
            profilePic: image_url || null,
          },
          create: {
            clerkUserId,
            email,
            name: username || null,
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
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
