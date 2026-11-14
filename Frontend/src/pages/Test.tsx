import { useAuth } from "../features/authorization/hooks/UseAuth";

export default function Test() {
  const { logout, isLoading, user } = useAuth();

  return (
    <div className="p-6">
      <button
        type="button"
        onClick={() => void logout()}
        className="rounded bg-red-700 px-4 py-2 text-white hover:bg-red-800"
      >
        Wyloguj się
      </button>
      {!isLoading && !user && (
        <p className="mt-3">Jesteś wylogowany.</p>
      )}
    </div>
  );
}
