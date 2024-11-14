import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)',"/", "/about"])

export default clerkMiddleware(async (auth, request) => {
  // Check if the route is protected
  if (!isPublicRoute(request)) {
    // If the user is not authenticated, redirect to sign-in with the intended path
    if (!auth) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirectUrl', request.url);
      return Response.redirect(signInUrl.toString(), 302);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}