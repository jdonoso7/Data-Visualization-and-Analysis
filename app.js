// Tools
const statics = require('./tools/statics');
const file = require('./tools/file');

const coupons = file.loadFile('./assets/coupons.json') 

// Count coupons by type
const couponCounts = coupons.coupons.reduce((counts, coupon) => {
  counts[coupon.promotion_type] = counts[coupon.promotion_type] + 1 || 1;
  return counts;
}, {});

console.log('Coupon Counts by Type:', couponCounts);

// Percent-Off Coupon Statistics

const percentOffCoupons = statics.getStaticsByPromotionType(coupons.coupons, 'percent-off');

console.log('Percent-Off Coupon Statistics:', percentOffCoupons);

// Dollar-Off Coupon Statistics
const dollarOffCoupons = statics.getStaticsByPromotionType(coupons.coupons, 'dollar-off');

console.log('Dollar-Off Coupon Statistics:', dollarOffCoupons);

// Coupon Statistics Grouped by Retailer

console.log('Statics By Retiler:');

statics.getStaticsByRetail(coupons.coupons);


