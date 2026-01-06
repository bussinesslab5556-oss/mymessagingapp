import React, { useState } from "react";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const handleLogin = async () => {
    try {
      if (step === 1) {
        // ব্যাকএন্ডে OTP পাঠানোর রিকোয়েস্ট
        const res = await fetch("http://localhost:5000/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        });

        if (res.ok) {
          setStep(2);
        } else {
          alert("Failed to send OTP");
        }
      } else {
        // OTP verify করার রিকোয়েস্ট
        const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, otp }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token); // JWT টোকেন সেভ করা
          alert("Logged in successfully!");
        } else {
          alert(data.message || "Invalid OTP");
        }
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Cannot connect to Backend Server!");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>MyMessagingApp Web UI</h1>

      {/* Simple Login Form */}
      {step === 1 && (
        <div>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ padding: "0.5rem", marginRight: "0.5rem" }}
          />
          <button onClick={handleLogin} style={{ padding: "0.5rem 1rem" }}>
            Send OTP
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: "0.5rem", marginRight: "0.5rem" }}
          />
          <button onClick={handleLogin} style={{ padding: "0.5rem 1rem" }}>
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
}
