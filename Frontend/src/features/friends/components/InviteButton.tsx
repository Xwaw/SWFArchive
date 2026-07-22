import { useState } from "react";
import useInviteUser from "../hooks/useInviteUser";

interface InviteButtonProps{
    userId: string
}

export default function InviteButton({userId}: InviteButtonProps) {
  const { isLoading, error, sendInviteToUser } = useInviteUser();
  const [canSend, setCanSend] = useState(true);

  return (
    <div>
      {(error ?? isLoading) ? (
        <div>
          <div>
            LOADING
          </div>
        </div>
      ) : (
        <div>
          {
            canSend ? <div className="w-full h-full bg-red-900 hover:bg-red-600 hover:cursor-pointer p-2 flex justify-center items-center" onClick={async () => {
            const result = await sendInviteToUser(userId);
            setCanSend(result)
          }}>
            Send Invite
          </div> : <div>
            Was already sended
          </div>
          }
        </div>
      )}
    </div>
  );
}
