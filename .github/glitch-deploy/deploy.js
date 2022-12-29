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


const listProject = `https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/arrow-luxurious-beetle|https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/buttercup-great-locust|https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/flaxen-almondine-whale|https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/successful-abundant-degree|https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/creative-catkin-verbena|https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/real-fluffy-jump|https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/careful-western-aristosuchus|https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/chivalrous-cloud-ferret|https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/separate-sunrise-yam|https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/educated-powerful-equinox|https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/purrfect-deeply-worm|https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/round-midnight-cry|https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/rift-sugar-hill|https://112c62c8-d2c1-42cf-9ae5-5e3add8efc04@api.glitch.com/git/butternut-spotted-lingonberry`.trim().split('|');

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