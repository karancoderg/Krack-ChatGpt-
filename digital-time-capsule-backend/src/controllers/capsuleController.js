import Capsule from "../models/Capsule.js";
import User from "../models/User.js";
import { sendEmail } from "../config/email.js";

export const getCapsules = async (req, res) => {
  try {
    const capsules = await Capsule.find({ userId: req.user.userId });
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const now = new Date();

    const processedCapsules = await Promise.all(
      capsules.map(async (capsule) => {
        if (now < capsule.unlockDate) {
          return {
            _id: capsule._id,
            title: capsule.title,
            status: "Locked",
            unlockDate: capsule.unlockDate,
            message: `This capsule is locked until ${capsule.unlockDate.toISOString()}`,
          };
        } else {
          if (!capsule.notified) {
            await sendEmail(
              user.email,
              "🎉 Your Time Capsule is Unlocked!",
              `Hey ${user.email}, your time capsule "${capsule.title}" is now unlocked! Check it out.`
            );
            capsule.notified = true; // Mark capsule as notified
            await capsule.save(); // ✅ Save updated status
          }
          return { ...capsule.toObject(), status: "Unlocked" };
        }
      })
    );

    res.json(processedCapsules);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Failed to fetch capsules" });
  }
};
