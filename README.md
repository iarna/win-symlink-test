This is a little repo to test various type of link support on different windows configurations. I encourage you to give it a try on your system and if you get unique results, report them in an issue (or a PR that adds them to this readme). I'm particularly interested if there are versions or configurations that offer greater support for ordinary users.

Relatedly, if you know of any other ways of creating links I'd be interested in adding those.

----

([@iarna](https://github.com/iarna)) Windows 10 Pro, as an ordinary user

```
not ok - symlinkSync(srcFILE, destFILE): EPERM: operation not permitted, symlink 'test.js' -> 'C:\Users\Rebecca\Documents\GitHub\symlink-test\foo.js'
not ok - symlinkSync(srcDIR, destDIR): EPERM: operation not permitted, symlink 'testdir' -> 'C:\Users\Rebecca\Documents\GitHub\symlink-test\foodir'
--------------
You do not have sufficient privilege to perform this operation.
not ok - mklink destFILE srcFILE: Command failed: mklink foo.js test.js: You do not have sufficient privilege to perform this operation.
--------------
You do not have sufficient privilege to perform this operation.
not ok - mklink /D destDIR srcDIR: Command failed: mklink /D foodir testdir: You do not have sufficient privilege to perform this operation.
--------------
You do not have sufficient privilege to perform this operation.
not ok - mklink /H destFILE srcFILE: Command failed: mklink foo.js test.js: You do not have sufficient privilege to perform this operation.
--------------
Access is denied.
not ok - mklink /D /H destDIR srcDIR: Command failed: mklink /D /H foodir testdir: Access is denied.
--------------
You do not have sufficient privilege to perform this operation.
not ok - mklink /H destDIR srcDIR: Command failed: mklink /D foodir testdir: You do not have sufficient privilege to perform this operation.
--------------
ok - mklink /J destDIR srcDIR: Junction created for foodir <<===>> testdir
```

----

([@iarna](https://github.com/iarna)) Windows 10 Pro, as Administrator

```
ok - symlinkSync(srcFILE, destFILE)
ok - symlinkSync(srcDIR, destDIR)
--------------
ok - mklink destFILE srcFILE: symbolic link created for foo.js <<===>> test.js
--------------
ok - mklink /D destDIR srcDIR: symbolic link created for foodir <<===>> testdir
--------------
ok - mklink /H destFILE srcFILE: symbolic link created for foo.js <<===>> test.js
--------------
Access is denied.
not ok - mklink /D /H destDIR srcDIR: Command failed: mklink /D /H foodir testdir: Access is denied.
--------------
ok - mklink /H destDIR srcDIR: symbolic link created for foodir <<===>> testdir
--------------
ok - mklink /J destDIR srcDIR: Junction created for foodir <<===>> testdir
```
