import mongoose from 'mongoose';
import User from './User.model.js';

const employerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true
  },
  companyType: {
    type: String,
    enum: ['individual', 'company', 'contractor', 'agency'],
    required: true
  },
  description: {
    type: String,
    maxlength: 1000
  },
  website: {
    type: String,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    },
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  businessLicense: {
    licenseNumber: String,
    fileUrl: String,
    isVerified: {
      type: Boolean,
      default: false
    },
    verifiedAt: Date
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  jobsPosted: {
    type: Number,
    default: 0
  },
  hiredWorkers: {
    type: Number,
    default: 0
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'professional', 'enterprise'],
      default: 'free'
    },
    startDate: Date,
    endDate: Date,
    isActive: {
      type: Boolean,
      default: false
    }
  },
  preferences: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      },
      push: {
        type: Boolean,
        default: true
      }
    }
  }
});

// Create geospatial index
employerSchema.index({ 'location': '2dsphere' });

const Employer = User.discriminator('employer', employerSchema);

export default Employer;
