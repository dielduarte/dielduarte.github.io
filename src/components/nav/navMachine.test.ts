import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pathToState, langFromPath, visibleNodes } from './navMachine.ts';

test('photos pages belong to about', () => {
  assert.equal(pathToState('/photos/en/'), 'about');
  assert.equal(pathToState('/photos/pt-br/some-photo/'), 'about');
  assert.equal(langFromPath('/photos/pt-br/some-photo/'), 'pt-br');
});

test('the main menu is home, writing, about and contact', () => {
  assert.deepEqual(
    visibleNodes.map((node) => node.id),
    ['home', 'writing', 'about', 'contact'],
  );
});
