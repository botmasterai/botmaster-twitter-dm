import test from 'ava';
import Twit from 'twit';

import TwitterBot from '../lib';
import config from './_config';

test('verify that settings are correctly set after default instantiation', (t) => {
  t.plan(9);
  const credentials = config.twitterCredentials();
  const bot = new TwitterBot({
    credentials,
  });

  t.is(bot.type, 'twitter-dm');
  t.is(bot.requiresWebhook, false);
  t.deepEqual(bot.requiredCredentials, ['consumerKey', 'consumerSecret',
    'accessToken', 'accessTokenSecret']);
  t.deepEqual(bot.receives, {
    text: true,
    attachment: {
      audio: true,
      file: true,
      image: true,
      video: true,
      location: false,
      fallback: false,
    },
    echo: false,
    read: false,
    delivery: false,
    postback: false,
    quickReply: false,
  });
  t.deepEqual(bot.sends, {
    text: true,
    quickReply: false,
    locationQuickReply: false,
    senderAction: {
      typingOn: false,
      typingOff: false,
      markSeen: false,
    },
    attachment: {
      audio: true,
      file: true,
      image: true,
      video: true,
    },
  });
  t.is(bot.retrievesUserInfo, false);
  t.is(bot.twit.constructor, Twit, 'wrong constructor of twit');
  t.not(bot.userStream, undefined, 'wrong constructor of twit');
  t.is(bot.id, credentials.accessToken.split('-')[0]);
});
