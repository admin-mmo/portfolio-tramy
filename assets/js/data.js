/**
 * TOÀN BỘ NỘI DUNG PORTFOLIO NẰM Ở FILE NÀY.
 *
 * ẢNH   : bỏ file vào assets/images/ rồi ghi đường dẫn vào 'img'.
 * VIDEO : có 3 cách (cách 1 ưu tiên, nếu lỗi sẽ tự chuyển sang cách 2):
 *   1) 'file'  : file mp4/webm bỏ trong assets/videos/ (mỗi file < 100MB).
 *   2) 'embed' : link YouTube / Google Drive / TikTok để nhúng phát ngay trên trang.
 *                Nếu để trống, trang tự thử nhúng từ 'url'.
 *   'poster': (tuỳ chọn) ảnh bìa trong assets/images/ để hiện xem trước khi chưa có file/embed.
 *   3) 'url'   : link bài gốc (luôn hiển thị nút "Xem bản gốc").
 * Facebook không nhúng được qua link chia sẻ, nên sẽ hiện khung chờ + nút xem bản gốc.
 */
window.PORTFOLIO = {
	name: 'Trà My',
	facebook: 'https://www.facebook.com/tra.my.805562',
	intro: '', // Câu giới thiệu ngắn (để trống thì ẩn)

	seo: [
		{ brand: 'Nội thất Mộc Lê Gia', site: 'moclegia.vn', items: [
			{ tag: 'Gỗ óc chó · 5 phút đọc', title: '5 rủi ro khi thuê đơn vị thi công nội thất không có xưởng',
				desc: 'Nêu 5 rủi ro khi chọn đơn vị không có xưởng và cách Mộc Lê Gia xử lý bằng xưởng sản xuất tại Thạch Thất (Hà Nội), gỗ óc chó FAS nhập khẩu từ Bắc Mỹ có CO/CQ.',
				url: 'https://moclegia.vn/5-rui-ro-khi-thue-don-vi-thi-cong-noi-that-khong-co-xuong/' },
			{ tag: 'Gỗ óc chó · 10 phút đọc', title: 'Thiết kế thi công nội thất óc chó tại Hải Dương',
				desc: 'Thiết kế thi công trọn gói từ thiết kế 3D, sản xuất đến lắp đặt và nghiệm thu; nội thất gỗ óc chó đồng bộ, phù hợp từng không gian.',
				url: 'https://moclegia.vn/thiet-ke-thi-cong-noi-that-oc-cho-tai-hai-duong' },
			{ tag: 'Gỗ óc chó · 11 phút đọc', title: 'Chi phí thi công nội thất gỗ óc chó tại Nghệ An trọn gói',
				desc: 'Chi phí thi công toàn bộ khoảng từ 1,5 tỷ đến hơn 3,5 tỷ đồng, tùy diện tích không gian, lượng gỗ và loại gỗ sử dụng.',
				url: 'https://moclegia.vn/chi-phi-thi-cong-noi-that-go-oc-cho-nghe-an/' }
		] },
		{ brand: 'Nội thất Đồng Gia', site: 'donggia.vn', items: [
			{ tag: '', title: '', desc: '', url: 'https://donggia.vn/su-menh-dua-noi-that-make-in-viet-nam-vuon-ra-ngoai-the-gioi/' },
			{ tag: '', title: '', desc: '', url: 'https://donggia.vn/dg-bespoke-nguon-cam-hung-tu-nhung-chiec-xe-rolls-royce/' },
			{ tag: '', title: '', desc: '', url: 'https://donggia.vn/thiet-ke-noi-phong-khach-biet-thu-dep/' }
		] },
		{ brand: 'Okamura', site: 'okamura.com.vn', items: [
			{ tag: '', title: '', desc: '', url: 'https://www.okamura.com.vn/vi/post/thiet-ke-van-phong-chu-tich' },
			{ tag: '', title: '', desc: '', url: 'https://www.okamura.com.vn/vi/post/cach-lam-viec-online-tai-nha-hieu-qua' },
			{ tag: '', title: '', desc: '', url: 'https://www.okamura.com.vn/vi/post/set-up-goc-lam-viec-tai-nha' }
		] }
	],

	// img: ảnh trong assets/images/ (chưa có file thì hiện khung chờ)
	infographic: [
		{ img: 'https://github.com/admin-mmo/portfolio-tramy/blob/main/assets/images/infographic-1.jpg.jpg?raw=true', url: 'https://www.facebook.com/share/p/1A8Bdy7HMz/' },
		{ img: 'https://github.com/admin-mmo/portfolio-tramy/blob/main/assets/images/infographic-2.jpg.jpg?raw=true', url: 'https://www.facebook.com/share/p/1B9s3cSSj4/' },
		{ img: 'https://github.com/admin-mmo/portfolio-tramy/blob/main/assets/images/infographic-3.jpg.jpg?raw=true', url: 'https://www.facebook.com/share/p/1B3nf8YjiJ/' }
	],

	// ratio: 'h' = ngang 16:9, 'v' = dọc 9:16
	video_ai: { ratio: 'h', brands: [ { name: '', items: [
		{ title: 'Video AI 1', file: 'https://github.com/admin-mmo/portfolio-tramy/raw/refs/heads/main/assets/videos/video-ai-1.mp4.mp4', embed: '', poster: '', url: 'https://www.facebook.com/share/r/17SUKJiCKh/' },
		{ title: 'Video AI 2', file: 'https://github.com/admin-mmo/portfolio-tramy/raw/refs/heads/main/assets/videos/video-ai-2.mp4.mp4', embed: '', poster: '', url: 'https://www.facebook.com/share/r/1P9WpMSxUZ/' },
		{ title: 'Video AI 3', file: 'https://github.com/admin-mmo/portfolio-tramy/raw/refs/heads/main/assets/videos/video-ai-3.mp4.mp4', embed: '', poster: '', url: 'https://www.facebook.com/share/r/1FbfA1f86V/' }
	] } ] },

	content: {
		title: 'Serum White Smile',
		desc: '', // Tóm tắt đúng theo Google Sheet
		url: 'https://docs.google.com/spreadsheets/d/1QCfVLu5n5ZFbbhT3fXOTQ3XlApqRA0kTEvmhJzutqxA/edit?usp=sharing'
	},

	video_edit: { ratio: 'v', brands: [
		{ name: 'Lịm Donut', items: [
			{ title: 'Video 1', file: 'assets/videos/limdonut-1.mp4', embed: '', poster: '', url: 'https://www.tiktok.com/@limdonuts/video/7559226716896447751' },
			{ title: 'Video 2', file: 'assets/videos/limdonut-2.mp4', embed: '', poster: '', url: 'https://www.tiktok.com/@limdonuts/video/7539172305751084306' },
			{ title: 'Video 3', file: 'assets/videos/limdonut-3.mp4', embed: '', poster: '', url: 'https://www.tiktok.com/@limdonuts/video/7468307197416688914' }
		] },
		{ name: 'Chạm cảm xúc', items: [
			{ title: 'Video 1', file: 'assets/videos/cham-1.mp4', embed: '', poster: '', url: 'https://www.tiktok.com/@chamvndayne/video/7591851258445712648' },
			{ title: 'Video 2', file: 'assets/videos/cham-2.mp4', embed: '', poster: '', url: 'https://www.tiktok.com/@official.chamvn/video/7594432958547692821' },
			{ title: 'Video 3', file: 'assets/videos/cham-3.mp4', embed: '', poster: '', url: 'https://www.tiktok.com/@official.chamvn/video/7592515682252672276' }
		] }
	] },

	video_review: { ratio: 'v', brands: [ { name: '', items: [
		{ title: 'Top 3 cushion dành cho sinh viên giá rẻ mà chất lượng', file: 'assets/videos/review-1.mp4', embed: '', poster: '', url: 'https://drive.google.com/file/d/1O_IXu0tgAB8gQv_01q6CbSPVaarNfr9Y/view?usp=drive_link' },
		{ title: 'Tránh ngay các loại mặt nạ có những thứ dưới đây', file: 'assets/videos/review-2.mp4', embed: '', poster: '', url: 'https://drive.google.com/file/d/1pV7ZdEYgDHcNhFv1BB1E9-5W8XNcdff_/view?usp=drive_link' },
		{ title: 'Đừng mong da hết mụn nếu bạn bỏ qua 5 loại nước tẩy trang', file: 'assets/videos/review-3.mp4', embed: '', poster: '', url: 'https://drive.google.com/file/d/1uQwu7GIc9k_QnqtIb27B8-_MBCJl6Heu/view?usp=drive_link' }
	] } ] }
};
