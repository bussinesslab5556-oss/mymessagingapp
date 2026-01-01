return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;

    // Handle Multi-device logic
    const deviceIndex = user.linkedDevices.findIndex(d => d.deviceId === deviceId);
    if (deviceIndex > -1) {
      user.linkedDevices[deviceIndex].lastSeen = new Date();
    } else {
      user.linkedDevices.push({ deviceId, deviceName, lastSeen: new Date() } as any);
    }

    await user.save();

    const token = jwt.sign({ userId: user._id, deviceId }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '30d' });

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};
