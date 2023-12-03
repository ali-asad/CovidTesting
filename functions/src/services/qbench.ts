import { sign } from 'jsonwebtoken';
import * as functions from 'firebase-functions';
import axios from 'axios';
import { stringify } from 'qs';
import Bottleneck from 'bottleneck';

import { config } from '../config';
import { Sample } from '../types';
import { convertUTC2PST } from '../utils';

const limiter = new Bottleneck({
  minTime: 300,
});

const getAccessToken = async () => {
  const token = sign(
    { sub: functions.config().qbench.client_id },
    functions.config().qbench.client_secret,
    { expiresIn: '1800s' }
  );

  const {
    data: { access_token },
  } = await axios({
    method: 'post',
    url: `${config.qbenchUrl}/qbench/oauth2/v1/token`,
    data: stringify({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return access_token;
};

const getOrderById = async (id: string, accessToken?: string) => {
  let token = accessToken;

  if (!token) {
    token = await getAccessToken();
  }

  const { data } = await axios({
    method: 'get',
    url: `${config.qbenchUrl}/qbench/api/v1/order/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    ...data,
    samples: data.samples.map((sample: Sample) => ({
      ...sample,
      time_of_collection: convertUTC2PST(sample.time_of_collection),
      tests: sample.tests.map((test) => ({
        ...test,
        complete_date: convertUTC2PST(test.complete_date),
        start_date: convertUTC2PST(test.start_date),
      })),
    })),
  };
};

const deleteOrder = async (id: string, accessToken?: string) => {
  let token = accessToken;

  if (!token) {
    token = await getAccessToken();
  }

  await axios({
    method: 'delete',
    url: `${config.qbenchUrl}/qbench/api/v1/order/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getOrdersByIds = async (
  ids: (string | undefined)[],
  accessToken?: string
) => {
  let token = accessToken;

  if (!token) {
    token = await getAccessToken();
  }

  return await Promise.all(
    ids.map((id) =>
      id
        ? limiter.schedule(() =>
            getOrderById(id, token).catch((err) => {
              functions.logger.error(
                `getOrdersByIds - can't get order with ID: ${id}`,
                err
              );
            })
          )
        : null
    )
  );
};

const getResultsReportUrl = async (sampleId: string, accessToken?: string) => {
  let token = accessToken;

  if (!token) {
    token = await getAccessToken();
  }

  const result = await axios({
    method: 'get',
    url: `${config.qbenchUrl}/qbench/api/v1/report/sample/${sampleId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return result.data;
};

export default {
  getAccessToken,
  getOrderById,
  deleteOrder,
  getOrdersByIds,
  getResultsReportUrl,
};
