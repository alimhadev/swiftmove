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
import { useAppContext } from '@/hooks/appProvider';
const Header = ({ setActiveTab, activeTab }: { setActiveTab: React.Dispatch<React.SetStateAction<string>>, activeTab: string, }) => {
    const { user } = useAppContext();
    const notifications = [
        { id: 1, message: "Nouveau rendement disponible", date: "2024-03-11" },
        { id: 2, message: "Mise à jour de votre plan", date: "2024-03-10" },
        { id: 3, message: "Promotion sur les nouveaux plans", date: "2024-03-09" },
    ]
    return (
        <header className="bg-white  p-4 flex justify-between items-center border-b">
            <div className="flex items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64">
                        <div className="flex flex-col gap-5 py-4">
                            <h2 className="text-2xl font-bold mb-3">
                            SwiftMove
                            </h2>
                            <div className="relative flex justify-center items-center text-sm gap-2 mr-4 font-medium bg-white py-3 px-2 rounded z-20 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[calc(100%)] after:h-[calc(100%)] after:bg-white after:rounded after:-z-10 before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[calc(100%+4px)] before:h-[calc(100%+4px)]  before:bg-gradient-to-r before:from-blue-500 before:to-green-500 before:rounded before:-z-10">
                                <span>Solde:</span>
                                <span className="font-bold">{user?.solde} FCFA</span>
                            </div>
                            <nav>
                                <NavItems activeTab={activeTab} setActiveTab={setActiveTab} />
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>
                <h2 className="hidden sm:block text-2xl font-bold">
                    SwiftMove
                </h2>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative hidden sm:flex justify-center items-center text-sm gap-2 mr-4 font-medium bg-white py-3 px-2 rounded z-20 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[calc(100%)] after:h-[calc(100%)] after:bg-white after:rounded after:-z-10 before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[calc(100%+4px)] before:h-[calc(100%+4px)]  before:bg-gradient-to-r before:from-blue-500 before:to-green-500 before:rounded before:-z-10">
                    <span>Solde:</span>
                    <span className="font-bold">{user?.solde} FCFA</span>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Bell className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Notifications</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80" align="end">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.map((notification) => (
                            <DropdownMenuItem key={notification.id} className="flex flex-col items-start">
                                <span className="font-medium">{notification.message}</span>
                                <span className="text-sm text-muted-foreground">{notification.date}</span>
                            </DropdownMenuItem>
                        ))}
                        {notifications.length === 0 && (
                            <DropdownMenuItem disabled>Aucune notification</DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-center">
                            <Link href="#" className="w-full text-center">Voir toutes les notifications</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar>
                                <AvatarImage
                                    src=""
                                    alt="@shadcn"
                                />
                                <AvatarFallback>
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user?.firstname + " " + user?.lastname}</p>
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