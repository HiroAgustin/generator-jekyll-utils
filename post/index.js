;(function (yosay, yeoman)
{
  'use strict';

  module.exports = yeoman.generators.Base.extend({

    initializing: function ()
    {
      this.name = Array.prototype.join.call(arguments, ' ');
    }

  , prompting: function ()
    {
      var done = this.async()
        , name = this.name;

      // Have Yeoman greet the user.
      this.log(yosay('Writing a post?\nI can help with that!'));

      this.prompt(
        [
          {
            type: 'input'
          , name: 'name'
          , message: 'What would be the title?'
          , when: function ()
            {
              return !name;
            }
          }
        , {
            type: 'input'
          , name: 'layout'
          , message: 'What would be the layout?'
          }
        ]

      , function (props)
        {
          var isoDate = new Date().toISOString().split('T');

          this.date = isoDate[0];
          this.time = isoDate[1].split('.')[0];

          this.name = name || props.name;
          this.layout = props.layout;
          this.extention = 'md';

          done();

        }.bind(this)
      );
    }

  , writing: function ()
    {
      this.template('post.md', this.date + '-' + this._.slugify(this.name) + '.' + this.extention);
    }
  });

}(require('yosay'), require('yeoman-generator')));
