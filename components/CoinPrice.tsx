'use client';

import homeStore from '@/app/stores/homestore';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'

export default function CoinPrice() {
    const store = homeStore();
    useEffect(() =>{
        store.fetchCoins();

    }, []);
  return (
    <div className='border p-10 rounded-xl border-primary'>

<fieldset className="space-y-1 dark:text-gray-800 border border-primary rounded-lg mb-3 w-fit mx-auto">
	<label htmlFor="Search" className="hidden">Search</label>
	<div className="relative">
		<span className="absolute inset-y-0 left-0 flex items-center pl-2">
			<button type="button" title="search" className="p-1 focus:outline-none focus:ring">
				<svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-800">
					<path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
				</svg>
			</button>
		</span>
		<input type="search" name="Search" placeholder="Search..." value={store.query} onChange={store.setQuery} className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-violet-600" />
	</div>
</fieldset>


        {store.coins.map(coin => {
            return (
                <div>
                    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
	<div className="overflow-x-auto">
		<table className="min-w-full text-xs">
			<tbody>
				<tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
					<td className="p-3">
                    <Image 
                         src={coin.image}
                         width={24}
                         height={24}
                         alt={coin.name}    
                         />

					</td>
					<td className="p-3">
						<Link href={`/${coin.id}`}>{coin.name}</Link>
					</td>
					<td className="p-3">
						<p></p>
						<p className="dark:text-gray-600"></p>
					</td>
					<td className="p-3">
						<p></p>
						<p className="dark:text-gray-600"></p>
					</td>
					<td className="p-3 text-right">
						Kshs {(coin.priceBtc*8936272).toFixed(3)}
					</td>
					<td className="p-3 text-right">
						<span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
							<span>Pending</span>
						</span>
					</td>
				</tr>
				
				
			</tbody>
		</table>
	</div>
</div>
                    </div>

            )


        })}
    </div>
  )
}
