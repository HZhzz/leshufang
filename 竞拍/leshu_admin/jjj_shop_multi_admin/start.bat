
@echo off
:: nodejs��װĿ¼�µ�nodevars.bat
set nodevars = "D:\Program Files\nodejs\nodevars.bat"
:: �л���D��
d:
:: �ƶ�����Ҫ������Ŀ¼
cd xampp/product/jjj_shop_multi_small/jjj_shop_multi_small_admin
:: ������Ŀ
cmd /c %nodevars%&&npm run dev