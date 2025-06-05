
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
  LineChart
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
    url: '#',
    icon: LineChart,
  },
  {
    title: 'Crypto Tracker',
    url: '#',
    icon: DollarSign,
  },
  {
    title: 'AI Predictions',
    url: '#',
    icon: Brain,
  },
  {
    title: 'Trending',
    url: '#',
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
                  className="hover:bg-summit-blue/10 hover:text-summit-blue transition-colors"
                >
                  <a href="#" className="flex items-center space-x-3">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Preferences</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-6">
        <div className="glass-effect rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-summit-green to-summit-blue rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">JD</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-gray-400">Premium Member</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
