# Training Common JS Guide

Tai lieu nay huong dan cach su dung 3 file common trong `Training`:

- `WebContent/cm/js/commonGlobal.js`
- `WebContent/cm/js/commonScope.js`
- `WebContent/cm/js/main.js`

## 1) Tong quan vai tro

- `commonGlobal.js`:
  - Chua `gcm` (global framework layer).
  - Dung cho logic toan he thong: popup, history, lifecycle, helper dung chung.
  - Khong gan truc tiep vao nghiep vu cua tung man hinh.

- `commonScope.js`:
  - Chua `com` (scope utility layer).
  - Dung cho code nghiep vu man hinh: submit, data, util, format, validate...
  - Day la noi dev man hinh se goi thuong xuyen nhat.

- `main.js`:
  - Chua `scwin` cho main shell/page.
  - Dung cho init UI tong, header/menu/layout behavior.
  - Khong nen dua utility generic vao day.

## 2) Thu tu load

Project dang nap theo thu tu trong `websquare/config.xml`:

1. `/cm/js/commonGlobal.js`
2. `/cm/js/commonScope.js`
3. `/cm/js/main.js`

Vi vay:

- `com` co the goi `gcm`
- `main.js` co the goi ca `gcm` va `com`

## 3) Quy tac dat ham

- Dat vao `gcm` khi:
  - Ham dung chung cho toan app.
  - Khong phu thuoc man hinh cu the.
  - Vi du: open popup chung, xu ly history, event beforeunload.

- Dat vao `com` khi:
  - Ham phuc vu man hinh nghiep vu.
  - Co thao tac DataCollection, Submission, Component theo scope.
  - Vi du: `com.sbm.execute(...)`, `com.data.*`, `com.util.*`.

- Dat vao `scwin` (`main.js`) khi:
  - Ham chi dung cho main layout.
  - Vi du: init menu, toggle layout, xu ly responsive.

## 4) Mau su dung nhanh

### 4.1 Goi utility trong man hinh

```javascript
// Trong man hinh XML/JS
com.sbm.execute(sbm_search, { keyword: "test" });
```

### 4.2 Goi popup chung

```javascript
gcm.win.openPopup($p, "/ui/sample/popup.xml", { id: "pop1", width: "800", height: "600" }, { mode: "view" });
```

### 4.3 Main init

```javascript
scwin.initMainLoad = function() {
  gcm.win.addEventOnBeforeUnload();
};
```

## 5) Luu y cho template Training

`Training` dang la template chung, mot so hook WRM-specific da duoc tat bang config:

- `gcm.templateConfig.enableWrmMenuDataset`
- `gcm.templateConfig.enableWrmProgramAuthority`
- `gcm.templateConfig.enableHistoryMenuSync`
- `gcm.templateConfig.enableWrmExcelProvider`

Mac dinh dang `false` de tranh loi khi chua co du lieu/menu theo WRM.

Chi bat lai khi project cua ban da co day du datasource/menu/authority cung kieu WRM.

## 6) Nen lam / Khong nen lam

Nen:

- Giu utility generic trong `com` va `gcm`.
- Tach code nghiep vu man hinh ra khoi `main.js`.
- Dat ten ham ro nghia, tranh trung lap.

Khong nen:

- Hardcode URL/ID nghiep vu cu the vao `gcm` neu khong bat buoc.
- Dua logic theo mot man hinh cu the vao `commonGlobal.js`.
- Sua truc tiep behavior co anh huong toan app ma khong test.

## 7) Checklist truoc khi commit thay doi common

- Da test man hinh co submit?
- Da test popup/alert?
- Da test back/refresh page?
- Da test main page khoi dong?
- Da kiem tra console khong co error moi?

