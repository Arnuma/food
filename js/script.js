window.addEventListener('DOMContentLoaded',()=>{

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent (){
		tabsContent.forEach((item)=>{
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		tabs.forEach(item =>{
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0){
		tabsContent[i].classList.add('show','fade');
		tabsContent[i].classList.remove('hide');

		tabs[i].classList.add('tabheader__item_active');
	}


	tabsParent.addEventListener('click',(e)=>{
		const target = e.target;
		if(target && target.classList.contains('tabheader__item')){
			tabs.forEach((item, i)=>{
				if(target == item){
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
	//timer

	const deadLine = '2024-05-11';

	function getTimeRemaining(endTime) {
		const t = Date.parse(endTime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endTime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endTime);
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	
	//modal

	const modalBtn = document.querySelector('.modal__close'),
		modal = document.querySelector('.modal');		


	const modalTimer = setInterval(modalOpen, 15000);

	function modalOpen (){
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimer);
	}

	function modalHide(){
		modal.classList.remove('show');
		modal.classList.add('hide');
		document.body.style.overflow = '';
	}

	document.querySelectorAll('.btn').forEach((item)=>{
		item.addEventListener('click',()=>{
			modalOpen ();
		});
	});

	document.addEventListener('keydown', (e)=>{
		if(e.code ==='Escape' && modal.classList.contains('show')){
			modalHide();
		}
	});

	modalBtn.addEventListener('click',modalHide);


	//tabs 
	class MenuTabs {
		constructor(menuImg, menuItemSubtitle, menuDescr, menuPrice, alt, parenElem) {
			this.menuImg = menuImg; //src
			this.menuItemSubtitle = menuItemSubtitle; //title
			this.menuDescr = menuDescr; //descr
			this.menuPrice = menuPrice; //price
			this.alt = alt; //alt
			this.transfer = 88;
			this.parenElem = document.querySelector(parenElem);
			this.changeToUS();
		}

		changeToUS() {
			this.menuPrice *= this.transfer;
		}

		render() {
			const elem = document.createElement('div');

			elem.innerHTML = `
		<div class="menu__item">
					<img src=${this.menuImg} alt=${this.alt}>
					<h3 class="menu__item-subtitle">Меню ${this.menuItemSubtitle}</h3>
					<div class="menu__item-descr">Меню ${this.menuItemSubtitle} - ${this.menuDescr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.menuPrice}</span> руб/день</div>
						</div>
		</div>
		`;
			this.parenElem.append(elem);
		}

	}

	new MenuTabs('img/tabs/vegy.jpg',
		'Фитнес', 'это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством',
		'10',
		'vegy',
		'.menu .container').render();

	new MenuTabs('img/tabs/elite.jpg',
		'Премиум', 'мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		'15',
		'elite',
		'.menu .container').render();

	new MenuTabs('img/tabs/post.jpg',
		'Постное', 'это тщательный подбор ингредиентов: полное отсутствиепродуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		'20',
		'post',
		'.menu .container').render();

	



	//запуск функций
	hideTabContent ();
	showTabContent();
	setClock('.timer', deadLine);
});




