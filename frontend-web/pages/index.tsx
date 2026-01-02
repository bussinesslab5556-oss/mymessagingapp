import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const handleLogin = () => {
    if (step === 1) setStep(2);
    else {
      alert('Logged in successfully!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold text-[#0055FF] mb-6 text-center">MyMessagingApp</h1>
        <p className="text-gray-500 mb-8 text-center">Login to your account to start messaging.</p>
        
        {step === 1 ? (
          <Input placeholder="Phone Number" value={phone} onChange={setPhone} />
        ) : (
          <Input placeholder="Enter OTP (123456)" value={otp} onChange={setOtp} />
        )}
        
        <Button 
          title={step === 1 ? "Send OTP" : "Verify OTP"} 
          onClick={handleLogin} 
        />
      </div>
    </div>
  );
        }
