import { ContentfulClient } from 'react-contentful';

const accessToken = process.env.CTFL_ACCESS_TOKEN;
const space = process.env.CTFL_SPACE_ID;

export const client = ContentfulClient({ accessToken, space });
