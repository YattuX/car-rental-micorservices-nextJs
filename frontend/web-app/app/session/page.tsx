import React from 'react'
import Heading from '../components/Heading';
import { getSession, getTokenWorkaround } from '../actions/authActions';
import AuthTest from './AuthTest';

export default async function Session() {
    const session = await getSession();
    const token = await getTokenWorkaround();

  return (
    <div>
        <Heading title='Session dashboard'/>

        <div className='bg-blue-200 border-2 border-blue-500 rounded-,md p-2'>
            <h3 className='text-lg'> Session data</h3>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
        <div className='mt-4'>
          <AuthTest/>
        </div>
        <div className='bg-greem-200 border-2 border-blue-500 mt-4 rounded-md p-2'>
            <h3 className='text-lg'> Token data</h3>
            <pre className='overflow-auto'>{JSON.stringify(token, null, 2)}</pre>
        </div>
    </div>
  )
}
