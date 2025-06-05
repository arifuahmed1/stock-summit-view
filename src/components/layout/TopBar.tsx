
import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const TopBar: React.FC = () => {
  return (
    <header className="h-16 border-b border-summit-light-gray/30 glass-effect px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SidebarTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-summit-blue/10">
            <Menu className="w-5 h-5" />
          </Button>
        </SidebarTrigger>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search stocks, crypto..." 
            className="pl-10 w-80 bg-summit-gray border-summit-light-gray/30 focus:border-summit-blue"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-summit-green rounded-full animate-pulse"></div>
            <span className="text-gray-300">Markets Open</span>
          </div>
          <div className="text-gray-300">
            Last Update: <span className="text-summit-blue">12:34:56 PM</span>
          </div>
        </div>
        
        <Button variant="ghost" size="icon" className="hover:bg-summit-blue/10 relative">
          <Bell className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-summit-red rounded-full"></div>
        </Button>
      </div>
    </header>
  );
};
