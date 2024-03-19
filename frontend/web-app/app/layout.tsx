import { Metadata } from 'next'
import './globals.css'
import NavBar from './nav/NavBar'
import ToasterProvider from './providers/ToasterProvider'
import SignalRProvider from './providers/SignalRProvider'
import { getCurrentUser } from './actions/authActions'


export const metadata: Metadata = {
  title: 'Carties',
  description: 'Rental cars',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <ToasterProvider/>
      <body>
        <NavBar/>
        <main className='p-4'>
          <SignalRProvider user={user}>
            {children}
          </SignalRProvider>

        </main>
      </body>
    </html>
  )
}
