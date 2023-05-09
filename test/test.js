const statics = require('../tools/statics');

describe('analyzeCoupons function', () => {
  const coupons = [
    {
      country_code: 'us',
      coupon_id: '123',
      coupon_webshop_name: 'Retailer1',
      description: 'Description1',
      first_seen: '2022-01-01',
      last_seen: '2022-01-31',
      promotion_type: 'percent-off',
      title: 'Title1',
      value: 20,
      webshop_id: 'A'
    },
    {
      country_code: 'us',
      coupon_id: '456',
      coupon_webshop_name: 'Retailer2',
      description: 'Description2',
      first_seen: '2022-02-01',
      last_seen: '2022-02-28',
      promotion_type: 'dollar-off',
      title: 'Title2',
      value: 10,
      webshop_id: 'B'
    },
    {
      country_code: 'us',
      coupon_id: '789',
      coupon_webshop_name: 'Retailer1',
      description: 'Description3',
      first_seen: '2022-03-01',
      last_seen: '2022-03-31',
      promotion_type: 'percent-off',
      title: 'Title3',
      value: 30,
      webshop_id: 'A'
    }
  ];

  test('returns the coupons by Percent', () => {
    const result = statics.getStaticsByPromotionType(coupons, 'percent-off');
    console.log(result);
    expect(result).toEqual({
      'count': 2,
      'min': 20,
      'max': 30,
      'avg': 25
    });
  });


  test('returns the coupons by Dollar', () => {
    const result = statics.getStaticsByPromotionType(coupons, 'dollar-off');
    console.log(result);
    expect(result).toEqual({
      'count': 1,
      'min': 10,
      'max': 10,
      'avg': 10
    });
  });
});