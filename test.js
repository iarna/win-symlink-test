var fs = require('fs')
var execSync = require('child_process').execSync

runJs('symlinkSync(srcFILE, destFILE)', function () { fs.symlinkSync('test.js', 'foo.js') }, cleanup('del foo.js'))
runJs('symlinkSync(srcDIR, destDIR)', function () { fs.symlinkSync('testdir', 'foodir') }, cleanup('del foodir'))
runCmd('mklink destFILE srcFILE', 'mklink foo.js test.js', cleanup('del foo.js'))
runCmd('mklink /D destDIR srcDIR', 'mklink /D foodir testdir', cleanup('rmdir foodir'))
runCmd('mklink /H destFILE srcFILE', 'mklink foo.js test.js', cleanup('del foo.js'))
runCmd('mklink /H destDIR srcDIR', 'mklink /D foodir testdir', cleanup('rmdir foodir'))
runCmd('mklink /J destDIR srcDIR', 'mklink /J foodir testdir', cleanup('rmdir foodir'))

function runJs(msg, todo, cleanup) {
  console.log('--------------')
  try {
    console.log(msg)
    todo()
    console.log('ok')
    cleanup()
  } catch (ex) {
    console.log(ex.message.trim())
    console.log('not ok')
  }
}

function runCmd (msg, cmd, cleanup) {
  console.log('--------------')
  try {
    console.log(msg)
    console.log(execSync(cmd).toString().trim())
    console.log('ok')
    cleanup()
  } catch (ex) {
    console.log(ex.message.trim())
    console.log('not ok')
  }
}

function cleanup (cmd) {
  return function () {
    execSync(cmd)
  }
}
