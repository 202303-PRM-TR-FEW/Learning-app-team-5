import React from 'react';
import { mount } from '@cypress/react';
import RatingFilter from './RatingFilter';

describe('<RatingFilter />', () => {
  it('renders', () => {
    mount(<RatingFilter />);
    // Add any initial assertions you want to make
  });
});
