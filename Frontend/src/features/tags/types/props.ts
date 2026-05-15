import type { ReactNode } from "react";
import type { TagType } from "./types";

export interface TagItemProps{
    children: ReactNode;
    onRemove?: () => void;
}

export interface RecommendedTag {
  id: string,
  name: string,
  usageCount: number
}

export interface RecommendedTagsProps {
  query: string;
  onSelectTag: (tag: TagType) => void;
}

export interface TagInputProps{
  tags: TagType[],
  onAddTag: (tag: TagType) => void;
  onRemoveTag: (id?: string) => void;
}

