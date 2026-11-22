(function(){
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  // header
  var hd=$('.hd'); var onScroll=function(){hd.classList.toggle('scrolled',window.scrollY>10)}; onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  var mb=$('#menuBtn'); mb.addEventListener('click',function(){var o=document.body.classList.toggle('menu-open'); mb.setAttribute('aria-expanded',o)});
  $$('#nav a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('menu-open')})});

  // counter
  var c=$('[data-count]'); if(c&&!document.hidden&&window.matchMedia('(prefers-reduced-motion: no-preference)').matches){var end=+c.dataset.count,t0=null;var step=function(t){if(!t0)t0=t;var p=Math.min((t-t0)/1400,1);c.textContent=Math.round(end*(1-Math.pow(1-p,3))).toLocaleString('ko-KR')+'+';if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}

  // gallery filter
  $$('.tab').forEach(function(b){b.addEventListener('click',function(){
    $$('.tab').forEach(function(x){x.classList.remove('is-on');x.setAttribute('aria-selected','false')}); b.classList.add('is-on'); b.setAttribute('aria-selected','true');
    var f=b.dataset.filter; $$('.g-item').forEach(function(g){g.classList.toggle('hide',f!=='all'&&g.dataset.cat!==f)});
  })});
  // lightbox
  var lb=$('#lightbox'), lbImg=$('img',lb), lbP=$('p',lb);
  $$('.g-item').forEach(function(g){g.addEventListener('click',function(){var i=$('img',g);lbImg.src=i.src;lbImg.alt=i.alt;lbP.textContent=$('figcaption b',g).textContent+' · '+$('figcaption span',g).textContent;lb.hidden=false})});
  lb.addEventListener('click',function(e){if(e.target!==lbImg)lb.hidden=true});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){lb.hidden=true;$('#doneModal').hidden=true}});

  // estimate
  var py=$('#pyeong'), out=$('#estOut'), pyo=$('#pyeongOut');
  var rate={full:150,kb:0,part:28};
  function calc(){var p=+py.value, s=$('input[name=scope]:checked').value, g=+$('input[name=grade]:checked').value, base;
    if(s==='kb') base=(700+450)+p*6; else base=p*rate[s];
    base*=g; var lo=Math.round(base*0.9/10)*10, hi=Math.round(base*1.12/10)*10;
    pyo.textContent=p+'평'; out.textContent=fmt(lo)+' ~ '+fmt(hi);
    var pct=(p-15)/(60-15)*100; py.style.background='linear-gradient(90deg,#b4643c '+pct+'%,#e4ddd1 '+pct+'%)';}
  function fmt(v){return v>=10000?(Math.floor(v/10000)+'억 '+(v%10000?(v%10000).toLocaleString('ko-KR')+'만':'')).trim()+'원':v.toLocaleString('ko-KR')+'만 원'}
  py.addEventListener('input',calc); $$('#scope input,#grade input').forEach(function(i){i.addEventListener('change',calc)}); calc();

  // form (demo only: nothing is sent)
  var form=$('#quoteForm'), err=$('#qErr'), modal=$('#doneModal');
  var tel=$('#q-tel'); tel.addEventListener('input',function(){var d=tel.value.replace(/\D/g,'').slice(0,11);tel.value=d.length>7?d.replace(/(\d{3})(\d{3,4})(\d{4})/,'$1-$2-$3'):d.length>3?d.replace(/(\d{3})(\d+)/,'$1-$2'):d});
  form.addEventListener('submit',function(e){e.preventDefault(); err.textContent='';
    $$('.invalid',form).forEach(function(x){x.classList.remove('invalid')});
    var bad=[]; if(!form.name.value.trim())bad.push(form.name); if(!/^01\d-?\d{3,4}-?\d{4}$/.test(tel.value))bad.push(tel); if(!form.size.value)bad.push(form.size);
    if(bad.length){bad.forEach(function(x){x.classList.add('invalid')});bad[0].focus();err.textContent='필수 항목(이름, 연락처, 평형)을 확인해 주세요.';return}
    if(!form.agree.checked){err.textContent='개인정보 수집·이용 동의(데모)에 체크해 주세요.';return}
    var areas=$$('input[name=area]:checked',form).map(function(x){return x.value}).join(', ')||'미선택';
    $('#doneText').textContent=form.name.value.trim()+' 님, '+form.size.value+' / '+areas+' 상담 요청을 확인했습니다.';
    modal.hidden=false; $('#doneClose').focus(); form.reset();
  });
  $('#doneClose').addEventListener('click',function(){modal.hidden=true});

  // reveal
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -8% 0px'});
    $$('.card,.svc,.steps li,.rv,.est-card,.form').forEach(function(el){el.classList.add('reveal');io.observe(el)});}
})();
