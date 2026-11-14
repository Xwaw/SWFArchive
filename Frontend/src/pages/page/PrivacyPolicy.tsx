import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import HomeHeader from "../home/components/Header/HomeHeader";
import { useAuth } from "../../features/authorization/hooks/UseAuth";

export default function PrivacyPolicy(){
    const { user } = useAuth();
    const [content, setContent] = useState("");
    
    useEffect(() => {
        fetch("/txt/privacy.md")
        .then((res) => res.text())
        .then((data) => {
            setContent(data);
        })
        .catch((err) => {
            console.error("Error fetching privacy content:", err);
        });
    }, [])

    return(
        <div className="w-full min-h-screen bg-black text-white flex flex-col">
            <HomeHeader user={user} />
            <div className="w-full gap-2 p-2" style={{background: "linear-gradient(to bottom, #000000 0.1%, #de3334 1%)"}}>
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => (
                            <h1
                                className="text-4xl font-bold text-red-500"
                                style={{
                                    WebkitTextStroke: "1px black",
                                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
                                }}
                            >
                                {children}
                            </h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="text-2xl font-bold text-orange-400" style={{
                                    WebkitTextStroke: "1px gold",
                                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
                                }}>
                                {children}
                            </h2>
                        ),
                        p: ({ children }) => (
                            <p className="text-gray-300 mb-4" style={{
                                    color: "black",
                                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
                                }}>
                                {children}
                            </p>
                        )
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}