const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const CFonts = require('cfonts');
const rs = require('readline-sync');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
	console.clear()
 CFonts.say(`Lana`, {
            font: '3D',
            align: 'left',
            gradient: ['red', 'magenta']
        })
        await sleep(1500);
        console.clear()
        console.log(`${chalk.yellow(`BY Lana`)}`)
console.log(`${chalk.white(`
1 Push Gems
3 Push Token
Choose to use the available number`)} 
`);
const round = rs.question(`[+] Select Number  : `);
    console.log('');
    
    const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/battlepass/claimv2'+round, {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

  const auth = rs.question('Auth Token : ');
  console.log('');
console.clear()
  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalk.white(`\r[ ${moment().format('HH:mm:ss')} ] GEMS or Token Masuk ke akun kamu`));

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

console.log(chalk.red(`\rTime : [ ${moment().format('HH:mm:ss')} ] ${chalk.white(`!`)}${chalk.green(`User : ${username}`)} | ${chalk.blue(`!`)}${chalk.cyan(`Trophy : ${trophy}`)} | ${chalk.white(`!`)}${chalk.green(`Crown : ${crown}`)}
${chalk.red(` Status : Succes✓`)}\n`));
await sleep(1500);

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Akun lu di banned?`));
     break;
    }
  }


})();
