import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";
import crypto from "crypto";

export async function POST(req) {
  await connectToDatabase();
  const { email } = await req.json();
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: "No user found" }), {
      status: 404,
    });
  }

  // Generate a reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
  await user.save();

  // In production, send an email with a reset link containing resetToken.
  return new Response(
    JSON.stringify({ message: "Password reset link sent", resetToken }),
    { status: 200 }
  );
}
