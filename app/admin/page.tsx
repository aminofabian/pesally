import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

  const AdminPage =  async() => {
    const {getUser, getPermission} = getKindeServerSession();
    const user = await getUser();

    if(!user || !user.id || user ===null) {
        redirect('api/auth/login')
    }

    const admin = await getPermission('block:user');

    if(!admin?.isGranted) {
        redirect('/dashboard')
    }
      return (
    <div className='container flex'>Admin Page</div>
  )
}

export default AdminPage;