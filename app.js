const fs = require('fs');

// Load coupons data
const couponsData = fs.readFileSync('./assets/coupons.json');
const coupons = JSON.parse(couponsData);

// Count coupons by type
const couponCounts = coupons.coupons.reduce((counts, coupon) => {
  counts[coupon.promotion_type] = counts[coupon.promotion_type] + 1 || 1;
  return counts;
}, {});

console.log('Coupon Counts by Type:', couponCounts);

// Percent-Off Coupon Statistics

const percentOffCoupons = getStaticsByPromotionType(coupons.coupons, 'percent-off');

console.log('Percent-Off Coupon Statistics:', percentOffCoupons);

// Dollar-Off Coupon Statistics
const dollarOffCoupons = getStaticsByPromotionType(coupons.coupons, 'dollar-off');

console.log('Dollar-Off Coupon Statistics:', dollarOffCoupons);

// Coupon Statistics Grouped by Retailer

console.log('Statics By Retiler:');

let retailers = [];
retailers = coupons.coupons.map((coupon) => {
    return coupon.webshop_id;
})

// Clean unique retailers
const uniqueRetailers = [... new Set(retailers)];

uniqueRetailers.forEach(retail => {
    const couponByRetail = coupons.coupons.filter((coupon) => coupon.webshop_id === retail)
    const coupontStaticsByPercent = getStaticsByPromotionType(couponByRetail, 'percent-off');
    const coupontStaticsByDollar = getStaticsByPromotionType(couponByRetail, 'dollar-off');

    const staticsByRetailer = {
        'percent-off': coupontStaticsByPercent,
        'dollar-off': coupontStaticsByDollar,
    }

    console.log('Retail '+retail, staticsByRetailer);
});

function getStaticsByPromotionType(cuopons, typePercent) {

    const couponsByPromotion = cuopons.filter((coupon) => coupon.promotion_type === typePercent);
    return {
        count: couponsByPromotion.length,
        min: Math.min(...couponsByPromotion.map((coupon) => coupon.value)),
        max: Math.max(...couponsByPromotion.map((coupon) => coupon.value)),
        avg: couponsByPromotion.reduce((total, coupon) => total + coupon.value, 0) / couponsByPromotion.length,
    }   
}
