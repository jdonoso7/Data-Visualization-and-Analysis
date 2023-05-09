const getStaticsByPromotionType = (cuopons, typePercent) => {

    const couponsByPromotion = cuopons.filter((coupon) => coupon.promotion_type === typePercent);
    return {
        count: couponsByPromotion.length,
        min: Math.min(...couponsByPromotion.map((coupon) => coupon.value)),
        max: Math.max(...couponsByPromotion.map((coupon) => coupon.value)),
        avg: couponsByPromotion.reduce((total, coupon) => total + coupon.value, 0) / couponsByPromotion.length,
    }   
}

const getStaticsByRetail = (coupons) => {
    let retailers = [];
    retailers = coupons.map((coupon) => {
        return coupon.webshop_id;
    })

    // Clean unique retailers
    const uniqueRetailers = [... new Set(retailers)];

    uniqueRetailers.forEach(retail => {
        const couponByRetail = coupons.filter((coupon) => coupon.webshop_id === retail)
        const coupontStaticsByPercent = getStaticsByPromotionType(couponByRetail, 'percent-off');
        const coupontStaticsByDollar = getStaticsByPromotionType(couponByRetail, 'dollar-off');

        const staticsByRetailer = {
            'percent-off': coupontStaticsByPercent,
            'dollar-off': coupontStaticsByDollar,
        }

        console.log('Retail '+retail, staticsByRetailer);
    });
}

module.exports = {
    getStaticsByPromotionType,
    getStaticsByRetail
}