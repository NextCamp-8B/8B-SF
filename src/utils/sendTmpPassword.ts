import nodemailer from 'nodemailer';

export async function sendTmpPassword(
  toEmail: string,
  tmpPassword: string,
) {
  const transporterNaver = nodemailer.createTransport({
    service: 'naver',
    host: 'smtp.naver.com',
    port: 587,
    auth: {
      user: process.env.NAVER_ID,
      pass: process.env.NAVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NAVER_ID,
    to: toEmail,
    subject: '아잇나우 임시 비밀번호 발급',
    text: `아잇나우 회원님의 임시 비밀번호는 다음과 같습니다: ${tmpPassword}`,
  };

  try {
    await transporterNaver.sendMail(mailOptions);
    console.log('임시 비밀번호가 이메일로 발송되었습니다.');
    return true;
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    return false;
  }
}
