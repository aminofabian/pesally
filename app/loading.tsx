import React from 'react'

export default function loading() {
  return (
    <div className="container flex flex-col m-8 rounded shadow-md w-full sm:w-full animate-pulse h-screen mx-auto">
	<div className="h-48 rounded-t bg-secondary"></div>
	<div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-secondary">
		<div className="w-full h-6 rounded dark:bg-gray-300"></div>
		<div className="w-full h-6 rounded dark:bg-gray-300"></div>
		<div className="w-3/4 h-6 rounded dark:bg-gray-300"></div>
	</div>
</div>
  )
}
