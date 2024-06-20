import categories, { CategoryItem } from "@/lib/categories";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ComponentProps, useMemo, useState } from "react";

interface CategoryButtonProps extends ComponentProps<"button"> {
  name: string;
  icon: React.ReactNode;
  items: number;
}

function CategoryButton({ name, icon, items, ...props }: CategoryButtonProps) {
  return (
    <button
      className="flex items-center rounded-lg p-2 transition-all hover:bg-[#F9F9F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      {...props}
    >
      <span className="flex items-center gap-2">
        {icon}
        <span className="ml-2">{name}</span>
      </span>
      <span className="ml-auto">{items}</span>
    </button>
  );
}

export default function FiltersDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem>();

  const handleCategorySelect = (category: CategoryItem) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {selectedCategory ? (
          <Button variant="default" size="lg">
            <selectedCategory.icon className="mr-2" /> {selectedCategory.name}
            <Icons.darkClose
              className="ml-2 h-5 w-5 hover:opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCategory(undefined);
              }}
            />
          </Button>
        ) : (
          <Button variant="secondary" size="lg">
            <Icons.filters className="mr-2" /> Filters
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Categories</DialogTitle>
          <DialogDescription>
            Select category to filter university services
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
          {categories.map((category) => (
            <CategoryButton
              key={category.name}
              name={category.name}
              icon={<category.icon />}
              items={category.items}
              onClick={() => handleCategorySelect(category)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
