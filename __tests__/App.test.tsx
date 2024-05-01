import 'react-native';
import React from 'react';
import App from '../App';
import {describe, expect, test} from '@jest/globals';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import LogIn from '../src/Screens/LogIn';

it('test', () => {
  let component = renderer.create(<LogIn/>)
  expect(component).toBeDefined()
})
