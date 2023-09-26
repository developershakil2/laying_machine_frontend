
const User = require("../models/User.model");
const FishPurchase = require('../models/FishPurchase.model');
const FeedBag = require('../models/FeedBag.model');
const Barns = require("../models/Barns.model");

const activeIntervals = new Map();



// Middleware to calculate and update daily earnings with a 100-day limit
const updateDailyEarningsMiddleware = async (req, res, next) => {
  try {
    const { fishPurchaseId, userId } = req.body;
    const fishPurchase = await FishPurchase.findById(fishPurchaseId);

    if (!fishPurchase) {
      return res.status(201).json({ message: 'Farm purchase not found' });
    }

    // Check if there is a feed bag associated with this FishPurchase and user
    const feedBag = await FeedBag.findOne({ fishPurchaseId, userId });

    if (!feedBag) {
      return res.status(201).json({ message: 'No feed bag for this Farm please buy feed for this farm house' });
    }

    // Check if the user has called the earning update function within 24 hours
    const user = await User.findById(userId);
    const lastEarningTimestamp = user.lastEarningTimestamp;

    if (lastEarningTimestamp) {
      const currentTime = Date.now();
      const timeDifference = currentTime - lastEarningTimestamp;
    
      if (timeDifference > 24 * 60 * 60 * 1000) {
        // User has not called within 24 hours, pause earnings
        fishPurchase.earningPaused = true;
        await Promise.all([fishPurchase.save()]);
      } else {
        // User has called within 24 hours, earnings continue
        fishPurchase.earningPaused = false;
        await Promise.all([fishPurchase.save()]);
      }
      // Save the updated earningPaused state in the database
      await Promise.all([fishPurchase.save()]);
    }

    const now = Date.now();
    const timeElapsed = now - fishPurchase.lastEarningDate;
    const minutesElapsed = timeElapsed / (1000 * 60);

    const oneMinutePercentage = (fishPurchase.buyAmount * 0.01) / 1440; // Earning 1% per day
    const earnings = oneMinutePercentage * minutesElapsed;

    // Check if earnings exceed the capital
    if (fishPurchase.earnings + earnings >= fishPurchase.buyAmount) {
      fishPurchase.earnings = 0 // Set earnings to the capital
    
    } else {
      fishPurchase.earnings += earnings;
    
    }

    fishPurchase.lastEarningDate = now;
    fishPurchase.earningPaused = false;
    await Promise.all([fishPurchase.save(), feedBag.save()]);

    // Update the user's last earning timestamp
    user.lastEarningTimestamp = now;
    await Promise.all([user.save()]);

    // Check if the user has reached the 100-day limit
    const purchaseDate = fishPurchase.purchaseDate;
    const hundredDaysInMilliseconds = 100 * 24 * 60 * 60 * 1000;
    const timeElapsedSincePurchase = now - purchaseDate;

    if (timeElapsedSincePurchase >= hundredDaysInMilliseconds) {
      const interval = activeIntervals.get(fishPurchase._id);
      clearInterval(interval);
      activeIntervals.delete(fishPurchase._id);

      // Update the feed bag's expiration date to 100 days from now
      feedBag.expirationDate = new Date(now + hundredDaysInMilliseconds);
      await feedBag.save();

      // Stop further earnings for this FishPurchase
      fishPurchase.earnings = 0;

      // Get the user's capital back
      user.balance += fishPurchase.buyAmount;
      await user.save();
    }

    res.status(200).json({ message: `hurray i got my feed thank you for feed me` });
    next();
  } catch (error) {
    console.error('Error updating daily earnings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
  
 
const buyProductMiddleware = async (req, res, next) => {
  try {
    const { userId, buyAmount, isBuy, barnId } = req.body;
    const user = await User.findById(userId);
   
    const barn = await Barns.findById(barnId)
    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }

    if (user.balance < buyAmount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Deduct the buyAmount from the user's balance
    user.balance -= buyAmount;
    await user.save();

    const fishPurchase = new FishPurchase({
      userId: user._id,
      buyAmount: buyAmount,
      isbuy: isBuy,
      barns:barnId,
      earnings: 0,
      lastEarningDate: Date.now(),
      purchaseDate: Date.now(),
      barnName:barn.barnName
    });
   
    await fishPurchase.save();

    if (!activeIntervals.has(fishPurchase._id)) {
      const interval = setInterval(() => {
        updateDailyEarnings(fishPurchase.userId, fishPurchase._id);
      }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

      activeIntervals.set(fishPurchase._id, interval);
    }
    // Update the last interaction date for the user
    user.lastInteractionDate = Date.now();
    await user.save();

    res.status(200).json({ message: `You bought chicken now you will have to feed your chicken to get egg 1 egg = 1%` });
    next();
  } catch (error) {
    console.error('Error handling product purchase:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Middleware to buy a feed bag
const buyFeedBagMiddleware = async (req, res, next) => {
  try {
    const { userId, fishPurchaseId, feedPrice } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }

    // Check if the user has enough balance to buy a feed bag
    const feedBagPrice =  feedPrice
    if (user.balance < feedBagPrice) {
      return res.status(200).json({ message: 'Insufficient balance to buy a feed bag' });
    }

    // Check if the user already has a feed bag for the product
    const existingFeedBag = await FeedBag.findOne({ userId, fishPurchaseId });

    if (existingFeedBag) {
      return res.status(200).json({ message: 'You already have a feed bag for this Farm house' });
    }

    // Create a new feed bag
    const feedBag = new FeedBag({
      userId: user._id,
      fishPurchaseId: fishPurchaseId,
      quantity: 1, // You can adjust the quantity as needed
      expirationDate: new Date(Date.now() + (100 * 24 * 60 * 60 * 1000)),
    });

    // Deduct the feed bag price from the user's balance
    user.balance -= feedBagPrice;

    await Promise.all([feedBag.save(), user.save()]);

    res.status(200).json({ message: 'Feed bag purchased successfully.' });
    next();
  } catch (error) {
    console.error('Error handling feed bag purchase:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



// Middleware to check if a user can claim earnings
const canClaimEarningsMiddleware = async (req, res, next) => {
  try {
    const { userId, fishPurchaseId } = req.body;
    const fishPurchase = await FishPurchase.findById(fishPurchaseId);

    if (!fishPurchase) {
      return res.status(400).json({ error: 'chicken purchase not found' });
    }

    // Check if user is the owner of the chicken purchase
    if (fishPurchase.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Check if user has earnings to claim
    if (fishPurchase.earnings <= 0) {
      return res.status(400).json({ error: 'No earnings to claim' });
    }

    next();
  } catch (error) {
    console.error('Error checking earnings eligibility:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



// Middleware to claim earnings to user balance
const claimEarningsMiddleware = async (req, res, next) => {
  try {
    const { userId, fishPurchaseId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(201).json({ message: 'User not found' });
    }

    const fishPurchase = await FishPurchase.findById(fishPurchaseId);

    if (!fishPurchase) {
      return res.status(201).json({ message: 'chicken purchase not found' });
    }

    // Claim earnings and update user balance
    user.balance += fishPurchase.earnings;
    fishPurchase.earnings = 0;
    await user.save();
    await fishPurchase.save();

    res.status(200).json({ message: 'you sold your egg successfully you will see your fair in your main balance ' });
    next();
  } catch (error) {
    console.error('Error claiming earnings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


 
// Middleware to check current earnings for a chicken purchase
const checkEarningsMiddleware = async (req, res, next) => {
  try {
    const  fishPurchaseId  = req.params.checkEarnings;
    const fishPurchase = await FishPurchase.findById(fishPurchaseId);

    if (!fishPurchase) {
      return res.status(400).json({ error: 'chicken purchase not found' });
    }
    res.status(200).json({ message: `Current earnings for purchase ${fishPurchase._id}: ${fishPurchase.earnings}`, earn:fishPurchase.earnings });
    next();
  } catch (error) {
    console.error('Error checking earnings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {buyProductMiddleware, buyFeedBagMiddleware, updateDailyEarningsMiddleware,checkEarningsMiddleware, claimEarningsMiddleware}
