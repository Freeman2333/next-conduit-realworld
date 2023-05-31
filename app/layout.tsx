'use client';
import Header from '@/shared/components/Header';
import './globals.css';
import { Provider } from 'react-redux';
import { store, persistedStore } from '@/store/store';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistedStore}>
            <Header />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
