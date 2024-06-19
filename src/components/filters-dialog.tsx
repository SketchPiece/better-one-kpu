import categories from "@/lib/categories";
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

interface CategoryButtonProps {
  name: string;
  icon: React.ReactNode;
  items: number;
}

function CategoryButton({ name, icon, items }: CategoryButtonProps) {
  return (
    <button className="flex items-center rounded-lg p-2 transition-all hover:bg-[#F9F9F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
      <span className="flex items-center gap-2">
        {icon}
        <span className="ml-2">{name}</span>
      </span>
      <span className="ml-auto">{items}</span>
    </button>
  );
}

export default function FiltersDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">
          <Icons.filters className="mr-2" /> Filters
        </Button>
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
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
