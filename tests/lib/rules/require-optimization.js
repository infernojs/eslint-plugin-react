/**
 * @fileoverview Enforce Inferno components to have a shouldComponentUpdate method
 * @author Evgueni Naverniouk
 */

'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/require-optimization');

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

const MESSAGE = 'Component is not optimized. Please add a shouldComponentUpdate method.';

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('inferno-require-optimization', rule, {
  valid: [{
    code: `
      class A {}
    `
  }, {
    code: `
      import Inferno from "inferno";
      class YourComponent extends Inferno.Component {
        shouldComponentUpdate () {}
      }
    `
  }, {
    code: `
      import Inferno, {Component} from "inferno";
      class YourComponent extends Component {
        shouldComponentUpdate () {}
      }
    `
  }, {
    code: `
      import Inferno, {Component} from "inferno";
      @infernoMixin.decorate(PureRenderMixin)
      class YourComponent extends Component {
        componetnDidMount () {}
        render() {}
      }
    `,
    parser: parsers.BABEL_ESLINT
  }, {
    code: `
      import Inferno from "inferno";
      createClass({
        shouldComponentUpdate: function () {}
      })
    `
  }, {
    code: `
      import Inferno from "inferno";
      createClass({
        mixins: [PureRenderMixin]
      })
    `
  }, {
    code: `
      @infernoMixin.decorate(PureRenderMixin)
      class DecoratedComponent extends Component {}
    `,
    parser: parsers.BABEL_ESLINT
  }, {
    code: `
      const FunctionalComponent = function (props) {
        return <div />;
      }
    `,
    parser: parsers.BABEL_ESLINT
  }, {
    code: `
      function FunctionalComponent(props) {
        return <div />;
      }
    `,
    parser: parsers.BABEL_ESLINT
  }, {
    code: `
      const FunctionalComponent = (props) => {
        return <div />;
      }
    `,
    parser: parsers.BABEL_ESLINT
  }, {
    code: `
      @bar
      @pureRender
      @foo
      class DecoratedComponent extends Component {}
    `,
    parser: parsers.BABEL_ESLINT,
    options: [{allowDecorators: ['renderPure', 'pureRender']}]
  }, {
    code: `
      import Inferno from "inferno";
      class YourComponent extends Inferno.PureComponent {}
    `,
    parser: parsers.BABEL_ESLINT,
    options: [{allowDecorators: ['renderPure', 'pureRender']}]
  }, {
    code: `
      import Inferno, {PureComponent} from "inferno";
      class YourComponent extends PureComponent {}
    `,
    parser: parsers.BABEL_ESLINT,
    options: [{allowDecorators: ['renderPure', 'pureRender']}]
  }, {
    code: `
      const obj = { prop: [,,,,,] }
    `
  }],

  invalid: [{
    code: `
      import Inferno from "inferno";
      class YourComponent extends Inferno.Component {}
    `,
    errors: [{
      message: MESSAGE
    }]
  }, {
    code: `
      import Inferno from "inferno";
      class YourComponent extends Inferno.Component {
        handleClick() {}
        render() {
          return <div onClick={this.handleClick}>123</div>
        }
      }
    `,
    parser: parsers.BABEL_ESLINT,
    errors: [{
      message: MESSAGE
    }]
  }, {
    code: `
      import Inferno, {Component} from "inferno";
      class YourComponent extends Component {}
    `,
    errors: [{
      message: MESSAGE
    }]
  }, {
    code: `
      import Inferno from "inferno";
      createClass({})
    `,
    errors: [{
      message: MESSAGE
    }]
  }, {
    code: `
      import Inferno from "inferno";
      createClass({
        mixins: [RandomMixin]
      })
    `,
    errors: [{
      message: MESSAGE
    }]
  }, {
    code: `
      @infernoMixin.decorate(SomeOtherMixin)
      class DecoratedComponent extends Component {}
    `,
    errors: [{
      message: MESSAGE
    }],
    parser: parsers.BABEL_ESLINT
  }, {
    code: `
      @bar
      @pure
      @foo
      class DecoratedComponent extends Component {}
    `,
    errors: [{
      message: MESSAGE
    }],
    parser: parsers.BABEL_ESLINT,
    options: [{allowDecorators: ['renderPure', 'pureRender']}]
  }]
});
