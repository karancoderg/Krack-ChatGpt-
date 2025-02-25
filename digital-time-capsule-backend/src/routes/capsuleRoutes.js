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
    let updatedCapsules = [];

    for (let capsule of capsules) {
      if (now < capsule.unlockDate) {
        // If capsule is still locked, just return limited info
        updatedCapsules.push({
          _id: capsule._id,
          title: capsule.title,
          status: "Locked",
          unlockDate: capsule.unlockDate,
          message: `This capsule is locked until ${capsule.unlockDate.toISOString()}`,
        });
      } else {
        // Capsule is unlocked
        if (!capsule.notified) {
          await sendEmail(
            user.email,
            "🎉 Your Time Capsule is Unlocked!",
            `Hey ${user.email}, your time capsule "${capsule.title}" is now unlocked! Check it out.`
          );

          // ✅ Mark this capsule as notified and save
          capsule.notified = true;
          await capsule.save();
        }

        updatedCapsules.push({ ...capsule.toObject(), status: "Unlocked" });
      }
    }

    res.json(updatedCapsules);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Failed to fetch capsules" });
  }
};

export default getCapsules;