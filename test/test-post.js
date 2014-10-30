;(function (path, yeomanGenerator, os)
{
  'use strict';

  var assert = yeomanGenerator.assert
    , helpers = yeomanGenerator.test;

  describe('jekyll-utils:post', function ()
  {
    before(function (done)
    {
      helpers.run(path.join(__dirname, '../post'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withArguments('name', '--force')
        .on('end', done);
    });

    it('creates files', function ()
    {
      assert.file([
        'somefile.js'
      ]);
    });
  });

}(require('path'), require('yeoman-generator'), require('os')));
