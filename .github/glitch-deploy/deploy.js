const upload_Md = require('./git-push.js');
const createNew_Md = require('./newCreate.js')
const shell = require('shelljs')
const queryString = require('query-string');
const axios = require("axios").default;
const axiosRetry = require('axios-retry');

setTimeout(() => {
  console.log('force exit');
  process.exit(0)
}, 30 * 60 * 1000);

axiosRetry(axios, {
  retries: 100,
  retryDelay: (retryCount) => {
    // console.log(`retry attempt: ${retryCount}`);
    return 3000 || retryCount * 1000;
  },
  retryCondition: (error) => {
    return error.response.status === 502;
  },
});


const listProject = `https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/scratched-ancient-adapter|https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/flaxen-fern-aragosaurus|https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/jumpy-apricot-soccer|https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/eastern-wooden-silk|https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/polite-future-clarinet|https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/wonderful-massive-bottom|https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/lackadaisical-gratis-bowl|https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/wheat-automatic-softball|https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/peridot-desert-lip|https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/fern-future-entree|https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/flawless-diamond-dolphin|https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/violet-berry-sawfish|https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/winter-tender-hurricane|https://dd11d1a8-5c95-46fb-9072-9ed1969f85d9@api.glitch.com/git/rumbling-mint-taker`.trim().split('|');

const delay = t => {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(true);
    }, t);
  });
};

(async () => {
  try {
    let accountNumber = 0;

    for (let i = 0; i < listProject.length; i++) {
      accountNumber = i + 1;
      try {
        const nameProject = listProject[i].split('/')[4]
        console.log('deploy', nameProject);
        createNew_Md.run(nameProject)
        await upload_Md.upload2Git(listProject[i].trim(), 'code4Delpoy');
        console.log(`account ${accountNumber} upload success ^_^`);

        axios
          .get(`https://eager-profuse-python.glitch.me/deploy?${queryString.stringify({
            email: listProject[i].trim() + ' true'
          })}`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
            } else {
              console.log('Loi');
            }
          });

        if (i + 1 < listProject.length) await delay(1.8 * 60 * 1000);
      } catch (error) {
        console.log(`account ${accountNumber} upload fail ^_^`);
        axios
          .get(`https://eager-profuse-python.glitch.me/deploy?${queryString.stringify({
            email: listProject[i].trim() + ' false'
          })}`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
            } else {
              console.log('Loi');
            }
          });
      }

      if (process.cwd().includes('code4Delpoy')) shell.cd('../', { silent: true });

    }

    await delay(20000)
    console.log('Done! exit')
    process.exit(0)

  } catch (err) {
    console.log(`error: ${err}`);
  }
})();