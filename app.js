/* ===================== CHỈNH Ở ĐÂY ===================== */
var CONFIG = {
  // Nhạc (tuỳ chọn): bỏ file mp3 vào thư mục audio/ rồi điền đường dẫn, ví dụ "audio/kho-bau.mp3".
  // Để trống thì nút play chỉ đổi biểu tượng như bản thiết kế gốc.
  audioSrc: "audio/kho-bau.mp3",
  photos: [1, 2, 3, 4, 5].map(function (i) { return "assets/gallery/gallery-new-" + i + ".png"; })
};
/* ======================================================= */

(function () {
  var $ = function (id) { return document.getElementById(id); };
  var rnd = function (a, b) { return a + Math.random() * (b - a); };
  var pct = function () { return rnd(0, 100).toFixed(1) + "%"; };

  /* ---------- Nền coquette ---------- */
  (function () {
    var IMG = "coquette", GLITTER = innerWidth < 700 ? 300 : 750, SPARKLES = 100, TINT = 0.42;
    var root = $("cq-root");
    root.insertAdjacentHTML("beforeend",
      '<div class="cq-glow"></div>' +
      '<img class="cq-bow-top" src="' + IMG + '/coquette-bow-top.jpg" alt="">' +
      '<div class="cq-lace" style="background-image:url(' + IMG + '/coquette-lace.jpg)"></div>' +
      '<div class="cq-tint" style="opacity:' + TINT + '"></div>');
    [
      { top: "3%",  left: "-3%",  w: "clamp(150px,22vw,300px)", rot: -18, flip: 1,  delay: 0,   op: .9 },
      { top: "4%",  right: "-3%", w: "clamp(150px,22vw,300px)", rot: 18,  flip: -1, delay: 1.4, op: .9 },
      { top: "36%", left: "-7%",  w: "clamp(170px,20vw,280px)", rot: 78,  flip: 1,  delay: 2.2, op: .8 },
      { top: "44%", right: "-7%", w: "clamp(170px,20vw,280px)", rot: -78, flip: -1, delay: .6,  op: .8 },
      { top: "24%", left: "18%",  w: "clamp(80px,9vw,130px)",   rot: -10, flip: 1,  delay: 3,   op: .7 },
      { top: "27%", right: "18%", w: "clamp(80px,9vw,130px)",   rot: 12,  flip: -1, delay: 1.9, op: .7 },
      { top: "74%", left: "3%",   w: "clamp(120px,15vw,210px)", rot: 10,  flip: 1,  delay: 2.7, op: .85 },
      { top: "76%", right: "3%",  w: "clamp(120px,15vw,210px)", rot: -10, flip: -1, delay: .3,  op: .85 }
    ].forEach(function (b) {
      var img = document.createElement("img");
      img.className = "cq-wc-bow"; img.alt = "";
      img.src = IMG + "/coquette-bow-watercolor.png";
      img.style.cssText = "top:" + b.top + ";" + (b.left ? "left:" + b.left : "right:" + b.right) +
        ";width:" + b.w + ";rotate:" + b.rot + "deg;scale:" + b.flip + " 1;opacity:" + b.op +
        ";animation:cq-float " + (5 + b.delay).toFixed(1) + "s ease-in-out " + b.delay + "s infinite";
      root.appendChild(img);
    });
    var colors = ["#fff", "#fff", "#fff", "#fff", "#fff", "#f9c6d7", "#fff", "#f3dcb4"], frag = document.createDocumentFragment();
    for (var i = 0; i < GLITTER; i++) {
      var z = rnd(.6, 2).toFixed(1), c = colors[i % colors.length], s = document.createElement("span");
      s.className = "cq-glitter";
      s.style.cssText = "left:" + pct() + ";top:" + pct() + ";width:" + z + "px;height:" + z + "px;background:" + c +
        ";box-shadow:0 0 " + (z * 2.5).toFixed(1) + "px " + (z * .5).toFixed(1) + "px " + c +
        ";animation:cq-twinkle " + rnd(2, 5).toFixed(1) + "s ease-in-out " + rnd(0, 6).toFixed(1) + "s infinite";
      frag.appendChild(s);
    }
    root.appendChild(frag);
    var fills = ["#fff", "#fff", "#fff", "#fff", "#f7c6d6"];
    for (var j = 0; j < SPARKLES; j++) {
      var sz = Math.round(rnd(6, 20));
      root.insertAdjacentHTML("beforeend",
        '<svg class="cq-sparkle" viewBox="0 0 24 24" fill="' + fills[j % 5] + '" style="left:' + pct() + ";top:" + pct() +
        ";width:" + sz + "px;height:" + sz + "px;animation:cq-bling " + rnd(3, 7).toFixed(2) + "s linear " + rnd(0, 5).toFixed(2) +
        's infinite"><path d="M12 0c.7 6.5 2.9 10.3 12 12-9.1 1.7-11.3 5.5-12 12-.7-6.5-2.9-10.3-12-12C9.1 10.3 11.3 6.5 12 0z"/></svg>');
    }
  })();

  /* ---------- Carousel (lặp 2 lần để chạy vô tận) ---------- */
  $("track").innerHTML = CONFIG.photos.concat(CONFIG.photos).map(function (p) {
    return '<img src="' + p + '" alt="Kỷ niệm">';
  }).join("");

  /* ---------- Player ---------- */
  var audio = $("audio"), playing = false;
  if (CONFIG.audioSrc) audio.src = CONFIG.audioSrc;
  function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ":" + ("0" + s % 60).slice(-2); }
  function setPlaying(on) { playing = on; $("ico-play").hidden = on; $("ico-pause").hidden = !on; }
  $("play").onclick = function () {
    if (!CONFIG.audioSrc) return setPlaying(!playing);
    if (audio.paused) audio.play().catch(function () { setPlaying(false); }); else audio.pause();
  };
  audio.addEventListener("play", function () { setPlaying(true); });
  audio.addEventListener("pause", function () { setPlaying(false); });
  audio.addEventListener("ended", function () { audio.currentTime = 0; });
  ["timeupdate", "loadedmetadata"].forEach(function (ev) { audio.addEventListener(ev, function () {
    var d = audio.duration || 0, c = audio.currentTime;
    $("t-cur").textContent = fmt(c); $("t-left").textContent = "-" + fmt(d - c);
    $("fill").style.width = d ? c / d * 100 + "%" : "0";
  }); });
  $("bar").onclick = function (e) {
    var r = this.getBoundingClientRect();
    if (audio.duration) audio.currentTime = (e.clientX - r.left) / r.width * audio.duration;
  };

  // Tự phát khi load trang. Trình duyệt thường chặn, nên nếu bị chặn thì phát ngay lần chạm/bấm đầu tiên.
  if (CONFIG.audioSrc) {
    var kick = function () {
      ["pointerdown", "keydown", "touchstart"].forEach(function (ev) { document.removeEventListener(ev, onFirst, true); });
    };
    var onFirst = function (e) {
      kick();
      if (e.target.closest && e.target.closest("#play")) return; // để nút play tự xử lý
      if (audio.paused) audio.play().catch(function () {});
    };
    audio.play().then(kick).catch(function () {
      ["pointerdown", "keydown", "touchstart"].forEach(function (ev) { document.addEventListener(ev, onFirst, true); });
    });
  }

  /* ---------- Thư ---------- */
  $("envBlock").onclick = function () {
    var l = $("letter"); l.hidden = false;
    requestAnimationFrame(function () { requestAnimationFrame(function () { $("letterIn").classList.add("open"); }); });
    setTimeout(function () { l.scrollIntoView({ behavior: "smooth", block: "center" }); }, 300);
  };

  /* ---------- Bấm CD: mưa trái tim + chữ I love you ---------- */
  var P = ["particle-1", "particle-2", "particle-3", "particle-4", "particle-1", "particle-2", "particle-3", "particle-4",
           "heart-pink-ombre", "heart-pink-ombre", "heart-pink-ombre"];
  var rainTimer, textTimer;
  $("cd").onclick = function () {
    clearTimeout(textTimer);
    var lt = $("loveText"); lt.hidden = true;
    rain(110, 4.2, 6.5, 2.6);
    textTimer = setTimeout(function () {
      lt.hidden = false;
      var h = lt.querySelector("h1");
      h.style.animation = "none"; void h.offsetWidth; h.style.animation = "";
      h.onanimationend = function () { lt.hidden = true; };
    }, 1200);
  };
  function rain(count, dMin, dMax, maxDelay) {
    clearTimeout(rainTimer);
    var box = $("rain"), end = 0, frag = document.createDocumentFragment();
    box.innerHTML = "";
    for (var i = 0; i < count; i++) {
      var dur = rnd(dMin, dMax), delay = rnd(0, maxDelay), size = Math.round(rnd(80, 160));
      end = Math.max(end, dur + delay);
      var d = document.createElement("div");
      d.className = "p";
      d.style.cssText = "left:" + rnd(0, 100).toFixed(1) + "vw;width:" + size + "px;animation-duration:" + dur.toFixed(1) +
        "s;animation-delay:" + delay.toFixed(1) + "s";
      d.innerHTML = '<img src="assets/particles/' + P[Math.floor(Math.random() * P.length)] + '.png" alt="" style="animation-duration:' + rnd(3.5, 6).toFixed(1) + 's">';
      frag.appendChild(d);
    }
    box.appendChild(frag);
    rainTimer = setTimeout(function () { box.innerHTML = ""; }, (end + 1) * 1000);
  }
})();
