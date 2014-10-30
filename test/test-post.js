;(function (yeoman, os, fs, path)
{
  'use strict';

  var assert = yeoman.assert
    , helpers = yeoman.test;

  function run ()
  {
    return helpers.run(path.join(__dirname, '../post'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({
        'skip-greeting': true
      });
  }

  function readFile (route)
  {
    return fs.readFileSync(route, {
      encoding: 'utf-8'
    }).trim().split('\n');
  }

  describe('jekyll-utils:post', function ()
  {
    var date = new Date()
      , prefix = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    describe('default usage', function ()
    {
      before(function (done)
      {
        run()
          .withPrompt({
            name: 'My Awesome Post'
          })
          .on('end', done);
      });

      it('creates the post', function ()
      {
        assert.file('./' + prefix + '-my-awesome-post.md');
      });

      it('with the selected content', function ()
      {
        var content = readFile('./' + prefix + '-my-awesome-post.md');

        assert.equal(content[0], '---');
        assert.equal(content[1], 'layout: post');
        assert.equal(content[2], 'title: My Awesome Post');
        assert.equal(content[3].indexOf('date: ' + prefix), 0);
        assert.equal(content[4], '---');
      });
    });

    describe('with title in the arguments', function ()
    {
      before(function (done)
      {
        run()
          .withArguments('My Sweet Post')
          .withPrompt({
            layout: 'default'
          , extention: 'markdown'
          })
          .on('end', done);
      });

      it('creates the post', function ()
      {
        assert.file('./' + prefix + '-my-sweet-post.markdown');
      });

      it('with the selected content', function ()
      {
        var content = readFile('./' + prefix + '-my-sweet-post.markdown');

        assert.equal(content[0], '---');
        assert.equal(content[1], 'layout: default');
        assert.equal(content[2], 'title: My Sweet Post');
        assert.equal(content[3].indexOf('date: ' + prefix), 0);
        assert.equal(content[4], '---');
      });
    });
  });

}(require('yeoman-generator'), require('os'), require('fs'), require('path')));
