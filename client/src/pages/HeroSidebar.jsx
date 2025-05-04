import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, MenuIcon } from "lucide-react";
import React from "react";

const HeroSidebar = () => {
  const categories = [
    "Woman's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];
  return (
    <div>
      <div className="w-64 hidden lg:block bg-white border-r p-4 space-y-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
          >
            <span>{category}</span>
            {category === "Woman's Fashion" || category === "Men's Fashion" ? (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            ) : (
              " "
            )}
          </div>
        ))}
      </div>

      <div className="lg:hidden block py-3 pl-3 relative">
        <Sheet>
          <SheetTrigger className={"absolute z-20 top-2"} asChild>
            <Button className={"rounded-full"} variant="outline">
              {<MenuIcon />}
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Categories</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-2">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                >
                  <span>{category}</span>
                  {category === "Woman's Fashion" ||
                  category === "Men's Fashion" ? (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default HeroSidebar;
