Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c start /b runDirectSwiftBill.bat > output.log", 0, False
Set WshShell = Nothing
