const handleLogin = async () => {
    try {
      if (step === 1) {
        // ব্যাকএন্ডে ওটিপি পাঠানোর রিকোয়েস্ট
        const res = await fetch('http://localhost:5000/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone }),
        });
        if (res.ok) setStep(2);
        else alert("Failed to send OTP");
      } else {
        // ওটিপি ভেরিফাই করার রিকোয়েস্ট
        const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, otp }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('token', data.token); // JWT টোকেন সেভ করা
          alert('Logged in successfully!');
        } else {
          alert(data.message || 'Invalid OTP');
        }
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Cannot connect to Backend Server!");
    }
  };
