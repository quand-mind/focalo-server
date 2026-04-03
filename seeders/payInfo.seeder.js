import PayInfo from '../src/models/payInfo.model.js';

export const seedPayInfo = async () => {
  return await PayInfo.create({
    bank: 'Bank of America',
    cardNumber: '1111222233334444',
    bankId: 'BOFAUS3N'
  });
};
