;(function (yosay, yeoman, fs, path)
{
  'use strict';

  module.exports = yeoman.generators.Base.extend({

    initializing: function ()
    {
      this.root = this.getRootPath();

      this.destinationRoot(path.join(this.root, '_drafts'));

      this.name = Array.prototype.join.call(arguments, ' ');
    }

  , getRootPath: function ()
    {
      var cwd = process.cwd()
        , oneUp = path.join(cwd, '..')
        , onApp = path.join(cwd, 'app');

      if (fs.existsSync(path.join(cwd, '_layouts')))
        return cwd;

      if (fs.existsSync(path.join(oneUp, '_layouts')))
        return oneUp;

      if (fs.existsSync(path.join(onApp, '_layouts')))
        return onApp;
    }

  , prompting: function ()
    {
      var name = this.name
        , root = this.root
        , done = this.async();

      // Have Yeoman greet the user.
      this.log(yosay('Writing a draft? I can help with that!'));

      this.prompt(
        [
          {
            type: 'input'
          , name: 'name'
          , message: 'What is the draft title?'
          , when: function ()
            {
              return !name;
            }
          }
        , {
            type: 'list'
          , name: 'layout'
          , message: 'Which layout would you like to use?'
          , default: 'post'
          , choices: function ()
            {
              return fs.readdirSync(path.join(root, '_layouts')).map(function (name)
              {
                return name.split('.')[0];
              });
            }
          }
        , {
            type: 'list'
          , name: 'extention'
          , message: 'Which file extention?'
          , default: 'md'
          , choices: [
              'md'
            , 'mkd'
            , 'mkdn'
            , 'mkdown'
            , 'textile'
            , 'markdown'
            ]
          }
        ]

      , function (props)
        {
          var isoDate = new Date().toISOString().split('T');

          this.date = isoDate[0];
          this.time = isoDate[1].split('.')[0];

          this.extention = props.extention;
          this.name = name || props.name;
          this.layout = props.layout;

          done();

        }.bind(this)
      );
    }

  , writing: function ()
    {
      this.template('draft.md', this.date + '-' + this._.slugify(this.name) + '.' + this.extention);
    }
  });

}(require('yosay'), require('yeoman-generator'), require('fs'), require('path')));