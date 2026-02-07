import axios from "axios";
import { Config } from "../../../Config";

export class CommentService {
  async getAllByTarget(targetType: number, targetId: string) {
    return axios.get(
      `${Config.API_URL}/comment/all/${targetType}/${targetId}`,
      { withCredentials: true }
    );
  }

  async add(comment: string, targetType: number, targetId: string) {
    return axios.post(
      `${Config.API_URL}/comment/add`,
      { targetId, targetType, text: comment },
      { withCredentials: true }
    );
  }

  async edit(comment: string, commentId: string) {
    return axios.put(
      `${Config.API_URL}/comment/edit/${commentId}`,
      { text: comment },
      { withCredentials: true }
    );
  }

  async delete(commentId: string) {
    return axios.delete(`${Config.API_URL}/comment/delete/${commentId}`, {
      withCredentials: true,
    });
  }
}

export const commentService = new CommentService();
