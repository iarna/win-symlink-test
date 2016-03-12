This is a little repo to test various type of link support on different windows configurations. I encourage you to give it a try on your system and if you get unique results, report them in an issue (or a PR that adds them to this readme). I'm particularly interested if there are versions or configurations that offer greater support for ordinary users.

Relatedly, if you know of any other ways of creating links I'd be interested in adding those.

(Surprisingly, *git bash*'s `ln -s` command seems to just *copy* the files and directories.)

----

([@iarna](https://github.com/iarna)) Windows 10 Pro, as an ordinary user

```
symlinkSync(srcFILE, destFILE)
EPERM: operation not permitted, symlink 'test.js' -> 'C:\Users\Rebecca\Documents\GitHub\win-symlink-test\foo.js'
not ok
--------------
symlinkSync(srcDIR, destDIR)
EPERM: operation not permitted, symlink 'testdir' -> 'C:\Users\Rebecca\Documents\GitHub\win-symlink-test\foodir'
not ok
--------------
mklink destFILE srcFILE
You do not have sufficient privilege to perform this operation.
Command failed: mklink foo.js test.js
You do not have sufficient privilege to perform this operation.
not ok
--------------
mklink /D destDIR srcDIR
You do not have sufficient privilege to perform this operation.
Command failed: mklink /D foodir testdir
You do not have sufficient privilege to perform this operation.
not ok
--------------
mklink /H destFILE srcFILE
You do not have sufficient privilege to perform this operation.
Command failed: mklink foo.js test.js
You do not have sufficient privilege to perform this operation.
not ok
--------------
mklink /H destDIR srcDIR
You do not have sufficient privilege to perform this operation.
Command failed: mklink /D foodir testdir
You do not have sufficient privilege to perform this operation.
not ok
--------------
mklink /J destDIR srcDIR
Junction created for foodir <<===>> testdir
ok
```

---

Incidentally, this is what the last bit does on a non-NTFS folder (say, a
network drive or vm shared folder):

```
mklink /J destDIR srcDIR
Local NTFS volumes are required to complete the operation.
Command failed: mklink /J foodir testdir
Local NTFS volumes are required to complete the operation.
not ok
```

----

([@iarna](https://github.com/iarna)) Windows 10 Pro, as Administrator

```
symlinkSync(srcFILE, destFILE)
ok
--------------
symlinkSync(srcDIR, destDIR)
ok
--------------
mklink destFILE srcFILE
symbolic link created for foo.js <<===>> test.js
ok
--------------
mklink /D destDIR srcDIR
symbolic link created for foodir <<===>> testdir
ok
--------------
mklink /H destFILE srcFILE
symbolic link created for foo.js <<===>> test.js
ok
--------------
mklink /H destDIR srcDIR
symbolic link created for foodir <<===>> testdir
ok
--------------
mklink /J destDIR srcDIR
Junction created for foodir <<===>> testdir
ok
```

----

And the Admin on a vbox shared folder:

```
symlinkSync(srcFILE, destFILE)
EISDIR: illegal operation on a directory, symlink 'test.js' -> 'F:\foo.js'
not ok
--------------
symlinkSync(srcDIR, destDIR)
EISDIR: illegal operation on a directory, symlink 'testdir' -> 'F:\foodir'
not ok
--------------
mklink destFILE srcFILE
The device does not support symbolic links.
Command failed: mklink foo.js test.js
The device does not support symbolic links.
not ok
--------------
mklink /D destDIR srcDIR
The device does not support symbolic links.
Command failed: mklink /D foodir testdir
The device does not support symbolic links.
not ok
--------------
mklink /H destFILE srcFILE
The device does not support symbolic links.
Command failed: mklink foo.js test.js
The device does not support symbolic links.
not ok
--------------
mklink /H destDIR srcDIR
The device does not support symbolic links.
Command failed: mklink /D foodir testdir
The device does not support symbolic links.
not ok
--------------
mklink /J destDIR srcDIR
Local NTFS volumes are required to complete the operation.
Command failed: mklink /J foodir testdir
Local NTFS volumes are required to complete the operation.
not ok
```
