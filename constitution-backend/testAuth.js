import fetch from "node-fetch";

// Test signup
async function testSignup() {
  const response = await fetch("http://10.129.121.191:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firebaseUid: "test-uid-123",
      email: "test@example.com",
      role: "citizen"
    }),
  });
  const data = await response.json();
  console.log("Signup test:", data);
}

// Test login
async function testLogin() {
  const response = await fetch("http://10.129.121.191:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firebaseUid: "test-uid-123"
    }),
  });
  const data = await response.json();
  console.log("Login test:", data);
}

// Run tests
testSignup().then(() => testLogin()).catch(console.error);
