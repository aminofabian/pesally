'use client'

import { Button } from "@/components/ui/button"
import { AlertCircle, HandHeart, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom"

export function SubmitButton({ ButtonName }: { ButtonName: string }) {
  {
    const { pending } = useFormStatus();
    return (
      <>  {pending ? <Button className='w-full dark:text-slate-50 dark:bg-slate-800 hover:scale-105' disabled>Give Us a Sec, We Update Your Review... 🤞 <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
      </Button> : <Button className='w-full dark:text-slate-50 dark:bg-slate-800 hover:scale-105' type='submit'>{ButtonName}</Button>
    }
    </>
    )
  }
}

            
            