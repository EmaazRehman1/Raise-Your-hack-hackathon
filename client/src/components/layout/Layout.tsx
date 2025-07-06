import { ReactNode } from 'react';
import Navigation from './Navigation';
import FloatingChatbot from './FloatingChatbot';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="lg:pl-64 pb-16 lg:pb-0">
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </main>
      <FloatingChatbot />
    </div>
  );
}