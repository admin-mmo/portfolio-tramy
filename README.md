# Trà My · Portfolio (bản chạy trên GitHub Pages)

Trang tĩnh (HTML/CSS/JS), không cần PHP hay WordPress.

## Đưa lên GitHub Pages
1. Tạo repo mới trên GitHub (ví dụ `tramy-portfolio`).
2. Giải nén zip, tải **toàn bộ file bên trong** lên repo (để `index.html` nằm ở thư mục gốc).
3. Vào **Settings > Pages > Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, thư mục `/ (root)`, bấm Save.
4. Chờ 1–2 phút, trang chạy tại `https://<tên-github>.github.io/<tên-repo>/`.

## Thêm ảnh
Bỏ ảnh vào `assets/images/` với đúng tên trong `assets/js/data.js`
(`infographic-1.jpg`, `infographic-2.jpg`, `infographic-3.jpg`) hoặc đổi tên trong `data.js`.

## Xem trước video
- Video có `file`: hiện sẵn khung hình đầu kèm nhãn "Xem trước". Rê chuột vào để chạy xem trước (tắt tiếng), bấm vào để xem đầy đủ có tiếng. Trên điện thoại, bấm là phát.
- Video nhúng (TikTok / Drive / YouTube): hiện trình phát có ảnh xem trước của nền tảng.
- Video chưa có file hay link nhúng được (ví dụ Facebook): thêm `poster` (ảnh bìa trong `assets/images/`), bấm vào ảnh sẽ mở bài gốc.

## Màu sắc
Tone Frosted Aura: `#5C7E8F` · `#A2A2A2` · `#D4DDE2` · `#FFFFFF`. Đổi màu ở khối `:root` đầu file `assets/css/main.css`.

## Thêm video
Mở `assets/js/data.js`, mỗi video có:
- `file`: video mp4 trong `assets/videos/` (mỗi file dưới 100MB, nên nén bớt).
- `embed`: link YouTube / Google Drive / TikTok để nhúng (để trống thì tự thử nhúng từ `url`).
- `url`: link bài gốc.

Nếu file `file` chưa có, trang tự chuyển sang video nhúng, hoặc khung chờ nếu không nhúng được.

Lưu ý:
- Drive: chia sẻ ở chế độ "Bất kỳ ai có đường liên kết" thì mới xem được.
- Link Facebook `share/...` không nhúng được; muốn hiện video, hãy dùng `file` hoặc `embed`.
- GitHub phân biệt chữ hoa/thường: `Video-1.MP4` khác `video-1.mp4`.
