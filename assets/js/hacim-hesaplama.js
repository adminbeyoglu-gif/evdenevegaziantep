(function(){
 var kok=document.getElementById('hesap');if(!kok)return;
 var wa='905461122797';
 function oku(){
  var top=0,liste=[];
  kok.querySelectorAll('input[type=number]').forEach(function(i){
   var a=parseInt(i.value||0,10);
   if(a>0){top+=a*parseFloat(i.dataset.hacim);liste.push(a+' x '+i.dataset.ad);}
  });
  return {m3:top,liste:liste};
 }
 function arac(m){
  if(m<=0)return['-','-','-','-'];
  if(m<12)return['Kamyonet','2 ki\u015fi','2-4 saat','Par\u00e7a e\u015fya / 1+1'];
  if(m<25)return['K\u00fc\u00e7\u00fck kamyon','2-3 ki\u015fi','3-5 saat','1+1 / az e\u015fyal\u0131 2+1'];
  if(m<40)return['Orta boy kamyon','3-4 ki\u015fi','4-6 saat','2+1 daire'];
  if(m<55)return['B\u00fcy\u00fck kamyon','4-5 ki\u015fi','6-8 saat','3+1 daire'];
  if(m<75)return['B\u00fcy\u00fck kamyon (dolu)','5-6 ki\u015fi','1 g\u00fcn','4+1 / dubleks'];
  return['2 ara\u00e7 veya t\u0131r','6+ ki\u015fi','1-2 g\u00fcn','Villa / b\u00fcy\u00fck konut'];
 }
 function yaz(){
  var d=oku(),a=arac(d.m3);
  document.getElementById('sonucM3').textContent=d.m3.toFixed(1);
  document.getElementById('sonucArac').textContent=a[0];
  document.getElementById('sonucEkip').textContent=a[1];
  document.getElementById('sonucSure').textContent=a[2];
  document.getElementById('sonucTip').textContent=a[3];
  document.getElementById('sonucAdet').textContent=d.liste.length;
  document.getElementById('sonucKutu').style.display=d.m3>0?'block':'none';
 }
 kok.addEventListener('input',yaz);
 kok.addEventListener('click',function(e){
  var b=e.target.closest('button[data-yon]');if(!b)return;
  e.preventDefault();
  var i=b.parentNode.querySelector('input');
  var v=parseInt(i.value||0,10)+(b.dataset.yon==='+'?1:-1);
  i.value=v<0?0:v;yaz();
 });
 var g=document.getElementById('hesapGonder');
 if(g)g.addEventListener('click',function(){
  var d=oku();
  if(d.m3<=0){alert('L\u00fctfen \u00f6nce e\u015fyalar\u0131n\u0131z\u0131 se\u00e7in.');return;}
  var a=arac(d.m3);
  var m='Merhaba, e\u015fya listemi hesaplad\u0131m:%0A%0A';
  m+=encodeURIComponent('Toplam hacim: '+d.m3.toFixed(1)+' m3\n');
  m+=encodeURIComponent('Onerilen arac: '+a[0]+'\n');
  m+=encodeURIComponent('Tahmini sure: '+a[2]+'\n\nEsyalar:\n'+d.liste.join('\n'));
  if(typeof gtag==='function')gtag('event','hacim_hesapla',{m3:d.m3.toFixed(1)});
  window.open('https://wa.me/'+wa+'?text='+m,'_blank');
 });
 var sf=document.getElementById('hesapSifirla');
 if(sf)sf.addEventListener('click',function(){
  kok.querySelectorAll('input[type=number]').forEach(function(i){i.value=0});yaz();
 });
 yaz();
})();
