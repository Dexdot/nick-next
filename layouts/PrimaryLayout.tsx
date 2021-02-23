import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface PropsI {
  children: JSX.Element;
}

export function PrimaryLayout({ children }: PropsI): JSX.Element {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
