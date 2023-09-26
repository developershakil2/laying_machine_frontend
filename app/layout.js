
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] });
import ApiProvider from './Api';

export const metadata = {
  title: 'laying machine play and earn',
  description: 'laying machine best investment place play and earn',
}

export default function RootLayout({ children }) {

  return (
 
 <html lang="en">
      <body className={inter.className}>
        <ApiProvider>
        {children}
        </ApiProvider>
       
        
        </body>
    </html>
  
   
  )
}
