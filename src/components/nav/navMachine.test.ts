import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createActor } from 'xstate';
import { navMachine, pathToState, langFromPath } from './navMachine.ts';

test('photos pages resolve to the photos state', () => {
  assert.equal(pathToState('/photos/en/'), 'photos');
  assert.equal(pathToState('/photos/pt-br/some-photo/'), 'photos');
  assert.equal(langFromPath('/photos/pt-br/some-photo/'), 'pt-br');
});

test('the machine can move into and out of photos', () => {
  const actor = createActor(navMachine).start();
  actor.send({ type: 'GO_PHOTOS' });
  assert.equal(actor.getSnapshot().value, 'photos');
  actor.send({ type: 'GO_ABOUT' });
  assert.equal(actor.getSnapshot().value, 'about');
});
