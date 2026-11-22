(function(){
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var hd=$('.hd'),fab=$('.fab'),trial=$('#trial');
  function onScroll(){hd.classList.toggle('scrolled',scrollY>8);var r=trial.getBoundingClientRect();fab.classList.toggle('hide',scrollY<300||(r.top<innerHeight&&r.bottom>0))}
  onScroll();addEventListener('scroll',onScroll,{passive:true});
  var mb=$('#menuBtn');mb.addEventListener('click',function(){mb.setAttribute('aria-expanded',document.body.classList.toggle('menu-open'))});
  $$('#nav a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('menu-open')})});

  // timetable (sample data)
  var D=['월','화','수','목','금','토','일'];
  var P='pilates',Y='yoga';
  var data={
    0:[['07:00','리포머 그룹','입문 · 한서윤',P,1],['10:00','빈야사 플로우','전체 · 윤미래',Y,4],['12:20','리포머 그룹','입문 · 정다인',P,2],['19:00','체어·바렐','중급 · 오지호',P,0],['20:10','리포머 그룹','입문 · 한서윤',P,1],['21:20','릴렉스 스트레칭','전체 · 정다인',Y,5]],
    1:[['08:00','리포머 그룹','입문 · 오지호',P,3],['11:00','릴렉스 스트레칭','전체 · 정다인',Y,6],['19:00','리포머 그룹','중급 · 한서윤',P,1],['20:10','빈야사 플로우','전체 · 윤미래',Y,2]],
    2:[['07:00','리포머 그룹','입문 · 한서윤',P,2],['10:00','빈야사 플로우','전체 · 윤미래',Y,3],['12:20','체어·바렐','중급 · 오지호',P,1],['19:00','리포머 그룹','입문 · 정다인',P,0],['20:10','리포머 그룹','중급 · 한서윤',P,2]],
    3:[['08:00','리포머 그룹','입문 · 오지호',P,4],['19:00','빈야사 플로우','전체 · 윤미래',Y,1],['20:10','체어·바렐','중급 · 한서윤',P,2],['21:20','릴렉스 스트레칭','전체 · 정다인',Y,7]],
    4:[['07:00','리포머 그룹','입문 · 한서윤',P,1],['12:20','리포머 그룹','입문 · 정다인',P,3],['19:00','빈야사 플로우','전체 · 윤미래',Y,2],['20:10','리포머 그룹','중급 · 오지호',P,1]],
    5:[['10:00','리포머 그룹','입문 · 한서윤',P,0],['11:10','빈야사 플로우','전체 · 윤미래',Y,3],['13:00','보강반','전체 · 정다인',P,2]],
    6:[]
  };
  var today=(new Date().getDay()+6)%7, day=today===6?0:today, type='all';
  var daysEl=$('#days'),tt=$('#tt');
  var base=new Date();base.setDate(base.getDate()-today);
  D.forEach(function(d,i){var dt=new Date(base);dt.setDate(base.getDate()+i);var b=document.createElement('button');b.className='day';b.setAttribute('role','tab');b.innerHTML=d+'<small>'+(dt.getMonth()+1)+'/'+dt.getDate()+'</small>';b.addEventListener('click',function(){day=i;render()});daysEl.appendChild(b)});
  $$('.fbtn').forEach(function(b){b.addEventListener('click',function(){$$('.fbtn').forEach(function(x){x.classList.remove('is-on')});b.classList.add('is-on');type=b.dataset.type;render()})});
  function render(){
    $$('.day',daysEl).forEach(function(b,i){b.classList.toggle('is-on',i===day);b.setAttribute('aria-selected',i===day)});
    var list=(data[day]||[]).filter(function(s){return type==='all'||s[3]===type});
    if(!list.length){tt.innerHTML='<div class="empty">'+(day===6?'일요일은 휴무입니다.':'해당 조건의 수업이 없습니다.')+'</div>';return}
    tt.innerHTML=list.map(function(s){var left=s[4],cls=left===0?'full':left<=1?'low':'',lab=left===0?'마감':left<=1?'잔여 '+left+'석':'잔여 '+left+'석';
      return '<div class="slot"><time>'+s[0]+'</time><div><h4><span class="k'+(s[3]===Y?' y':'')+'"></span>'+s[1]+'</h4><p>'+s[2]+'</p></div><span class="seat '+cls+'">'+lab+'</span></div>'}).join('');
  }
  render();

  // form demo (nothing is sent)
  var f=$('#trialForm'),err=$('#tErr'),done=$('#tDone'),dt=$('#t-date'),tel=$('#t-tel');
  var t=new Date(),iso=function(x){return x.toISOString().slice(0,10)};
  dt.min=iso(t);var mx=new Date();mx.setDate(mx.getDate()+30);dt.max=iso(mx);
  tel.addEventListener('input',function(){var d=tel.value.replace(/\D/g,'').slice(0,11);tel.value=d.length>7?d.replace(/(\d{3})(\d{3,4})(\d{4})/,'$1-$2-$3'):d.length>3?d.replace(/(\d{3})(\d+)/,'$1-$2'):d});
  f.addEventListener('submit',function(e){e.preventDefault();err.textContent='';$$('.invalid',f).forEach(function(x){x.classList.remove('invalid')});
    var bad=[];if(!dt.value)bad.push(dt);if(!f.time.value)bad.push(f.time);if(!f.name.value.trim())bad.push(f.name);if(!/^01\d-?\d{3,4}-?\d{4}$/.test(tel.value))bad.push(tel);
    if(bad.length){bad.forEach(function(x){x.classList.add('invalid')});bad[0].focus();err.textContent='필수 항목(날짜, 시간대, 이름, 연락처)을 확인해 주세요.';return}
    if(!f.agree.checked){err.textContent='개인정보 수집·이용 동의(데모)에 체크해 주세요.';return}
    var cls=$('input[name=cls]:checked',f).value,d=new Date(dt.value);
    $('#tDoneText').textContent=f.name.value.trim()+' 님, '+(d.getMonth()+1)+'월 '+d.getDate()+'일 '+f.time.value+' · '+cls+' 체험을 신청하셨어요.';
    done.hidden=false;
  });
  $('#tAgain').addEventListener('click',function(){f.reset();done.hidden=true});

  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -8% 0px'});
    $$('.feat article,.cls,.tm,.pc-card').forEach(function(el){el.classList.add('reveal');io.observe(el)})}
})();
