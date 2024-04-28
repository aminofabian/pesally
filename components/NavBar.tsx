import React from 'react'
import PropTypes from 'prop-types'
import { ModeToggle } from './toggle-mode'
import { Button } from './ui/button'
import Link from 'next/link';
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { MenuIcon, PercentSquareIcon, ReceiptRussianRuble, RussianRuble } from 'lucide-react';
import Image from 'next/image';
  



async function NavBar() {
    const {getUser} = getKindeServerSession();  
    const user = await getUser();
    console.log(user);
  return (
    <header className="container p-4 border mt-5 rounded-lg text-primary border-primary mx-auto">
	<div className="container flex justify-between h-16 mx-auto text-primary border-primary">
		<a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex items-center p-2 text-2xl font-bold">
    <span className="material-symbols-outlined">
    <ReceiptRussianRuble width='34' height ='34' className='text-primary'/></span>
      Pesaly
		</a>
		<ul className="items-stretch hidden space-x-3 lg:flex">
			<li className="flex">
				<a rel="noopener noreferrer" href="/worldcoin" className="flex items-center px-4 -mb-1 text-primary border-primary ">Worldcoin</a>
			</li>
			<li className="flex">
				<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 text-primary border-primary">Sell Airtime</a>
			</li>
			<li className="flex">
				<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 text-primary border-primary">Bonga Points</a>
			</li>
			<li className="flex">
				<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 text-primary border-primary">Perfect Money</a>
			</li>
		</ul>
		<div className="items-center flex-shrink-0 hidden lg:flex gap-x-2">
            {user ? (
                 
                <div className='flex gap-x-3 border border-primary p-1 rounded-2xl'>
                     
                    <DropdownMenu>
  <DropdownMenuTrigger className='flex gap-x-2'>
  <Image
    src={user.picture ? user.picture : '/user.svg'}
                  alt="avatar"
                   width={35}
                   height={35}
                   />
    <Button size='icon' variant='outline'>
    <MenuIcon />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel className='text-xs font-light'>Welcome Aboard {user.given_name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem> <Button variant='outline' asChild><LogoutLink>Log out</LogoutLink>
                </Button></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
                </div> 
                    ): ( <div className='flex gap-x-2'>
                <Button asChild>
                 <LoginLink>Sign in</LoginLink> 
            </Button>
			<Button asChild variant='outline'><RegisterLink>Sign up</RegisterLink></Button>
            </div>
            )}
		
            <ModeToggle />

		</div>
		<Button className="p-4 lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</Button>

	</div>
</header>

  )
}

NavBar.propTypes = {}

export default NavBar
