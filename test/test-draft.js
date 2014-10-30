;(function (yeoman, os, fs, path)
{
  'use strict';

  var assert = yeoman.assert
    , helpers = yeoman.test;

  function run ()
  {
    return helpers.run(path.join(__dirname, '../draft'))
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

  describe('jekyll-utils:draft', function ()
  {
    var date = new Date()
      , prefix = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    describe('default usage', function ()
    {
      before(function (done)
      {
        run()
          .withPrompt({
            name: 'My Awesome Draft'
          })
          .on('end', done);
      });

      it('creates the draft', function ()
      {
        assert.file('./' + prefix + '-my-awesome-draft.md');
      });

      it('with the selected content', function ()
      {
        var content = readFile('./' + prefix + '-my-awesome-draft.md');

        assert.equal(content[0], '---');
        assert.equal(content[1], 'layout: post');
        assert.equal(content[2], 'title: My Awesome Draft');
        assert.equal(content[3].indexOf('date: ' + prefix), 0);
        assert.equal(content[4], '---');
      });
    });

    describe('with title in the arguments', function ()
    {
      before(function (done)
      {
        run()
          .withArguments('My Sweet Draft')
          .withPrompt({
            layout: 'default'
          , extention: 'markdown'
          })
          .on('end', done);
      });

      it('creates the draft', function ()
      {
        assert.file('./' + prefix + '-my-sweet-draft.markdown');
      });

      it('with the selected content', function ()
      {
        var content = readFile('./' + prefix + '-my-sweet-draft.markdown');

        assert.equal(content[0], '---');
        assert.equal(content[1], 'layout: default');
        assert.equal(content[2], 'title: My Sweet Draft');
        assert.equal(content[3].indexOf('date: ' + prefix), 0);
        assert.equal(content[4], '---');
      });
    });


    describe('with categories and tags', function ()
    {
      before(function (done)
      {
        run()
          .withArguments('My Taggy Draft')
          .withPrompt({
            categories: 'Cooking'
          , tags: 'pasta, fruit'
          })
          .on('end', done);
      });

      it('creates the post', function ()
      {
        assert.file('./' + prefix + '-my-taggy-draft.md');
      });

      it('with the selected content', function ()
      {
        var content = readFile('./' + prefix + '-my-taggy-draft.md');

        assert.equal(content[0], '---');
        assert.equal(content[1], 'layout: post');
        assert.equal(content[2], 'title: My Taggy Draft');
        assert.equal(content[3].indexOf('date: ' + prefix), 0);
        assert.equal(content[4], 'categories: ');
        assert.equal(content[5], '- Cooking');
        assert.equal(content[6], 'tags: ');
        assert.equal(content[7], '- pasta');
        assert.equal(content[8], '- fruit');
        assert.equal(content[9], '---');
      });
    });
  });

}(require('yeoman-generator'), require('os'), require('fs'), require('path')));
