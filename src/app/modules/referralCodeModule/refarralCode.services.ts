import ReferralCode from './refarralCode.model';

const createReferralCode = async (data: any) => {
  return await ReferralCode.create(data);
};

const getReferralCodeByReferralCode = async(referralCode: string) => {
    return await ReferralCode.findOne({code: referralCode})
}

export default {
  createReferralCode,
  getReferralCodeByReferralCode,
};
