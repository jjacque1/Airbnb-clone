import { useState } from "react";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form >
        <h1>Login</h1>

        <input
          type="text"
          value={email}
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="text"
          value={password}
          placeholder="Enter password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <button>Login</button>
      </form>
    </>
  );
}
