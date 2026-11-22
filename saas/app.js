(function(){
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var mb=$('#menuBtn');mb.addEventListener('click',function(){mb.setAttribute('aria-expanded',document.body.classList.toggle('menu-open'))});
  $$('#nav a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('menu-open')})});

  // use cases
  var UC={
    sales:{bt:'견적·주문을 손으로 옮겨 적기',b:['메일로 온 주문서를 엑셀에 다시 입력','재고 확인을 위해 창고에 전화','누락 주문은 고객 항의로 알게 됨'],at:'주문 접수부터 출고 지시까지 자동',a:['주문서를 AI가 읽어 시스템에 바로 등록','재고 부족 시 담당자에게 즉시 알림','모든 주문 처리 상태를 대시보드로 확인'],m:'주문 1건 처리 12분 → 40초 (예시)'},
    fin:{bt:'월말마다 영수증·증빙 취합',b:['부서별로 영수증 사진을 메신저로 수집','카드 내역과 하나씩 대조','결재 누락으로 마감 지연'],at:'증빙 수집과 대조를 매일 자동으로',a:['영수증 사진을 올리면 항목·금액 자동 인식','카드 내역과 자동 매칭, 불일치만 표시','금액 기준 결재선으로 자동 승인 요청'],m:'월말 정산 2일 → 30분 (예시)'},
    hr:{bt:'입사·퇴사 때마다 체크리스트 수작업',b:['계정 생성을 부서마다 따로 요청','안내 메일을 매번 복사해 발송','장비 반납 누락'],at:'입·퇴사 절차를 한 번에',a:['입사 등록 한 번으로 계정·장비 요청 자동 생성','입사 첫 주 안내 메일 예약 발송','퇴사일 기준 권한 회수·반납 알림'],m:'입사 준비 업무 3시간 → 10분 (예시)'},
    cs:{bt:'문의 채널마다 따로 확인',b:['메일·게시판·채팅을 번갈아 확인','같은 질문에 같은 답 반복','긴급 문의를 늦게 발견'],at:'모든 문의를 한 곳에서 분류',a:['채널별 문의를 한 목록으로 모으고 자동 분류','자주 묻는 질문은 답변 초안 자동 작성','긴급 키워드는 담당자에게 즉시 알림'],m:'첫 응답 시간 4시간 → 15분 (예시)'}
  };
  function setUC(k){var d=UC[k];$('#ucBTitle').textContent=d.bt;$('#ucATitle').textContent=d.at;
    $('#ucB').innerHTML=d.b.map(function(x){return '<li>'+x+'</li>'}).join('');$('#ucA').innerHTML=d.a.map(function(x){return '<li>'+x+'</li>'}).join('');$('#ucM').textContent=d.m;
    $$('.uc-col').forEach(function(c){c.style.animation='none';c.offsetHeight;c.style.animation=''});
    $$('.ut').forEach(function(t){var on=t.dataset.k===k;t.classList.toggle('is-on',on);t.setAttribute('aria-selected',on)})}
  $$('.ut').forEach(function(t){t.addEventListener('click',function(){setUC(t.dataset.k)})});setUC('sales');

  // pricing toggle
  var sw=$('#billSwitch');sw.addEventListener('click',function(){var y=sw.getAttribute('aria-checked')!=='true';sw.setAttribute('aria-checked',y);
    $('#lblM').classList.toggle('on',!y);$('#lblY').classList.toggle('on',y);
    $$('.pp b').forEach(function(b){b.textContent=y?b.dataset.y:b.dataset.m});
    $$('.py').forEach(function(p,i){if(i<2)p.textContent=y?'연간 결제 시 · VAT 별도':'VAT 별도'})});


  // demo form (nothing is sent)
  var f=$('#demoForm'),err=$('#dErr'),btn=$('#dBtn');
  f.addEventListener('submit',function(e){e.preventDefault();err.textContent='';$$('.invalid',f).forEach(function(x){x.classList.remove('invalid')});
    var bad=[];if(!f.co.value.trim())bad.push(f.co);if(!f.name.value.trim())bad.push(f.name);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.mail.value))bad.push(f.mail);if(!f.size.value)bad.push(f.size);
    if(bad.length){bad.forEach(function(x){x.classList.add('invalid')});bad[0].focus();err.textContent='필수 항목(회사명, 이름, 이메일, 팀 규모)을 확인해 주세요.';return}
    if(!f.agree.checked){err.textContent='개인정보 수집·이용 동의(데모)에 체크해 주세요.';return}
    btn.classList.add('loading');btn.textContent='접수 중';
    setTimeout(function(){btn.classList.remove('loading');btn.textContent='데모 신청하기';
      $('#dDoneText').textContent=f.co.value.trim()+' '+f.name.value.trim()+' 님, '+f.size.value+' 팀 기준으로 데모를 준비하겠습니다.';$('#dDone').hidden=false},700)});
  $('#dAgain').addEventListener('click',function(){f.reset();$('#dDone').hidden=true});

  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -8% 0px'});
    $$('.f,.how-steps li,.plan').forEach(function(el){el.classList.add('reveal');io.observe(el)})}
})();
