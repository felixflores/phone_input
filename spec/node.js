
require.paths.unshift('spec', '/Users/felixflores/.rvm/gems/ruby-1.9.2-p0@phone_input/gems/jspec-4.3.3/lib', 'lib')
require('jspec')
require('unit/spec.helper')
require('yourlib')

JSpec
  .exec('spec/unit/spec.js')
  .run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures', failuresOnly: true })
  .report()
