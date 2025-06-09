import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Brain, 
  Settings, 
  Home,
  Activity,
  LineChart,
  User,
  LogOut
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Live Markets',
    url: '/live-markets',
    icon: Activity,
  },
  {
    title: 'My Portfolio',
    url: '/my-portfolio',
    icon: BarChart3,
  },
  {
    title: 'Stock Analysis',
    url: '/stock-analysis',
    icon: LineChart,
  },
  {
    title: 'Crypto Tracker',
    url: '/crypto-tracker',
    icon: DollarSign,
  },
  {
    title: 'AI Predictions',
    url: '/ai-predictions',
    icon: Brain,
  },
  {
    title: 'Trending News',
    url: '/trending-news',
    icon: TrendingUp,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-summit-light-gray/30">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-summit-blue to-summit-purple rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Stock Summit</h1>
            <p className="text-xs text-gray-400">AI-Powered Trading</p>
          </div>
        </div>
        <div className="mt-4">
          <Button asChild variant="outline" className="w-full">
            <Link to="/" className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-summit-blue font-semibold text-sm">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="hover:bg-summit-blue/10 hover:text-summit-blue transition-colors"
                  >
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-summit-blue font-semibold text-sm">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={location.pathname === '/preferences'}
                  className="hover:bg-summit-blue/10 hover:text-summit-blue transition-colors"
                >
                  <Link to="/preferences" className="flex items-center space-x-3">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Preferences</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="glass-effect rounded-lg p-4 w-full hover:bg-summit-blue/10 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-summit-green to-summit-blue rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">JD</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-gray-400">Premium Member</p>
                </div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-4 ml-4 bg-background border-border">
            <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
              <User className="w-4 h-4" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer text-red-600 hover:text-red-700">
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
