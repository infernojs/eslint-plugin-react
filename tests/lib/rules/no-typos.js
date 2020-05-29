/**
 * @fileoverview Tests for no-typos
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-typos');

const parsers = require('../../helpers/parsers');

const parserOptions = {
  ecmaVersion: 2018,
  ecmaFeatures: {
    jsx: true
  },
  sourceType: 'module'
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ERROR_MESSAGE = 'Typo in static class property declaration';
const ERROR_MESSAGE_LIFECYCLE_METHOD = (actual, expected) => `Typo in component lifecycle method declaration: ${actual} should be ${expected}`;
const ERROR_MESSAGE_STATIC = (method) => `Lifecycle method should be static: ${method}`;

const ruleTester = new RuleTester();
ruleTester.run('no-typos', rule, {
  valid: [{
    code: `
      class First {
        static PropTypes = {key: "myValue"};
        static ContextTypes = {key: "myValue"};
        static ChildContextTypes = {key: "myValue"};
        static DefaultProps = {key: "myValue"};
      }
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      class First {}
      First.PropTypes = {key: "myValue"};
      First.ContextTypes = {key: "myValue"};
      First.ChildContextTypes = {key: "myValue"};
      First.DefaultProps = {key: "myValue"};
    `,
    parserOptions
  }, {
    code: `
      class First extends Inferno.Component {
        static propTypes = {key: "myValue"};
        static contextTypes = {key: "myValue"};
        static childContextTypes = {key: "myValue"};
        static defaultProps = {key: "myValue"};
      }
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      class First extends Inferno.Component {}
      First.propTypes = {key: "myValue"};
      First.contextTypes = {key: "myValue"};
      First.childContextTypes = {key: "myValue"};
      First.defaultProps = {key: "myValue"};
    `,
    parserOptions
  }, {
    code: `
      class MyClass {
        propTypes = {key: "myValue"};
        contextTypes = {key: "myValue"};
        childContextTypes = {key: "myValue"};
        defaultProps = {key: "myValue"};
      }
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      class MyClass {
        PropTypes = {key: "myValue"};
        ContextTypes = {key: "myValue"};
        ChildContextTypes = {key: "myValue"};
        DefaultProps = {key: "myValue"};
      }
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      class MyClass {
        proptypes = {key: "myValue"};
        contexttypes = {key: "myValue"};
        childcontextypes = {key: "myValue"};
        defaultprops = {key: "myValue"};
      }
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      class MyClass {
        static PropTypes() {};
        static ContextTypes() {};
        static ChildContextTypes() {};
        static DefaultProps() {};
      }
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      class MyClass {
        static proptypes() {};
        static contexttypes() {};
        static childcontexttypes() {};
        static defaultprops() {};
      }
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      class MyClass {}
      MyClass.prototype.PropTypes = function() {};
      MyClass.prototype.ContextTypes = function() {};
      MyClass.prototype.ChildContextTypes = function() {};
      MyClass.prototype.DefaultProps = function() {};
    `,
    parserOptions
  }, {
    code: `
      class MyClass {}
      MyClass.PropTypes = function() {};
      MyClass.ContextTypes = function() {};
      MyClass.ChildContextTypes = function() {};
      MyClass.DefaultProps = function() {};
    `,
    parserOptions
  }, {
    code: `
      function MyRandomFunction() {}
      MyRandomFunction.PropTypes = {};
      MyRandomFunction.ContextTypes = {};
      MyRandomFunction.ChildContextTypes = {};
      MyRandomFunction.DefaultProps = {};
    `,
    parserOptions
  }, {
    // This case is currently not supported
    code: `
      class First extends Inferno.Component {}
      First["prop" + "Types"] = {};
      First["context" + "Types"] = {};
      First["childContext" + "Types"] = {};
      First["default" + "Props"] = {};
    `,
    parserOptions
  }, {
    // This case is currently not supported
    code: `
      class First extends Inferno.Component {}
      First["PROP" + "TYPES"] = {};
      First["CONTEXT" + "TYPES"] = {};
      First["CHILDCONTEXT" + "TYPES"] = {};
      First["DEFAULT" + "PROPS"] = {};
    `,
    parserOptions
  }, {
    code: `
      const propTypes = "PROPTYPES"
      const contextTypes = "CONTEXTTYPES"
      const childContextTypes = "CHILDCONTEXTTYPES"
      const defautProps = "DEFAULTPROPS"

      class First extends Inferno.Component {}
      First[propTypes] = {};
      First[contextTypes] = {};
      First[childContextTypes] = {};
      First[defautProps] = {};
    `,
    parserOptions
  }, {
    code: `
      class Hello extends Inferno.Component {
        static getDerivedStateFromProps() { }
        componentWillMount() { }
        componentDidMount() { }
        componentWillReceiveProps() { }
        shouldComponentUpdate() { }
        componentWillUpdate() { }
        componentDidUpdate() { }
        componentWillUnmount() { }
        render() {
          return <div>Hello {this.props.name}</div>;
        }
      }
    `,
    parserOptions
  }, {
    code: `
      class Hello extends Inferno.Component {
        "componentDidMount"() { }
        "my-method"() { }
      }
    `,
    parserOptions
  }, {
    code: `
      class MyClass {
        componentWillMount() { }
        componentDidMount() { }
        componentWillReceiveProps() { }
        shouldComponentUpdate() { }
        componentWillUpdate() { }
        componentDidUpdate() { }
        componentWillUnmount() { }
        render() { }
      }
    `,
    parserOptions
  }, {
    code: `
      class MyClass {
        componentwillmount() { }
        componentdidmount() { }
        componentwillreceiveprops() { }
        shouldcomponentupdate() { }
        componentwillupdate() { }
        componentdidupdate() { }
        componentwillUnmount() { }
        render() { }
      }
    `,
    parserOptions
  }, {
    code: `
      class MyClass {
        Componentwillmount() { }
        Componentdidmount() { }
        Componentwillreceiveprops() { }
        Shouldcomponentupdate() { }
        Componentwillupdate() { }
        Componentdidupdate() { }
        ComponentwillUnmount() { }
        Render() { }
      }
    `,
    parserOptions
  }, {
    // https://github.com/yannickcr/eslint-plugin-inferno/issues/1353
    code: `
      function test(b) {
        return a.bind(b);
      }
      function a() {}
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import PropTypes from "prop-types";
      class Component extends Inferno.Component {};
      Component.propTypes = {
        a: PropTypes.number.isRequired
      }
   `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import PropTypes from "prop-types";
      class Component extends Inferno.Component {};
      Component.propTypes = {
        e: PropTypes.shape({
          ea: PropTypes.string,
        })
      }
   `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import PropTypes from "prop-types";
      class Component extends Inferno.Component {};
      Component.propTypes = {
        a: PropTypes.string,
        b: PropTypes.string.isRequired,
        c: PropTypes.shape({
          d: PropTypes.string,
          e: PropTypes.number.isRequired,
        }).isRequired
      }
   `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import PropTypes from "prop-types";
      class Component extends Inferno.Component {};
      Component.propTypes = {
        a: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
      }
   `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import PropTypes from "prop-types";
      class Component extends Inferno.Component {};
      Component.propTypes = {
        a: PropTypes.oneOf([
          'hello',
          'hi'
        ])
      }
   `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import PropTypes from "prop-types";
      class Component extends Inferno.Component {};
      Component.childContextTypes = {
        a: PropTypes.string,
        b: PropTypes.string.isRequired,
        c: PropTypes.shape({
          d: PropTypes.string,
          e: PropTypes.number.isRequired,
        }).isRequired
      }
   `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import PropTypes from "prop-types";
      class Component extends Inferno.Component {};
      Component.childContextTypes = {
        a: PropTypes.string,
        b: PropTypes.string.isRequired,
        c: PropTypes.shape({
          d: PropTypes.string,
          e: PropTypes.number.isRequired,
        }).isRequired
      }
   `,
    parserOptions
  }, {
    code: `
      import PropTypes from "prop-types";
      class Component extends Inferno.Component {};
      Component.contextTypes = {
        a: PropTypes.string,
        b: PropTypes.string.isRequired,
        c: PropTypes.shape({
          d: PropTypes.string,
          e: PropTypes.number.isRequired,
        }).isRequired
      }
   `,
    parserOptions
  }, {
    code: `
      import PropTypes from 'prop-types'
      import * as MyPropTypes from 'lib/my-prop-types'
      class Component extends Inferno.Component {};
      Component.propTypes = {
        a: PropTypes.string,
        b: MyPropTypes.MYSTRING,
        c: MyPropTypes.MYSTRING.isRequired,
      }
   `,
    parserOptions
  }, {
    code: `
      import PropTypes from "prop-types"
      import * as MyPropTypes from 'lib/my-prop-types'
      class Component extends Inferno.Component {};
      Component.propTypes = {
        b: PropTypes.string,
        a: MyPropTypes.MYSTRING,
      }
   `,
    parserOptions
  }, {
    code: `
      import CustomInferno from "inferno"
      class Component extends Inferno.Component {};
      Component.propTypes = {
        b: CustomInferno.PropTypes.string,
      }
   `,
    parserOptions
  }, {
    code: `
      import PropTypes from "prop-types";
      class Component extends Inferno.Component {};
      Component.contextTypes = {
        a: PropTypes.string,
        b: PropTypes.string.isRequired,
        c: PropTypes.shape({
          d: PropTypes.string,
          e: PropTypes.number.isRequired,
        }).isRequired
      }
   `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import PropTypes from 'prop-types'
      import * as MyPropTypes from 'lib/my-prop-types'
      class Component extends Inferno.Component {};
      Component.propTypes = {
        a: PropTypes.string,
        b: MyPropTypes.MYSTRING,
        c: MyPropTypes.MYSTRING.isRequired,
      }
   `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import PropTypes from "prop-types"
      import * as MyPropTypes from 'lib/my-prop-types'
      class Component extends Inferno.Component {};
      Component.propTypes = {
        b: PropTypes.string,
        a: MyPropTypes.MYSTRING,
      }
   `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import CustomInferno from "inferno"
      class Component extends Inferno.Component {};
      Component.propTypes = {
        b: CustomInferno.PropTypes.string,
      }
   `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    // ensure that an absent arg to PropTypes.shape does not crash
    code: `class Component extends Inferno.Component {};
     Component.propTypes = {
       a: PropTypes.shape(),
     };
     Component.contextTypes = {
       a: PropTypes.shape(),
     };
    `,
    parserOptions
  }, {
    // ensure that an absent arg to PropTypes.shape does not crash
    code: `class Component extends Inferno.Component {};
     Component.propTypes = {
       a: PropTypes.shape(),
     };
     Component.contextTypes = {
       a: PropTypes.shape(),
     };
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      const fn = (err, res) => {
        const { body: data = {} } = { ...res };
        data.time = data.time || {};
      };
    `,
    parser: parsers.BABEL_ESLINT
  }, {
    code: `class Component extends Inferno.Component {};
     Component.propTypes = {
       b: string.isRequired,
       c: PropTypes.shape({
         d: number.isRequired,
       }).isRequired
     }
   `,
    parserOptions
  }, {
    code: `class Component extends Inferno.Component {};
     Component.propTypes = {
       b: string.isRequired,
       c: PropTypes.shape({
         d: number.isRequired,
       }).isRequired
     }
   `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import Inferno from 'inferno';
      import PropTypes from 'prop-types';
      const Component = Inferno.createClass({
        propTypes: {
          a: PropTypes.string.isRequired,
          b: PropTypes.shape({
            c: PropTypes.number
          }).isRequired
        }
      });
    `,
    parserOptions
  }, {
    code: `
      import Inferno from 'inferno';
      import PropTypes from 'prop-types';
      const Component = Inferno.createClass({
        propTypes: {
          a: PropTypes.string.isRequired,
          b: PropTypes.shape({
            c: PropTypes.number
          }).isRequired
        }
      });
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import Inferno from 'inferno';
      import PropTypes from 'prop-types';
      const Component = Inferno.createClass({
        childContextTypes: {
          a: PropTypes.bool,
          b: PropTypes.array,
          c: PropTypes.func,
          d: PropTypes.object,
        }
      });
    `,
    parserOptions
  }, {
    code: `
      import Inferno from 'inferno';
      import PropTypes from 'prop-types';
      const Component = Inferno.createClass({
        childContextTypes: {
          a: PropTypes.bool,
          b: PropTypes.array,
          c: PropTypes.func,
          d: PropTypes.object,
        }
      });
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import Inferno from 'inferno';
      const Component = Inferno.createClass({
        propTypes: {},
        childContextTypes: {},
        contextTypes: {},
        componentWillMount() { },
        componentDidMount() { },
        componentWillReceiveProps() { },
        shouldComponentUpdate() { },
        componentWillUpdate() { },
        componentDidUpdate() { },
        componentWillUnmount() { },
        render() {
          return <div>Hello {this.props.name}</div>;
        }
      });
    `,
    parserOptions
  }, {
    code: `
      import Inferno from 'inferno';
      const Component = Inferno.createClass({
        propTypes: {},
        childContextTypes: {},
        contextTypes: {},
        componentWillMount() { },
        componentDidMount() { },
        componentWillReceiveProps() { },
        shouldComponentUpdate() { },
        componentWillUpdate() { },
        componentDidUpdate() { },
        componentWillUnmount() { },
        render() {
          return <div>Hello {this.props.name}</div>;
        }
      });
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions
  }, {
    code: `
      import { string, element } from "prop-types";

      class Sample extends Inferno.Component {
         render() { return null; }
      }

      Sample.propTypes = {
        title: string.isRequired,
        body: element.isRequired
      };
    `,
    parserOptions
  }],

  invalid: [{
    code: `
      class Component extends Inferno.Component {
        static DefaultProps = {};
      }
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions,
    errors: [{message: ERROR_MESSAGE, type: 'Identifier'}]
  }, {
    code: `
      class Component extends Inferno.Component {}
      Component.DefaultProps = {}
    `,
    parserOptions,
    errors: [{message: ERROR_MESSAGE, type: 'Identifier'}]
  }, {
    code: `
      function MyComponent() { return (<div>{this.props.myProp}</div>) }
      MyComponent.DefaultProps = {}
    `,
    parserOptions,
    errors: [{message: ERROR_MESSAGE, type: 'Identifier'}]
  }, {
    code: `
      class Component extends Inferno.Component {
        static defaultprops = {};
      }
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Component extends Inferno.Component {}
      Component.defaultprops = {}
    `,
    parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      function MyComponent() { return (<div>{this.props.myProp}</div>) }
      MyComponent.defaultprops = {}
    `,
    parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      Component.defaultprops = {}
      class Component extends Inferno.Component {}
    `,
    parserOptions,
    errors: [{message: ERROR_MESSAGE}]
  }, {
    code: `
      class Hello extends Inferno.Component {
        static GetDerivedStateFromProps()  { }
        ComponentWillMount() { }
        ComponentDidMount() { }
        ComponentWillReceiveProps() { }
        ShouldComponentUpdate() { }
        ComponentWillUpdate() { }
        GetSnapshotBeforeUpdate() { }
        ComponentDidUpdate() { }
        ComponentWillUnmount() { }
        render() {
          return <div>Hello {this.props.name}</div>;
        }
      }
    `,
    parserOptions,
    errors: [{
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('GetDerivedStateFromProps', 'getDerivedStateFromProps'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentWillMount', 'componentWillMount'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentDidMount', 'componentDidMount'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentWillReceiveProps', 'componentWillReceiveProps'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ShouldComponentUpdate', 'shouldComponentUpdate'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentWillUpdate', 'componentWillUpdate'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('GetSnapshotBeforeUpdate', 'getSnapshotBeforeUpdate'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentDidUpdate', 'componentDidUpdate'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentWillUnmount', 'componentWillUnmount'),
      type: 'MethodDefinition'
    }]
  }, {
    code: `
      class Hello extends Inferno.Component {
        static Getderivedstatefromprops() { }
        Componentwillmount() { }
        Componentdidmount() { }
        Componentwillreceiveprops() { }
        Shouldcomponentupdate() { }
        Componentwillupdate() { }
        Getsnapshotbeforeupdate() { }
        Componentdidupdate() { }
        Componentwillunmount() { }
        Render() {
          return <div>Hello {this.props.name}</div>;
        }
      }
    `,
    parserOptions,
    errors: [{
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('Getderivedstatefromprops', 'getDerivedStateFromProps'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('Componentwillmount', 'componentWillMount'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('Componentdidmount', 'componentDidMount'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('Componentwillreceiveprops', 'componentWillReceiveProps'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('Shouldcomponentupdate', 'shouldComponentUpdate'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('Componentwillupdate', 'componentWillUpdate'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('Getsnapshotbeforeupdate', 'getSnapshotBeforeUpdate'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('Componentdidupdate', 'componentDidUpdate'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('Componentwillunmount', 'componentWillUnmount'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('Render', 'render'),
      type: 'MethodDefinition'
    }]
  }, {
    code: `
      class Hello extends Inferno.Component {
        static getderivedstatefromprops() { }
        componentwillmount() { }
        componentdidmount() { }
        componentwillreceiveprops() { }
        shouldcomponentupdate() { }
        componentwillupdate() { }
        getsnapshotbeforeupdate() { }
        componentdidupdate() { }
        componentwillunmount() { }
        render() {
          return <div>Hello {this.props.name}</div>;
        }
      }
    `,
    parserOptions,
    errors: [{
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('getderivedstatefromprops', 'getDerivedStateFromProps'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('componentwillmount', 'componentWillMount'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('componentdidmount', 'componentDidMount'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('componentwillreceiveprops', 'componentWillReceiveProps'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('shouldcomponentupdate', 'shouldComponentUpdate'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('componentwillupdate', 'componentWillUpdate'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('getsnapshotbeforeupdate', 'getSnapshotBeforeUpdate'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('componentdidupdate', 'componentDidUpdate'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('componentwillunmount', 'componentWillUnmount'),
      type: 'MethodDefinition'
    }]
  }, {
    code: `
      import {createClass} from 'inferno-create-class';
      const Component = createClass({
        proptypes: {},
        childcontexttypes: {},
        contexttypes: {},
        ComponentWillMount() { },
        ComponentDidMount() { },
        ComponentWillReceiveProps() { },
        ShouldComponentUpdate() { },
        ComponentWillUpdate() { },
        ComponentDidUpdate() { },
        ComponentWillUnmount() { },
        render() {
          return <div>Hello {this.props.name}</div>;
        }
      });
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions,
    errors: [{
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentWillMount', 'componentWillMount'),
      type: 'Property'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentDidMount', 'componentDidMount'),
      type: 'Property'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentWillReceiveProps', 'componentWillReceiveProps'),
      type: 'Property'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ShouldComponentUpdate', 'shouldComponentUpdate'),
      type: 'Property'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentWillUpdate', 'componentWillUpdate'),
      type: 'Property'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentDidUpdate', 'componentDidUpdate'),
      type: 'Property'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentWillUnmount', 'componentWillUnmount'),
      type: 'Property'
    }]
  }, {
    code: `
      class Hello extends Inferno.Component {
        getDerivedStateFromProps() { }
      }
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions,
    errors: [{
      message: ERROR_MESSAGE_STATIC('getDerivedStateFromProps'),
      type: 'MethodDefinition'
    }]
  }, {
    code: `
      class Hello extends Inferno.Component {
        GetDerivedStateFromProps() { }
      }
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions,
    errors: [{
      message: ERROR_MESSAGE_STATIC('GetDerivedStateFromProps'),
      type: 'MethodDefinition'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('GetDerivedStateFromProps', 'getDerivedStateFromProps'),
      type: 'MethodDefinition'
    }]
  }, {
    code: `
    import Inferno from 'inferno';
      const Component = Inferno.createClass({
        proptypes: {},
        childcontexttypes: {},
        contexttypes: {},
        ComponentWillMount() { },
        ComponentDidMount() { },
        ComponentWillReceiveProps() { },
        ShouldComponentUpdate() { },
        ComponentWillUpdate() { },
        ComponentDidUpdate() { },
        ComponentWillUnmount() { },
        render() {
          return <div>Hello {this.props.name}</div>;
        }
      });
    `,
    parser: parsers.BABEL_ESLINT,
    parserOptions,
    errors: [{
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentWillMount', 'componentWillMount'),
      type: 'Property'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentDidMount', 'componentDidMount'),
      type: 'Property'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentWillReceiveProps', 'componentWillReceiveProps'),
      type: 'Property'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ShouldComponentUpdate', 'shouldComponentUpdate'),
      type: 'Property'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentWillUpdate', 'componentWillUpdate'),
      type: 'Property'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentDidUpdate', 'componentDidUpdate'),
      type: 'Property'
    }, {
      message: ERROR_MESSAGE_LIFECYCLE_METHOD('ComponentWillUnmount', 'componentWillUnmount'),
      type: 'Property'
    }]
    /*
    // PropTypes declared on a component that is detected through JSDoc comments and is
    // declared AFTER the PropTypes assignment
    // Commented out since it only works with ESLint 5.
      ,{
        code: `
          MyComponent.PROPTYPES = {}
          \/** @extends Inferno.Component *\/
          class MyComponent extends BaseComponent {}
        `,
        parserOptions: parserOptions
      },
    */
  }]
});
