import React from 'react'
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavItems } from './nav-items';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Bell, LogOut, Menu, User } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from '../dashboard/logout-button';
const Header = ({ setActiveTab, activeTab, setShowNotifications, showNotifications, user }: { setActiveTab: React.Dispatch<React.SetStateAction<string>>, activeTab: string, setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>, showNotifications: boolean, user?: User }) => {
    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64">
                        <div className="py-4">
                            <h2 className="text-2xl font-bold mb-4">
                                Admin Dashboard
                            </h2>
                            <nav>
                                <NavItems setActiveTab={setActiveTab} activeTab={activeTab} />
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>
                <h2 className="hidden sm:block text-2xl font-bold">Admin Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
                <Button
                    variant="outline"
                    onClick={() => setShowNotifications(!showNotifications)}
                >
                    <Bell className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Notifications</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/0xKaizendev.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user?.lastname} {user?.firstname}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user?.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <Link
                                href="#"
                                onClick={() => setActiveTab("profile")}
                                className="w-full"
                            >
                                Profil
                            </Link>

                        </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <LogoutButton />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>

    )
}

export default Header