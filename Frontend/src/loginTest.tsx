import React, { useState } from 'react';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'admin' && password === '1234') {
      alert('Zalogowano!');
    } else {
      setError('Niepoprawna nazwa użytkownika lub hasło');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form 
        onSubmit={handleSubmit} 
        className="bg-emerald-800 p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl mb-6 text-center font-semibold">Logowanie</h2>

        <input
          type="text"
          placeholder="Nazwa użytkownika"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          autoFocus
        />

        <input
          type="password"
          placeholder="Hasło"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Zaloguj się
        </button>

        {error && (
          <p className="mt-4 text-red-600 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}
