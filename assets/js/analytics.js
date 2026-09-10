/* Google Analytics 4 (gtag.js)
   Sayfa ilk yuklenmesini ve LCP'yi yavaslatmamak icin gtag kutuphanesi
   tarayici bosta iken (veya ilk etkilesimde) gec yuklenir.
   Bu satirlara kadar olusan gtag() cagrilari dataLayer'da kuyruklanir. */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-ZG8TX9J7WS');
(function(){
 var yuklendi=false;
 function yukle(){
  if(yuklendi) return; yuklendi=true;
  var s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id=G-ZG8TX9J7WS';
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
