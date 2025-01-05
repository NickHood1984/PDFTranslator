!macro customInit
  SetRegView 64
!macroend

!macro customUnInstall
  RMDir /r "$APPDATA\PDFTranslator"
  RMDir /r "$LOCALAPPDATA\PDFTranslator"
  DeleteRegKey HKCU "Software\PDFTranslator"
!macroend 