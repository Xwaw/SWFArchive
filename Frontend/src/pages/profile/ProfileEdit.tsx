import { useState } from "react";
import useOwnership from "../../features/authorization/hooks/UseOwnership";
import { useParams } from "react-router-dom";
import { GoBack } from "../../components/GoBack";

export default function ProfileEdit() {
  const {userId} = useParams()
  const { isOwner } = useOwnership(userId ?? "");

  if(!isOwner) return <GoBack/>

  return (
    <div className="w-screen h-screen">
      
    </div>
  );
}
