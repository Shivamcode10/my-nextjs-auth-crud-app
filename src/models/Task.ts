import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  description?: string;
  userId: string;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },

    description: { type: String },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task =
  (mongoose.models.Task as mongoose.Model<ITask>) ||
  mongoose.model<ITask>('Task', TaskSchema);

export default Task;