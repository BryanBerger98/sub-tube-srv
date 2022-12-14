module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json']
	},
	plugins: ['@typescript-eslint'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
	rules: {
		'indent': [
            'warn',
            // eslint-disable-next-line no-magic-numbers
            4,
            {
                'SwitchCase': 1,
            },
        ],
        'no-func-assign': 'error',
		'no-console': 'warn',
        'no-magic-numbers': [ 'warn', {
            'detectObjects': false,
        } ],
        // Syntax
        'semi': [ 'warn', 'always' ],
        'quotes': [ 'warn', 'single' ],
        'linebreak-style': [
            'warn',
            'unix',
        ],
        'object-curly-spacing': [ 'warn', 'always' ],
        'array-bracket-spacing': [ 'warn', 'always' ],
        'computed-property-spacing': [ 'warn', 'always' ],
        'comma-dangle': [ 'warn', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'never',
        } ],
        'arrow-spacing': 'warn',
        'key-spacing': [ 'warn', {
            'beforeColon': false,
            'afterColon': true,
            'mode': 'strict',
        } ],
        'no-multi-spaces': 'warn',
        'no-multiple-empty-lines': 'warn',
        'no-empty-function': 'warn',
        'require-await': 'error',
        'template-curly-spacing': [ 'warn', 'always' ],
        // Conditions
        'default-case': 'warn',
        'default-case-last': 'warn',
        'no-duplicate-case': 'warn',
        'no-constant-condition': 'warn',
        // Variables and constants
        'no-var': 'error',
        'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [ 'warn' ],
        'no-const-assign': 'error',
        'no-multi-assign': 'warn',
        'no-self-assign': [ 'warn', { 'props': true } ],
        // Constructors
        'new-cap': [ 'warn', {
            'capIsNew': false,
            'newIsCap': true,
        } ],
        // Text
        'valid-typeof': 'error',
        // ES6
        'no-duplicate-imports': [
            'error',
        ],
        'no-class-assign': 'error',
	}
}
