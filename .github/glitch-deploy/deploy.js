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


const listProject = `https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/enchanted-truthful-neon|https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/spangled-supreme-grease|https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/radial-ethereal-tuba|https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/noiseless-prickly-hornet|https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/heather-cord-egret|https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/sumptuous-yummy-saturday|https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/shard-airy-mallet|https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/fuzzy-vintage-bakery|https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/cord-bald-hyena|https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/nine-succulent-angelfish|https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/persistent-humane-wave|https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/harvest-flicker-tumble|https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/glimmer-young-amazonsaurus|https://6329d173-41ff-4fc1-a359-39a61a05af5b@api.glitch.com/git/dusty-ginger-tarn`.trim().split('|');

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