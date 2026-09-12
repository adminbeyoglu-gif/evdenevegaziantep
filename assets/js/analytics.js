/* Google Analytics 4 (gtag.js)
   Sayfa ilk yuklenmesini ve LCP'yi yavaslatmamak icin gtag kutuphanesi
   tarayici bosta iken (veya ilk etkilesimde) gec yuklenir.
   Bu satirlara kadar olusan gtag() cagrilari dataLayer'da kuyruklanir.
   Teşhis: sayfayi ?debug=1 ile acin -> GA4 DebugView'a kaydeder;
   konsolda [GA] satirlari kutuphanenin yuklenip yuklenmedigini gosterir. */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var GA_ID = 'G-ZJXZC7MMRG';
var GA_DEBUG = /[?&]debug=1/.test(location.search);
var rizaOk = (function(){ try { return localStorage.getItem('riza') === 'ok'; } catch(e){ return false; } })();
window['ga-disable-' + GA_ID] = !rizaOk;
if (rizaOk) gtag('js', new Date());
if (rizaOk && GA_DEBUG) {
  gtag('config', GA_ID, { debug_mode: true });
} else if (rizaOk) {
  gtag('config', GA_ID);
}
function rizaGecYukle(){
 var yuklendi=false;
 function yukle(){
  if(yuklendi) return; yuklendi=true;
  var s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;
  s.onload=function(){ if(window.console) console.info('[GA] gtag.js yüklendi — ölçüm kimliği '+GA_ID+(GA_DEBUG?' (debug_mode AÇIK)':'')); };
  s.onerror=function(){ if(window.console) console.warn('[GA] gtag.js YÜKLENEMEDİ — reklam engelleyici (uBlock/AdGuard) veya tarayıcı izleme koruması engelliyor olabilir.'); };
  document.head.appendChild(s);
 }
 if('requestIdleCallback' in window){
  requestIdleCallback(yukle,{timeout:2500});
 } else {
  window.addEventListener('load',yukle);
 }
 ['touchstart','scroll','keydown','pointerover','click'].forEach(function(olay){
  window.addEventListener(olay,yukle,{passive:true});
 });
 setTimeout(yukle,5000);
}
var rizaHam = (function(){ try { return localStorage.getItem('riza'); } catch(e){ return null; } })();
if (rizaOk) { rizaGecYukle(); } else if (rizaHam === null) { rizaBandiGoster(); }
/* 'hayir' secildiyse: bant bir daha cikmaz, GA hic yuklenmez */

document.addEventListener('riza-ok', function(){
  window['ga-disable-' + GA_ID] = false;
  gtag('js', new Date());
  if (GA_DEBUG) { gtag('config', GA_ID, { debug_mode: true }); } else { gtag('config', GA_ID); }
  rizaGecYukle();
});

function rizaBandiGoster(){
  if (document.getElementById('riza-bandi')) return;
  var b = document.createElement('div');
  b.id = 'riza-bandi';
  b.setAttribute('role', 'region');
  b.setAttribute('aria-label', 'Çerez ve ölçüm izni');
  b.innerHTML = '<div class="riza-ic"><p class="riza-yazi">Sitemizde ziyaret analizi için çerezler kullanılıyor. Ayrıntılar: <a href="/gizlilik-politikasi/">Gizlilik ve KVKK Metni</a>.</p>'
    + '<div class="riza-btns"><button type="button" class="riza-tamam">Kabul ediyorum</button>'
    + '<button type="button" class="riza-red">Yalnızca zorunlu</button></div></div>';
  document.body.appendChild(b);
  setTimeout(function(){ b.classList.add('acik'); }, 600);
  b.querySelector('.riza-tamam').addEventListener('click', function(){
    try { localStorage.setItem('riza', 'ok'); } catch(e){}
    kapat(b);
    document.dispatchEvent(new Event('riza-ok'));
  });
  b.querySelector('.riza-red').addEventListener('click', function(){
    try { localStorage.setItem('riza', 'hayir'); } catch(e){}
    window['ga-disable-' + GA_ID] = true;
    kapat(b);
  });
  function kapat(el){ el.classList.remove('acik'); setTimeout(function(){ el.remove(); }, 350); }
}
