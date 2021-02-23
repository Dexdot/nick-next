/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const contentfulManagement = require('contentful-management');

const accessToken = process.env.CTFL_MNG_TOKEN;
const SPACE_ID = process.env.CTFL_SPACE_ID;
const ENV_NAME = process.env.CTFL_ENVIRONMENT;

module.exports = () => {
  const contentfulClient = contentfulManagement.createClient({ accessToken });

  return contentfulClient
    .getSpace(SPACE_ID)
    .then((space) => space.getEnvironment(ENV_NAME));
};
