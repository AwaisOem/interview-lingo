"use client"
import { SignedIn, UserButton , SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
const Navbar = () => {
  const path = usePathname();
  const isChatRoute = path.startsWith('/dashboard/chat/') || path.startsWith('/dashboard/call/');
  if(isChatRoute)return <></>;
  return (
    <header className="absolute inset-x-0 top-0 z-50">
    <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <Link href="/">
      <div className="flex gap-4 items-center pr-5">
          <img
            alt=""
            src="https://tailwindui.com/img/logos/mark.svg?color=neutral&shade=900"
            className="h-8 w-auto"
            />
        <span className="font-bold text-black">Mockview</span>
      </div>
        </Link>
    
      <div className="hidden sm:flex flex-1 justify-end px-12 gap-x-12">
        <Link href="/pricing">
          <span className="text-sm font-semibold leading-6 text-gray-900">
            Pricing
          </span>
        </Link>
      </div>
      <div className="flex justify-end">
        <SignedOut>
          <Link href="/sign-in">
            <span className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </div>
    </nav>
  </header>
)
}

export default Navbar