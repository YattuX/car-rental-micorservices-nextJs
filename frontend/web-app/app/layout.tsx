import { Metadata } from 'next'
import './globals.css'
import NavBar from './nav/NavBar'
import ToasterProvider from './providers/ToasterProvider'


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
      <ToasterProvider/>
      <body>
        <NavBar/>
        <main className='p-4'>
          {children}
        </main>
      </body>
    </html>
  )
}
