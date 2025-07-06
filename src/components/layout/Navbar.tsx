"use client";

import { Book, Plus, FileText, LibraryBig, Menu } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Button } from "../ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: "/books", label: "All Books", icon: Book },
    { href: "/create-book", label: "Add Book", icon: Plus },
    { href: "/borrow-summary", label: "Borrow Summary", icon: FileText },
  ];

  return (
    <nav className="border-b bg-zinc-950 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/books" className="flex items-center space-x-2">
              <LibraryBig className="h-6 w-6 sm:h-8 sm:w-8 text-rose-700" />
              <span className="text-lg sm:text-xl font-bold">Open Library</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  variant={"ghost"}
                  asChild
                  className={
                    isActive(item.href) ? "border-b border-rose-800" : ""
                  }
                >
                  <Link to={item.href}>
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8 px-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.href}
                        variant={"ghost"}
                        asChild
                        className={
                          isActive(item.href) ? "border-b border-rose-800" : ""
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        <Link to={item.href}>
                          <Icon className="h-4 w-4 mr-2" />
                          {item.label}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
