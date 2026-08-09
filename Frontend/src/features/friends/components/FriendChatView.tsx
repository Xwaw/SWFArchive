import { useState } from "react";
import ListItems from "../../../components/ListItems";
import useChat from "../../chat/hooks/UseChat";
import { useParams } from "react-router-dom";
import { Config } from "../../../Config";

interface SelectedFriendProps {
  conversationId: string | null;
}

export default function FriendChatView({
  conversationId,
}: SelectedFriendProps) {
  const { messages, sendMessage } = useChat(conversationId ?? "");
  const [input, setInput] = useState("");
  const { userId } = useParams();

  return (
    <div className="w-full h-full">
      {conversationId ? (
        <div className="w-full h-full flex flex-col justify-center">
          <div className="w-full h-[700%] bg-teal-800 overflow-scroll">
            <ListItems>
              {messages ? (
                <div>
                  {messages.map((msg) => {
                    console.log(msg);
                    return (
                      <div
                        key={msg.id}
                        className={`w-full h-20 p-2 bg-gradient-to-r border-1 border-black ${msg.senderId === userId ? "from-red-950 to-red-600 from-70% to-100%" : "from-0% to-30% from-red-600 to-red-950"}`}
                      >
                        <div
                          className={`flex items-center ${
                            msg.senderId === userId
                              ? "justify-start flex-row-reverse"
                              : "justify-start"
                          }`}
                        >
                          <div className="flex flex-col w-25 h-full justify-center items-center">
                            <div
                              className="w-10 aspect-square bg-blue-950 flex"
                              
                              onClick={() => alert("his profile")}
                            />
                            <div className="flex justify-center items-center">
                              {msg.senderUsername}
                            </div>
                          </div>
                          <div>{msg.content}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  No messages. Type something on chat
                </div>
              )}
            </ListItems>
          </div>
          <div className="p-4 w-full h-full flex gap-2">
            <textarea
              className="p-2 w-[93%] h-full resize-none bg-black border-1 border-white focus:border-red-600 outline-none"
              placeholder="Type here..."
              onChange={(e) => {
                setInput(e.currentTarget.value);
              }}
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();

                  sendMessage(input);
                  setInput("");
                }
              }}
            />
            <div className="w-[7%] h-full bg-black">
              <p className="w-full h-full flex justify-center items-center border-1 border-white">
                Send
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full ">
          No selected friend or [Add here]
        </div>
      )}
    </div>
  );
}
