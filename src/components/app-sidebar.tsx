"use client";

import { Book, GitBranch, Phone, Sparkles } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Home, Inbox, Search } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavWorkspaces } from "./nav-workspaces";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Ask AI",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
  ],
  workspaces: [
    {
      name: "Demos",
      emoji: <Book size={13} />,
      pages: [
        {
          name: "Voice Agent",
          url: "#",
          emoji: <Phone size={13} />,
        },
        {
          name: "Flow Control",
          url: "#",
          emoji: <GitBranch size={13} />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        {/* <NavUser user={data.user} /> */}
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavWorkspaces workspaces={data.workspaces} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
