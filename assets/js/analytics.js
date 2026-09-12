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
gtag('js', new Date());
if (GA_DEBUG) {
  gtag('config', GA_ID, { debug_mode: true });
} else {
  gtag('config', GA_ID);
}
(function(){
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
 setTimeout(yukle,5000); /* guvenlik geri sayimi */
})();
