import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: {
    type: String,
    enum: ["admin", "member"],
    required: true,
  },
  permissions: {
    type: [String], 
    default: function() {
      return this.role === 'admin' 
        ? ['read', 'write']  
        : ['read'];           
    },
  },
  joined_at: { type: Date, default: Date.now },
});
const MessageSchema = new mongoose.Schema({

  senderId: { type: String, required: true },
  content: { type: String, required: true },
  sent_at: { type: Date, default: Date.now },
});

const GroupSchema = new mongoose.Schema({
  
  name: { type: String, required: true , unique:true},
  description: { type: String },
  created_at: { type: Date, default: Date.now },
 
  members: [MemberSchema],
  messages: [MessageSchema],
});

const Group = mongoose.model("Group", GroupSchema);
export default Group;
