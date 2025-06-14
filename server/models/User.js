const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    enum: ['restaurant', 'ngo']
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  // Restaurant specific fields
  restaurantType: {
    type: String,
    required: function() {
      return this.role === 'restaurant';
    }
  },
  operatingHours: {
    type: String,
    required: function() {
      return this.role === 'restaurant';
    }
  },
  // NGO specific fields
  ngoType: {
    type: String,
    required: function() {
      return this.role === 'ngo';
    }
  },
  serviceArea: {
    type: String,
    required: function() {
      return this.role === 'ngo';
    }
  },
  beneficiariesServed: {
    type: Number,
    required: function() {
      return this.role === 'ngo';
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password')) {
      console.log('Hashing password for user:', this.email);
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    console.log('Comparing password for user:', this.email);
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User; 