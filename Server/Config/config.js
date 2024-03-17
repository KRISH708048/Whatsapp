var config = {
  development: {
    //url to be used in link generation
    url: 'http://my.site.com',
    //psql connection settings
    database: {
      user: 'postgres',
      host: 'localhost',
      database: 'abc',
      password: 'password',
      port: 5432, // Default PostgreSQL port
    },
    //server details
    server: {
      host: '127.0.0.1',
      port: '3422'
    }
  },
  // production: {
  //   //url to be used in link generation
  //   url: 'http://my.site.com',
  //   //mongodb connection settings
  //   database: {
  //     host: '127.0.0.1',
  //     port: '27017',
  //     db: 'site'
  //   },
  //   //server details
  //   server: {
  //     host: '127.0.0.1',
  //     port: '3421'
  //   }
  // }
};
module.exports = config;
