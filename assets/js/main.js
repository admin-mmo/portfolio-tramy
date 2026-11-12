(function () {
	var D = window.PORTFOLIO;
	if (!D) return;
	document.documentElement.classList.add('js');

	var MEDIA = [];

	function esc(s) {
		return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
			return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
		});
	}

	/* Tự nhận link YouTube / Google Drive / TikTok để nhúng video. */
	function embedFrom(u) {
		if (!u) return '';
		var m;
		if ((m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/))) return 'https://www.youtube.com/embed/' + m[1];
		if ((m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/))) return 'https://drive.google.com/file/d/' + m[1] + '/preview';
		if ((m = u.match(/tiktok\.com\/.*\/video\/(\d+)/))) return 'https://www.tiktok.com/embed/v2/' + m[1];
		if (/^https:\/\/(www\.youtube\.com\/embed|drive\.google\.com\/file\/d\/.+\/preview|www\.tiktok\.com\/embed)/.test(u)) return u;
		return '';
	}

	function playBtn(box) {
		var b = document.createElement('i');
		b.className = 'playbtn';
		box.appendChild(b);
	}

	function placeholder(box, text, isVid) {
		box.innerHTML = '';
		if (isVid) playBtn(box);
		var s = document.createElement('span');
		s.textContent = text;
		box.appendChild(s);
	}

	/* Cửa sổ xem lớn (lightbox): dùng cho video nhúng, chạy tốt trên điện thoại. */
	function openLightbox(src, title, vertical) {
		var o = document.createElement('div');
		o.className = 'lightbox';
		o.setAttribute('role', 'dialog');
		o.setAttribute('aria-modal', 'true');
		var close = document.createElement('button');
		close.type = 'button';
		close.className = 'lb-close';
		close.setAttribute('aria-label', 'Đóng');
		close.textContent = '✕';
		var fr = document.createElement('div');
		fr.className = 'lb-frame ' + (vertical ? 'v' : 'h');
		var f = document.createElement('iframe');
		f.src = src;
		f.title = title || 'Video';
		f.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
		f.allowFullscreen = true;
		fr.appendChild(f);
		o.appendChild(close);
		o.appendChild(fr);
		function shut() {
			document.removeEventListener('keydown', onKey);
			document.documentElement.classList.remove('lb-open');
			o.remove();
		}
		function onKey(e) { if (e.key === 'Escape') shut(); }
		o.addEventListener('click', function (e) { if (e.target === o) shut(); });
		close.addEventListener('click', shut);
		document.addEventListener('keydown', onKey);
		document.documentElement.classList.add('lb-open');
		document.body.appendChild(o);
		close.focus();
	}

	function iframe(box, src, title) {
		box.innerHTML = '';
		var f = document.createElement('iframe');
		f.src = src;
		f.title = title || 'Video';
		f.loading = 'lazy';
		f.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
		f.allowFullscreen = true;
		f.referrerPolicy = 'strict-origin-when-cross-origin';
		box.appendChild(f);
		var x = document.createElement('button');
		x.type = 'button';
		x.className = 'expand';
		x.setAttribute('aria-label', 'Mở rộng video');
		x.textContent = '⤢ Mở rộng';
		x.addEventListener('click', function () { openLightbox(src, title, box.classList.contains('r916')); });
		box.appendChild(x);
	}

	function mountImage(box, m) {
		if (!m.img) return placeholder(box, m.label, false);
		var img = document.createElement('img');
		img.alt = m.label;
		img.loading = 'lazy';
		img.addEventListener('error', function () { placeholder(box, m.label, false); });
		img.src = m.img;
		box.appendChild(img);
	}

	function mountVideo(box, m) {
		var v = m.item;
		var emb = embedFrom(v.embed || v.url);
		var title = box.parentNode && box.parentNode.querySelector('h4');

		// Không có video: ảnh bìa (nếu có) hoặc khung chờ; luôn bấm được để xem bản gốc.
		var fallback = function () {
			box.className = box.className.replace(/\b(can-preview|is-active|is-previewing)\b/g, '').trim();
			if (emb) {
				iframe(box, emb, v.title);
				if (title) title.hidden = false;
			} else if (v.poster) {
				box.innerHTML = '';
				box.classList.add('has-poster');
				var img = document.createElement('img');
				img.src = v.poster; img.alt = v.title; img.loading = 'lazy';
				img.addEventListener('error', function () { placeholder(box, v.title, true); });
				box.appendChild(img);
				playBtn(box);
				var a = document.createElement('a');
				a.className = 'cover'; a.href = v.url; a.target = '_blank'; a.rel = 'noopener';
				a.setAttribute('aria-label', 'Xem ' + v.title);
				box.appendChild(a);
				if (title) title.hidden = false;
			} else {
				placeholder(box, v.title, true);
				if (title) title.hidden = true;
			}
		};

		if (!v.file) return fallback();

		// Video file: hiện sẵn khung hình đầu, rê chuột để chạy xem trước (tắt tiếng), bấm để xem đầy đủ.
		var el = document.createElement('video');
		el.muted = true;
		el.loop = true;
		el.playsInline = true;
		el.preload = 'metadata';
		el.setAttribute('playsinline', '');
		if (v.poster) el.poster = v.poster;
		el.addEventListener('error', fallback);
		el.src = v.file + '#t=0.1';
		box.appendChild(el);
		box.classList.add('can-preview');
		playBtn(box);
		var badge = document.createElement('span');
		badge.className = 'badge';
		badge.textContent = '▶ Xem trước';
		badge.style.margin = '0';
		box.appendChild(badge);

		var active = false, canHover = window.matchMedia && matchMedia('(hover: hover)').matches;
		if (canHover) {
			box.addEventListener('mouseenter', function () {
				if (active) return;
				box.classList.add('is-previewing');
				var p = el.play(); if (p && p.catch) p.catch(function () {});
			});
			box.addEventListener('mouseleave', function () {
				if (active) return;
				box.classList.remove('is-previewing');
				el.pause(); el.currentTime = 0.1;
			});
		}
		box.addEventListener('click', function () {
			if (active) return;
			active = true;
			box.classList.remove('is-previewing', 'can-preview');
			box.classList.add('is-active');
			el.controls = true; el.muted = false; el.loop = false;
			el.currentTime = 0;
			var p = el.play(); if (p && p.catch) p.catch(function () {});
		});
	}

	function mediaBox(cls, m) {
		MEDIA.push(m);
		return '<div class="ph ' + cls + '" data-m="' + (MEDIA.length - 1) + '"></div>';
	}

	function videoSection(key, id, num, label, sub, cls) {
		var g = D[key], r = g.ratio === 'v' ? 'r916' : 'r169';
		var h = '<section class="sec ' + cls + '" id="' + id + '"><div class="wrap">' +
			'<p class="lab">' + esc(num + ' · ' + label) + '</p><h2 class="h2"><span>' + esc(label) + '</span></h2>' +
			'<p class="sub">' + esc(sub) + '</p>';
		g.brands.forEach(function (b) {
			if (b.name) h += '<h3 class="brand">' + esc(b.name) + '</h3>';
			h += '<div class="g3">';
			b.items.forEach(function (v) {
				h += '<div class="card rv">' + mediaBox('vid ' + r, { type: 'video', item: v }) +
					'<h4>' + esc(v.title) + '</h4>' +
					'<a href="' + esc(v.url) + '" target="_blank" rel="noopener">Xem bản gốc →</a></div>';
			});
			h += '</div>';
		});
		return h + '</div></section>';
	}

	function build() {
		var h = '';
		var name = esc(D.name);

		// Hero
		h += '<section class="sec dk hero"><i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i><div class="wrap">' +
			'<p class="lab rise">Portfolio · ' + name + '</p>' +
			'<h1 class="hero-h rise d2">Content, thiết kế &amp; video — <em>trình bày bằng sản phẩm thật.</em></h1>' +
			(D.intro ? '<p class="sub rise d3">' + esc(D.intro) + '</p>' : '') +
			'<div class="rise d3 btns"><a class="btn" href="#seo">Xem sản phẩm</a><a class="btn2" href="#lien-he">Liên hệ</a></div>' +
			'</div></section>';

		// Band
		var t = new Array(9).join('Bài SEO web &nbsp;✦&nbsp; Infographic &nbsp;✦&nbsp; Video AI &nbsp;✦&nbsp; Content &nbsp;✦&nbsp; Video edit &nbsp;✦&nbsp; Review &nbsp;✦&nbsp; ');
		h += '<div class="band" aria-hidden="true"><div>' + t + '</div></div>';

		// Mục lục
		var idx = [['seo', 'Bài SEO web'], ['infographic', 'Thiết kế infographic'], ['video-ai', 'Video AI'], ['content', 'Content'], ['video-edit', 'Video edit & Content'], ['review', 'Review']];
		h += '<section class="sec lm slim"><div class="wrap chips">';
		idx.forEach(function (c, i) {
			h += '<a class="chip rv" href="#' + c[0] + '"><small>' + ('0' + (i + 1)).slice(-2) + '</small>' + esc(c[1]) + '</a>';
		});
		h += '</div></section>';

		// SEO
		h += '<section class="sec" id="seo"><div class="wrap"><p class="lab">01 · Bài SEO web</p>' +
			'<h2 class="h2">Bài viết chuẩn <span>SEO</span> cho 3 thương hiệu</h2>' +
			'<p class="sub">Mỗi thương hiệu 3 bài, dẫn thẳng về link gốc.</p>';
		D.seo.forEach(function (b) {
			h += '<h3 class="brand">' + esc(b.brand) + '</h3><p class="meta">' + esc(b.site) + '</p><div class="g3">';
			b.items.forEach(function (i) {
				h += '<article class="card rv">' + (i.tag ? '<span class="tag">' + esc(i.tag) + '</span>' : '') +
					'<h4>' + esc(i.title || 'Bài viết trên ' + b.site) + '</h4>' +
					(i.desc ? '<p>' + esc(i.desc) + '</p>' : '') +
					'<a href="' + esc(i.url) + '" target="_blank" rel="noopener">Đọc bài gốc →</a></article>';
			});
			h += '</div>';
		});
		h += '</div></section>';

		// Infographic
		h += '<section class="sec dk" id="infographic"><div class="wrap"><p class="lab">02 · Thiết kế infographic</p>' +
			'<h2 class="h2"><span>Infographic</span></h2><p class="sub">3 thiết kế, bấm để xem bài gốc.</p><div class="g3">';
		D.infographic.forEach(function (i, k) {
			h += '<div class="card rv">' + mediaBox('r45', { type: 'image', img: i.img, label: 'Infographic ' + (k + 1) }) +
				'<a href="' + esc(i.url) + '" target="_blank" rel="noopener">Xem bài đăng →</a></div>';
		});
		h += '</div></div></section>';

		h += videoSection('video_ai', 'video-ai', '03', 'Video AI', '3 video AI.', '');

		// Content
		var c = D.content;
		h += '<section class="sec lm" id="content"><div class="wrap"><p class="lab">04 · Content</p>' +
			'<h2 class="h2">Content: <span>' + esc(c.title) + '</span></h2>' +
			'<p class="sub">Bộ content được trình bày trong file bảng tính.</p>' +
			'<div class="card rv narrow">' + (c.desc ? '<p>' + esc(c.desc) + '</p>' : '') +
			'<a href="' + esc(c.url) + '" target="_blank" rel="noopener">Mở bảng content →</a></div></div></section>';

		h += videoSection('video_edit', 'video-edit', '05', 'Video edit & Content', '2 kênh, mỗi kênh 3 video.', 'dk');
		h += videoSection('video_review', 'review', '06', 'Video review', '3 video review sản phẩm.', '');

		// Liên hệ
		h += '<section class="sec dk contact" id="lien-he"><i class="blob b2"></i><i class="blob b3"></i><div class="wrap">' +
			'<p class="lab">Liên hệ</p><h2 class="h2"><span>Cùng làm việc</span> nhé</h2>' +
			'<p class="sub">Kết nối với ' + name + ' qua Facebook.</p>' +
			'<a class="btn" href="' + esc(D.facebook) + '" target="_blank" rel="noopener">Nhắn ' + name + ' trên Facebook</a></div></section>';

		return h;
	}

	var app = document.getElementById('app');
	app.innerHTML = build();

	document.getElementById('footer').textContent = '© ' + new Date().getFullYear() + ' ' + D.name + ' · Portfolio';
	document.getElementById('logo').innerHTML = esc(D.name) + '<span>.</span>';
	document.title = D.name + ' · Portfolio';

	Array.prototype.forEach.call(app.querySelectorAll('.ph[data-m]'), function (box) {
		var m = MEDIA[+box.getAttribute('data-m')];
		if (m.type === 'image') mountImage(box, m); else mountVideo(box, m);
	});

	// Menu mobile
	var t = document.querySelector('.nav-toggle'), n = document.querySelector('.main-nav');
	if (t && n) {
		t.addEventListener('click', function () { var o = n.classList.toggle('open'); t.setAttribute('aria-expanded', o); });
		n.addEventListener('click', function () { n.classList.remove('open'); });
	}

	// Hiệu ứng hiện dần khi cuộn
	var els = document.querySelectorAll('.rv, .sec');
	if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
	var io = new IntersectionObserver(function (es) {
		es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
	}, { threshold: .12 });
	els.forEach(function (e) { io.observe(e); });
})();
