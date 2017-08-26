if(!process.env.NODE_ENV){
  process.env.NODE_ENV='development';
}
const env = process.env.NODE_ENV;

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
  process.env.IP = "localhost";
} else {
  process.env['JWT_SECRET'] = process.env['JWT_SECRET'] || "cposkdwmrcmrmfvijrmvijrklfmvpxkcmwr";
}
