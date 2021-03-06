/**
 * @fileoverview Validate spacing before closing bracket in JSX.
 * @author ryym
 * @deprecated
 */

'use strict';

const getTokenBeforeClosingBracket = require('../util/getTokenBeforeClosingBracket');
const docsUrl = require('../util/docsUrl');
const log = require('../util/log');

let isWarnedForDeprecation = false;

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    deprecated: true,
    docs: {
      description: 'Validate spacing before closing bracket in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-space-before-closing')
    },
    fixable: 'code',

    messages: {
      noSpaceBeforeClose: 'A space is forbidden before closing bracket',
      needSpaceBeforeClose: 'A space is required before closing bracket'
    },

    schema: [{
      enum: ['always', 'never']
    }]
  },

  create(context) {
    const configuration = context.options[0] || 'always';

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXOpeningElement(node) {
        if (!node.selfClosing) {
          return;
        }

        const sourceCode = context.getSourceCode();

        const leftToken = getTokenBeforeClosingBracket(node);
        const closingSlash = sourceCode.getTokenAfter(leftToken);

        if (leftToken.loc.end.line !== closingSlash.loc.start.line) {
          return;
        }

        if (configuration === 'always' && !sourceCode.isSpaceBetweenTokens(leftToken, closingSlash)) {
          context.report({
            loc: closingSlash.loc.start,
            messageId: 'needSpaceBeforeClose',
            fix(fixer) {
              return fixer.insertTextBefore(closingSlash, ' ');
            }
          });
        } else if (configuration === 'never' && sourceCode.isSpaceBetweenTokens(leftToken, closingSlash)) {
          context.report({
            loc: closingSlash.loc.start,
            messageId: 'noSpaceBeforeClose',
            fix(fixer) {
              const previousToken = sourceCode.getTokenBefore(closingSlash);
              return fixer.removeRange([previousToken.range[1], closingSlash.range[0]]);
            }
          });
        }
      },

      Program() {
        if (isWarnedForDeprecation) {
          return;
        }

        log('The inferno/jsx-space-before-closing rule is deprecated. '
            + 'Please use the inferno/jsx-tag-spacing rule with the '
            + '"beforeSelfClosing" option instead.');
        isWarnedForDeprecation = true;
      }
    };
  }
};
