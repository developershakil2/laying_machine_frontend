const textflow = require('textflow.js')

textflow.useKey('cGOLGyI2ynX52DZSa4ylBuAgFv7HuycDnRNS2LkxyfwJxcTyPPtqzTPMfxOhBShZ');

const sendCode = (req, res, next) => {
  try {
    const { phone } = req.body;
    textflow.sendVerificationSMS(phone);
    res.status(200).send('We have sent a verification code');
    next();
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
};

const verifyCode = async (req, res, next) => {
  try {
    const { phone, code } = req.body;
    const result = await textflow.verifyCode(phone, code);
       if(result){
        res.status(200).send("your phone is verified");
       }else{
        res.send("invalid code please enter code that we've sent to your phone number").status(404);
       }
    next();
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
};

module.exports = { verifyCode, sendCode };
