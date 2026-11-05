/* Spelling Trainer: hear a word, type it, and learn the spelling patterns that cause mistakes. */
(function () {
  'use strict';
  const PATTERNS = [['Double letters', 'accommodate, necessary, occur, occurred, committee, recommend'], ['-ance or -ence', 'significance, relevance, existence, independence'], ['-able or -ible', 'available, reliable, visible, possible'], ['Silent letters', 'environment (n), government (n), knowledge (k, d)'], ['ie or ei', 'receive, perceive, achieve, believe: i before e, except after c'], ['-ly after -al', 'accidental → accidentally, basic → basically']];
  const items = (words, n, seed) => SK.sample(SK.rng(seed), words.filter((w) => w.w.length >= 5 && !w.w.includes(' ') && !w.w.includes('-')), n).map((w) => ({ id: 'sp-' + w.id, type: 'text', topic: 'Spelling', stem: 'Listen and type the word you hear.' + (SK.speech && SK.speech.ok && SK.speech.ok() ? '' : ' Meaning: ' + w.d), audio: { title: 'Word', text: w.w + '. ' + w.e + ' ' + w.w + '.' }, answer: w.w, explanation: '**' + w.w + '**: ' + w.d + '.' }));
  const App = {
    about: 'Complete the Words, the email task and the discussion post all need accurate spelling. This app reads a word aloud in a sentence, you type it, and it checks each letter. Missed words go to the error log, and a list explains the patterns behind the most common spelling mistakes.',
    how: ['Choose your voice and speed in the suite\'s listening apps, or use the default.', 'In **Practice**, press Play, listen, and type the word.', 'Study the **Patterns** behind the words you miss.'],
    tabs: [
      { id: 'practice', label: 'Practice', render(el, ctx) { SK.quizStarter(el, { title: 'Spelling', sizes: [10, 20], make: (t, n, s) => items(ctx.data.academic_words, n, s), seconds: (n) => n * 25 }); } },
      { id: 'patterns', label: 'Patterns', render(el) { el.appendChild(SK.card('Spelling patterns', SK.table(['Pattern', 'Examples'], PATTERNS, false))); } },
    ],
    items,
    checks: { 'every spelling item says the word and accepts it typed': (data, assert) => {
      for (const it of items(data.academic_words, 100, 2)) { assert.ok(it.audio.text.startsWith(it.answer)); assert.ok(SK.isCorrect(it, ' ' + it.answer.toUpperCase() + ' ')); assert.deepEqual(SK.validateItem(it), []); }
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
