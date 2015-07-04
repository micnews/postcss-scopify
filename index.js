'use strict';
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-scopify', scopify);

function scopify(scope, options) {
   
  options = options || {};

  return function(root) {

     // guard statment- allow only valid scopes
     if(!isValidScope(scope)){
        throw root.error('invalid scope', { plugin: 'postcss-scopify' });
     }
  
    root.eachRule(function (rule) {
      if (!rule.selectors){
        return rule;
      }

      rule.selectors = rule.selectors.map(function(selector) {
        if (isScopeApplied(selector,scope)) {
          return selector;
        }

          return scope + ' ' + selector;

      });
    });
  };
}

/**
 * Determine if selector is already scoped
 *
 * @param {string} selector
 * @param {string} scope
 */
function isScopeApplied(selector,scope) {
  return selector.indexOf(scope) === 0;
}

/**
 * Determine if scope is valid
 *
 * @param {string} scope
 */
function isValidScope(scope) {
    if (scope){
        return scope.indexOf(',') ===  -1;
    }
    else{
        return true;
    }

}