'use client';
import Header from '@/shared/components/Header';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <Provider store={store}>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
