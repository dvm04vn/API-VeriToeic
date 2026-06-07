import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        last_name: {
            type: String,
            default: '',
        },
        first_name: {
            type: String,
            default: '',
        },
        avatar: {
            type: String,
            default: '',
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            default: 'other',
        },
        bio: {
            type: String,
            default: '',
        },
        facebook_url: {
            type: String,
            default: '',
        },
        instagram_url: {
            type: String,
            default: '',
        },
        tiktok_url: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    },
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;