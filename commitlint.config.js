export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 1. Enforce standard types
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    // 2. Enforce lowercase types (FIXED: used to be 'lower')
    'type-case': [2, 'always', 'lower-case'],

    // 3. Enforce lowercase scope (FIXED: used to be 'lower')
    'scope-case': [2, 'always', 'lower-case'],

    // 4. Ensure subject is not empty
    'subject-empty': [2, 'never'],

    // 5. Ensure subject doesn't end with a period
    'subject-full-stop': [2, 'never', '.'],

    // 6. Max line length
    'body-max-line-length': [1, 'always', 200],
  },
};
