"use client";
import Header from "@/shared/components/Header";
import "./globals.css";
import { Provider } from "react-redux";
import { store, persistedStore } from "@/store/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Source_Sans_Pro } from "@next/font/google";

const sourceSansPro = Source_Sans_Pro({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sourceSansPro.className}>
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
