/* Tum stil dosyasi head'de preload edilir; ilk boyama satir ici kritik CSS ile olur. */
document.querySelectorAll('link[data-css]').forEach(function(l){l.rel='stylesheet';});
document.addEventListener('click',function(e){
 var b=e.target.closest('.menu-btn');
 if(b){var n=document.getElementById('nav');n.classList.toggle('open');b.setAttribute('aria-expanded',n.classList.contains('open'))}
});
/* Donusum takibi: telefon ve WhatsApp tiklamalari */
document.addEventListener('click',function(e){
 var a=e.target.closest('a');if(!a)return;
 var h=a.getAttribute('href')||'';
 if(typeof gtag!=='function')return;
 if(h.indexOf('tel:')===0)gtag('event','telefon_tikla',{yontem:'telefon'});
 if(h.indexOf('wa.me')>-1)gtag('event','whatsapp_tikla',{yontem:'whatsapp'});
 if(h.indexOf('g.page/r/')>-1)gtag('event','google_yorum_tikla',{yontem:'yorum_bandi'});
});
var f=document.getElementById('teklif');
if(f){f.addEventListener('submit',function(e){
 e.preventDefault();
 var d=new FormData(f),t=[];
 d.forEach(function(v,k){if(v)t.push(k+': '+v)});
 var msg='Merhaba, nakliyat fiyat teklifi istiyorum.%0A%0A'+encodeURIComponent(t.join('\n'));
 if(typeof gtag==='function')gtag('event','teklif_formu',{yontem:'form'});
 window.open('https://wa.me/905461122797?text='+msg,'_blank');
});}
