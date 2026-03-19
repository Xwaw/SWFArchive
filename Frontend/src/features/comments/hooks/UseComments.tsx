import { useState } from "react";
import { commentService } from "../services/CommentService";

export function useComments(targetId: string, targetType: number){
    const [error, setError] = useState<string | null>(null)
    const [isSending, setIsSending] = useState(false)

    const addComment = async (text: string) => {
        try{
            setIsSending(true);
            setError(null);

            await commentService.add(text, targetType, targetId);
        }catch(error){
            setError("Failed to add comment.")
        }finally{
            setIsSending(false);
        }
    }

    const editComment = async (commentId: string, text: string) => {
        try{
            setIsSending(true);
            setError(null);

            await commentService.edit(text, commentId);
        }catch(error){
            setError("Failed to edit comment.")
        }finally{
            setIsSending(false);
        }
    }

    const deleteComment = async (commentId: string) => {
        try{
            setIsSending(true);
            setError(null);

            await commentService.delete(commentId);
        }catch(error){
            setError("Failed to delete comment.")
        }finally{
            setIsSending(false);
        }
    }

    const getComments = async () => {
        try{
            setIsSending(true);
            setError(null);

            const response = await commentService.getAllByTarget(targetType, targetId)
            return response.data;
        }catch(error){
            setError("Failed with loading comments")
        }finally{
            setIsSending(false)
        }
    }

    return{
        addComment,
        editComment,
        deleteComment,
        getComments,
        error,
        isSending
    }
}