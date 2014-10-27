;(function (util, path, yeoman, yosay)
{
  'use strict';

  var JekyllUtilsGenerator = yeoman.generators.Base.extend({

    initializing: function ()
    {
      this.pkg = require('../package.json');
    }

  , prompting: function ()
    {
      var done = this.async();

      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the exquisite JekyllUtils generator!'
      ));

      var prompts = [{
        type: 'confirm'
      , name: 'someOption'
      , message: 'Would you like to enable this option?'
      , default: true
      }];

      this.prompt(prompts, function (props)
      {
        this.someOption = props.someOption;

        done();
      }.bind(this));
    }

  , writing: {
      app: function ()
      {
        this.dest.mkdir('app');
        this.dest.mkdir('app/templates');

        this.src.copy('_package.json', 'package.json');
        this.src.copy('_bower.json', 'bower.json');
      }

    , projectfiles: function ()
      {
        this.src.copy('editorconfig', '.editorconfig');
        this.src.copy('jshintrc', '.jshintrc');
      }
    }

  , end: function ()
    {
      this.installDependencies();
    }
  });

  module.exports = JekyllUtilsGenerator;

}(require('util'), require('path'), require('yeoman-generator'), require('yosay')));
