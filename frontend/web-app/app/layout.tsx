import { Metadata } from 'next'
import './globals.css'
import NavBar from './nav/NavBar'


export const metadata: Metadata = {
  title: 'Carties',
  description: 'Rental cars',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body>
        <NavBar/>
        <main className='p-4'>
          {children}
        </main>
      </body>
    </html>
  )
}
