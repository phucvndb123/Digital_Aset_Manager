# Digital Asset Manager

## Nhóm 3

| Thành viên | GitHub | Vai trò |
|---|---|---|
| Đặng Xuân Phúc | PhucDX4 | Nhóm trưởng |
| Trần Minh Tiến | TienTM42 | Thành viên |

---

## Phân công màn hình & chức năng

### PhucDX4 — Đặng Xuân Phúc

**1. File Browser** (`WebContent/cm/dam/main/file_browser.xml`)


**2. Version Control** (`WebContent/cm/dam/main/versionControl.xml`)


### TienTM42 — Trần Minh Tiến

**3. Main Shell** (`WebContent/cm/dam/main/main.xml`)
- Layout tổng thể: header, sidebar, content area
- Sidebar navigation với 4 nav items
- Tab switching (`_setActive`, `_switchTab`)
- Hamburger menu toggle (collapse/expand sidebar)

**4. Dashboard** (`WebContent/cm/dam/main/dashboard.xml`)
- Stat cards: tổng số file, tổng dung lượng, uploads hôm nay
- Pie chart phân bố loại file (FusionCharts)
- Line chart xu hướng storage theo tháng (FusionCharts)
- Recent uploads list (6 uploads gần nhất)
- Tích hợp 4 API: `/api/dashboard/getStats`, `/api/dashboard/getDistribution`, `/api/dashboard/getStorageTrend`, `/api/dashboard/getRecentUploads`
- Backend: `DashboardController`, `DashboardServiceImpl`, `DashboardMapper`, `dashboardmapper.xml`

**5. Asset Details** (`WebContent/cm/dam/main/assetDetails.xml`)
- Folder tree navigation (treeview đệ quy)
- Asset grid với sort theo cột (Name, Type, Size, Status)
- Asset detail panel: preview, file name, asset type, status, metadata
- Edit metadata (toggle edit/save, PUT API)
- Download file info
- Badge màu theo loại file (PDF, JPG, PNG, MP4...)
- Tích hợp API: `GET /api/dam/folders`, `GET /api/dam/assets`, `PUT /api/dam/assets/{id}`
- Backend: `DamController`, `DamServiceImpl`, `DamMapper`, `authority_mapper.xml`
