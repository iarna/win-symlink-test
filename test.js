var fs = require('fs')
var execSync = require('child_process').execSync

runJs('symlinkSync(srcFILE, destFILE)', function () { fs.symlinkSync('test.js', 'foo.js') }, cleanup('del foo.js'))
runJs('symlinkSync(srcDIR, destDIR)', function () { fs.symlinkSync('testdir', 'foodir') }, cleanup('del foodir'))
runCmd('mklink destFILE srcFILE', 'mklink foo.js test.js', cleanup('del foo.js'))
runCmd('mklink /D destDIR srcDIR', 'mklink /D foodir testdir', cleanup('rmdir foodir'))
runCmd('mklink /H destFILE srcFILE', 'mklink foo.js test.js', cleanup('del foo.js'))
runCmd('mklink /D /H destDIR srcDIR', 'mklink /D /H foodir testdir', cleanup('rmdir foodir'))
runCmd('mklink /H destDIR srcDIR', 'mklink /D foodir testdir', cleanup('rmdir foodir'))
runCmd('mklink /J destDIR srcDIR', 'mklink /J foodir testdir', cleanup('rmdir foodir'))

function runJs(msg, todo, cleanup) {
  try {
    todo()
    console.log('ok -', msg)
    cleanup()
  } catch (ex) {
    console.log('not ok -', msg + ':', ex.message.trim())
  }
}

function runCmd (msg, cmd, cleanup) {
  console.log('--------------')
  try {
    console.log('ok -',msg + ':', execSync(cmd).toString().trim().replace(/\n/g, ': '))
    cleanup()
  } catch (ex) {
    console.log('not ok -',msg + ':', ex.message.trim().replace(/\n/g, ': '))
  }
}

function cleanup (cmd) {
  return function () {
    execSync(cmd)
  }
}
