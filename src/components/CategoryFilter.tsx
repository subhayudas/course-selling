
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onChange }: CategoryFilterProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap pb-3">
      <div className="flex space-x-2">
        <Button
          variant={selectedCategory === 'all' ? "default" : "outline"}
          size="sm"
          onClick={() => onChange('all')}
          className="rounded-full"
        >
          All Courses
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
