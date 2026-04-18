import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface TagItemProps{
    children: ReactNode;
    onRemove: () => void;

}

export interface TagInputProps {
  tags: string[],
  setTags: Dispatch<SetStateAction<string[]>>
}

export interface RecommendedTag {
  id: string,
  name: string,
  usageCount: number
}