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
/* eski form gonderimi asagidaki CRO blogunda guclendirildi */
/* --- CRO: akilli teklif formu iyilestirmeleri --- */
/* 1) Telefon alani: otomatik 0546 112 27 97 bicimlendirme */
var telG=document.getElementById('tel');
if(telG){telG.setAttribute('inputmode','tel');telG.setAttribute('maxlength','14');
telG.addEventListener('input',function(){
 var v=this.value.replace(/\D/g,'').slice(0,11);
 this.value=[v.slice(0,4),v.slice(4,7),v.slice(7,9),v.slice(9,11)].filter(Boolean).join(' ');
});}
/* 2) Taşınma tarihi: gecmis tarih secilemesin */
var trG=document.getElementById('tarih');
if(trG){var s=new Date(),a=('0'+(s.getMonth()+1)).slice(-2),g=('0'+s.getDate()).slice(-2);
trG.min=s.getFullYear()+'-'+a+'-'+g;}
/* 3) Gonderim sonrasi onay paneli: popup engellense bile kullanici yolu gorur */
var f2=document.getElementById('teklif');
if(f2){f2.addEventListener('submit',function(e){
 e.preventDefault();
 var d=new FormData(f2),t=[];
 d.forEach(function(v,k){if(v)t.push(k+': '+v)});
 var msg='Merhaba, nakliyat fiyat teklifi istiyorum.%0A%0A'+encodeURIComponent(t.join('\n'));
 var waUrl='https://wa.me/905461122797?text='+msg;
 var acilan=false;
 try{var w=window.open(waUrl,'_blank');acilan=!!w;}catch(err){acilan=false;}
 if(typeof gtag==='function')gtag('event','teklif_formu',{yontem:'form'});
 var p=f2.querySelector('.form-onay');
 if(!p){p=document.createElement('div');p.className='form-onay';p.setAttribute('role','status');f2.appendChild(p);}
 p.innerHTML='<strong>'+(acilan?'✅ Talebiniz hazır — WhatsApp açıldı':'✅ Talebiniz hazırlandı')+'</strong>'+
  (acilan?'<p>WhatsApp\u2019ta <b>Gönder</b>e basmanız yeterli, en geç 15 dakikada dönüş yapıyoruz.</p>'
         :'<p>WhatsApp açılmadıysa buraya dokunun:</p><a class="btn btn-w fo-link" target="_blank" rel="noopener" href="'+waUrl+'">WhatsApp\u2019ı Aç</a>');
 p.classList.add('go');
 try{p.scrollIntoView({behavior:'smooth',block:'nearest'});}catch(e){}
});}
