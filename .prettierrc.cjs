/**
 * "auto":  This option will use the line endings that are already present in the file.
 *          If the file has mixed line endings, Prettier will use the first line ending it encounters in the file.
 * "lf":    This option will use Unix-style line endings (\n) when formatting the file.
 * "crlf":  This option will use Windows-style line endings (\r\n) when formatting the file.
 * "cr":    This option will use classic Mac-style line endings (\r) when formatting the file.
 *
 * If the file has Windows-style line endings, Prettier will use Windows-style line endings when formatting the file.
 *
 * IMPORTANT - Unix style ending should be used
 */

module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  arrowParens: 'avoid',
  endOfLine: 'lf'
};
