import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
                index: true,
			},
		],
		order: {
			type: Number,
			default: 0,
		},
		
	},
	{ timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;

