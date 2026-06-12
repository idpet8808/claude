/* farm-register.js — 농장 등록·수정 인터랙션
 * 라디오 / 단위토글 / 토글 / 작물 선택 시트 / 지역 선택 시트 / 완료 모달
 */

(function () {
  /* 마스터 데이터 (예시) */
  var VARIETIES = {
    '오이': ['백다다기', '가시오이', '청장오이', '조선오이'],
    '토마토': ['대저', '찰토마토', '방울토마토', '대추방울'],
    '딸기': ['설향', '죽향', '금실', '매향'],
    '상추': ['청상추', '적상추', '로메인', '버터헤드'],
    '고추': ['청양고추', '꽈리고추', '오이고추', '홍고추'],
    '파프리카': ['빨강', '노랑', '주황'],
    '배추': ['봄배추', '가을배추', '얼갈이'],
    '감자': ['수미', '대지', '두백'],
    '고구마': ['밤고구마', '호박고구마', '꿀고구마'],
    '옥수수': ['찰옥수수', '대학찰', '미백찰']
  };
  var SIGUNGU = {
    '서울특별시': ['종로구', '중구', '용산구', '성동구', '강남구', '서초구', '송파구', '강서구', '마포구', '영등포구'],
    '경기도': ['수원시', '성남시', '용인시', '고양시', '양평군', '가평군', '광주시', '이천시', '여주시', '평택시'],
    '강원특별자치도': ['춘천시', '원주시', '강릉시', '동해시', '홍천군', '횡성군', '평창군'],
    '충청북도': ['청주시', '충주시', '제천시', '음성군', '진천군'],
    '충청남도': ['천안시', '아산시', '서산시', '논산시', '당진시', '예산군'],
    '전북특별자치도': ['전주시', '군산시', '익산시', '정읍시', '김제시', '완주군'],
    '전라남도': ['목포시', '여수시', '순천시', '나주시', '해남군', '고흥군'],
    '경상북도': ['포항시', '경주시', '안동시', '구미시', '상주시', '영주시'],
    '경상남도': ['창원시', '진주시', '김해시', '양산시', '거제시', '통영시'],
    '제주특별자치도': ['제주시', '서귀포시']
  };

  /* 라디오 */
  document.querySelectorAll('[data-radio]').forEach(function (r) {
    r.addEventListener('click', function () {
      document.querySelectorAll('[data-radio="' + r.dataset.radio + '"]').forEach(function (x) { x.classList.remove('on'); });
      r.classList.add('on');
    });
  });

  /* 단위 토글 */
  document.querySelectorAll('[data-unit]').forEach(function (u) {
    u.addEventListener('click', function () {
      document.querySelectorAll('[data-unit]').forEach(function (x) { x.classList.remove('on'); });
      u.classList.add('on');
    });
  });

  /* 대표농장 토글 */
  document.querySelectorAll('[data-toggle]').forEach(function (t) {
    t.addEventListener('click', function () { t.classList.toggle('on'); });
  });

  /* 추가된 작물 삭제 (초기 항목) */
  document.querySelectorAll('.ai-x').forEach(function (x) {
    x.addEventListener('click', function () { x.closest('.added-item').remove(); updateCount(); });
  });

  /* 사진 썸네일 삭제 */
  document.querySelectorAll('.pthumb .x').forEach(function (x) {
    x.addEventListener('click', function () { x.closest('.pthumb').remove(); });
  });

  /* 바텀시트 공통 열기/닫기 */
  function openSheet(s) { s.classList.add('show'); }
  function closeSheet(s) { s.classList.remove('show'); }
  document.querySelectorAll('.sheet-scrim').forEach(function (s) {
    s.addEventListener('click', function (e) {
      if (!e.target.closest('.sheet')) closeSheet(s);
    });
  });

  /* ===== 작물 선택 시트 ===== */
  var cropSheet = document.getElementById('cropSheet');
  var cropCol = document.getElementById('cropCol');
  var varietyCol = document.getElementById('varietyCol');
  var sfSelected = document.getElementById('sfSelected');
  var sfJusu = document.getElementById('sfJusu');
  var sfAdd = document.getElementById('sfAdd');
  var addedList = document.querySelector('.added-list');
  var addedN = document.querySelector('.added-n');
  var selectedCrop = '오이';
  var selectedVariety = '';

  if (document.getElementById('openCrop')) {
    document.getElementById('openCrop').addEventListener('click', function () {
      selectedCrop = '오이'; selectedVariety = '';
      cropCol.querySelectorAll('.ci').forEach(function (x) { x.classList.toggle('on', x.dataset.crop === '오이'); });
      renderVarieties(selectedCrop);
      sfJusu.value = '';
      updateSelected();
      openSheet(cropSheet);
    });
  }

  function updateSelected() {
    sfSelected.textContent = (selectedVariety ? selectedCrop + ' (' + selectedVariety + ')' : selectedCrop) + ' 선택됨';
  }

  function renderVarieties(crop) {
    var list = VARIETIES[crop] || [];
    var html = '<button class="cv-item on" data-variety="">기타 (품종 선택 안 함)</button>';
    list.forEach(function (v) {
      html += '<button class="cv-item" data-variety="' + v + '">' + v + '</button>';
    });
    varietyCol.innerHTML = html;
    selectedVariety = '';
    varietyCol.querySelectorAll('.cv-item').forEach(function (it) {
      it.addEventListener('click', function () {
        varietyCol.querySelectorAll('.cv-item').forEach(function (x) { x.classList.remove('on'); });
        it.classList.add('on');
        selectedVariety = it.dataset.variety;
        updateSelected();
      });
    });
  }

  cropCol && cropCol.querySelectorAll('.ci').forEach(function (it) {
    it.addEventListener('click', function () {
      cropCol.querySelectorAll('.ci').forEach(function (x) { x.classList.remove('on'); });
      it.classList.add('on');
      selectedCrop = it.dataset.crop;
      renderVarieties(selectedCrop);
      updateSelected();
    });
  });

  if (sfAdd) {
    sfAdd.addEventListener('click', function () {
      var name = selectedVariety ? (selectedCrop + ' (' + selectedVariety + ')') : selectedCrop;
      var jusu = sfJusu.value.trim();
      var item = document.createElement('div');
      item.className = 'added-item';
      item.innerHTML = '<div class="ai-main"><span class="ai-name">' + name + '</span>' +
        (jusu ? '<span class="ai-meta">' + jusu + '주</span>' : '') + '</div>' +
        '<button class="ai-x"><svg class="ic"><use href="#i-x"/></svg></button>';
      item.querySelector('.ai-x').addEventListener('click', function () { item.remove(); updateCount(); });
      addedList.appendChild(item);
      updateCount();
      closeSheet(cropSheet);
    });
  }

  function updateCount() {
    if (addedN) addedN.textContent = addedList.querySelectorAll('.added-item').length;
  }

  if (document.getElementById('cropSearch')) {
    document.getElementById('cropSearch').addEventListener('input', function () {
      var q = this.value.trim().toLowerCase();
      cropCol.querySelectorAll('.ci').forEach(function (it) {
        it.style.display = it.textContent.toLowerCase().indexOf(q) > -1 ? '' : 'none';
      });
    });
  }

  /* ===== 지역 선택 시트 ===== */
  var regionSheet = document.getElementById('regionSheet');
  var regionVal = document.querySelector('#openRegion .val');
  var sidoCol = document.getElementById('sidoCol');
  var sigunguCol = document.getElementById('sigunguCol');
  var regionSelected = document.getElementById('regionSelected');
  var regionConfirm = document.getElementById('regionConfirm');
  var selSido = '서울특별시', selSigungu = '';

  if (document.getElementById('openRegion')) {
    document.getElementById('openRegion').addEventListener('click', function () {
      selSido = '서울특별시'; selSigungu = '';
      sidoCol.querySelectorAll('.ci').forEach(function (x) { x.classList.toggle('on', x.dataset.sido === '서울특별시'); });
      renderSigungu(selSido);
      updateRegion();
      openSheet(regionSheet);
    });
  }
  function updateRegion() {
    if (selSigungu) {
      regionSelected.textContent = selSido + ' ' + selSigungu;
      regionConfirm.disabled = false;
    } else {
      regionSelected.textContent = '시/군/구를 선택해 주세요';
      regionConfirm.disabled = true;
    }
  }
  function renderSigungu(sido) {
    var list = SIGUNGU[sido] || [];
    sigunguCol.innerHTML = list.map(function (g) { return '<button class="cv-item" data-gu="' + g + '">' + g + '</button>'; }).join('');
    selSigungu = '';
    sigunguCol.querySelectorAll('.cv-item').forEach(function (it) {
      it.addEventListener('click', function () {
        sigunguCol.querySelectorAll('.cv-item').forEach(function (x) { x.classList.remove('on'); });
        it.classList.add('on');
        selSigungu = it.dataset.gu;
        updateRegion();
      });
    });
  }
  sidoCol && sidoCol.querySelectorAll('.ci').forEach(function (it) {
    it.addEventListener('click', function () {
      sidoCol.querySelectorAll('.ci').forEach(function (x) { x.classList.remove('on'); });
      it.classList.add('on');
      selSido = it.dataset.sido;
      renderSigungu(selSido);
      updateRegion();
    });
  });
  if (regionConfirm) {
    regionConfirm.addEventListener('click', function () {
      regionVal.textContent = selSido + ' ' + selSigungu;
      regionVal.classList.remove('ph');
      closeSheet(regionSheet);
    });
  }

  /* ===== 등록·수정 완료 모달 ===== */
  var doneModal = document.getElementById('doneModal');
  var submitBtn = document.querySelector('.btn-submit');
  if (submitBtn && doneModal) {
    submitBtn.addEventListener('click', function () { doneModal.classList.add('show'); });
  }
  var doneOk = document.getElementById('doneOk');
  if (doneOk) {
    doneOk.addEventListener('click', function () {
      doneModal.classList.remove('show');
      window.location.href = 'farm-detail.html';
    });
  }
})();
