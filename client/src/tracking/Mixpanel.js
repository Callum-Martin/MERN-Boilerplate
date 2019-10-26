import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';
import { MIXPANEL_TOKEN } from '../config';

mixpanel.init(MIXPANEL_TOKEN);

// assuming we only want to track actions on the production environment
let env_check = process.env.NODE_ENV === 'production';

let actions = {
  identify: (id) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props);
    }
  }
};

export let Mixpanel = actions;
