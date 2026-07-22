import ListItems from "../../../components/ListItems";
import useUserRequest from "../hooks/useUserRequest";

export default function FriendRequestList() {
  const { isLoading, error, requests, accept, deny } = useUserRequest();

  console.log(requests);

  if (isLoading) {
    return <div>LOADING..</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {requests ? (
        <ListItems>
          {requests.map((request) => {
            return (
              <div className="w-full h-20 flex items-center bg-gray-900 gap-5">
                <p className="flex h-full items-center p-2">
                  {request.senderUsername}
                </p>
                <div className="w-full flex justify-end p-5 gap-5">
                  <div
                    className="bg-red-900 hover:cursor-pointer hover:bg-red-600"
                    onClick={async () => {
                      await deny(request.id);
                    }}
                  >
                    Deny
                  </div>
                  <div
                    className="bg-green-900 hover:cursor-pointer hover:bg-green-600"
                    onClick={async () => {
                      await accept(request.id);
                    }}
                  >
                    Accept
                  </div>
                </div>
              </div>
            );
          })}
        </ListItems>
      ) : (
        <div>No requests</div>
      )}
    </div>
  );
}
