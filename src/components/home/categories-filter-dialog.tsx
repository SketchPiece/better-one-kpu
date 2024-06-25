import categories, { CategoryItem, CategoryValue } from "@/lib/categories";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import React, { ComponentProps, useEffect, useState } from "react";
import { Nullable } from "@/lib/types";

interface CategoryButtonProps extends ComponentProps<"button"> {
  name: string;
  icon: React.ReactNode;
  items: number;
}

function CategoryButton({ name, icon, items, ...props }: CategoryButtonProps) {
  return (
    <button
      className="flex items-center rounded-lg p-2 transition-all hover:bg-[#F9F9F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:hover:bg-[#2E2E2E]"
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

interface CategoryFiltersDialogProps {
  value?: Nullable<CategoryValue>;
  onChange?: (value: Nullable<CategoryValue>) => void;
}

export default function CategoriesFilterDialog({
  onChange,
  value,
}: CategoryFiltersDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem>();

  const handleCategorySelect = (category: CategoryItem) => {
    setSelectedCategory(category);
    setIsOpen(false);
    onChange?.(category.value);
  };

  const handleCategoryClear = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    setSelectedCategory(undefined);
    onChange?.(null);
  };

  useEffect(() => {
    if (value !== selectedCategory && value !== undefined) {
      if (value === null) setSelectedCategory(undefined);
      else setSelectedCategory(categories.find((c) => c.value === value));
    }
  }, [value, selectedCategory]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {selectedCategory ? (
          <Button variant="default" size="lg">
            <selectedCategory.icon className="mr-2" /> {selectedCategory.name}
            <Icons.darkClose
              className="ml-2 h-5 w-5 hover:opacity-80"
              onClick={handleCategoryClear}
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
