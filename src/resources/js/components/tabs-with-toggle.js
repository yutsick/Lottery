export default function () {
	document.addEventListener('DOMContentLoaded', () => {
		const classes = {
		wrap: 'js-tabs',
		nav: 'js-tabs-nav',
		navItem: 'js-tabs-nav-item',
		content: 'js-tabs-content',
		contentItem: 'js-tabs-content-item',
		active: 'js-active',
		bg: 'js-tabs-nav-bg',
		}

		document.querySelectorAll(`.${classes.wrap}`).forEach((tabs) => {
		const nav = tabs.querySelector(`.${classes.nav}`)
		const content = tabs.querySelector(`.${classes.content}`)

		if (nav === null || content === null) {
			return
		}

		const itemsNav = Array.from(nav.querySelectorAll(`.${classes.navItem}`))
		const lengthItemsNav = itemsNav.length
		const widthItem = 100 / lengthItemsNav
		const itemsContent = [...content.querySelectorAll(`.${classes.contentItem}`)].filter((item) => item.parentNode === content)

		const setActiveItem = (activeIndex) => (item, index) =>
			index === activeIndex ? item.classList.add(classes.active) : item.classList.remove(classes.active)

		const handleClickNavItem = (event) => {
			const navItem = event.target.closest(`.${classes.navItem}`)

			if (navItem === null) {
			return
			}

			if (navItem.closest(`.${classes.wrap}`) !== tabs) {
			return
			}

			event.preventDefault()

			const activeIndexNav = itemsNav.indexOf(navItem)

			itemsNav.forEach(setActiveItem(activeIndexNav))
			itemsContent.forEach(setActiveItem(activeIndexNav))

			if (bg === null) {
				return
			}

			const { left: leftItem } = navItem.getBoundingClientRect()
			const { left: leftNav } = nav.getBoundingClientRect()
			bg.style.transitionDuration = '.3s'
			bg.style.left = leftItem - leftNav + 'px'
		}

		tabs.addEventListener('click', handleClickNavItem)

		const bg = nav.querySelector(`.${classes.bg}`)

		if (bg === null) {
			return
		}

		bg.style.width = widthItem + '%'
		let activeIndex = itemsNav.findIndex((el) => el.classList.contains(classes.active))
		let oldActiveIndex = activeIndex

		const down = (e) => {
			e.preventDefault()

			const { width: widthBg, left: leftBg } = bg.getBoundingClientRect()
			const { width: widthNav, left: leftNav } = nav.getBoundingClientRect()

			const shiftX = (e.pageX || e.touches[0].pageX) - leftBg

			const move = (e) => {
				e.preventDefault()
				bg.style.transitionDuration = '0s'

				const currentX = e.pageX || e.touches[0].pageX
				let newX = currentX - leftNav - shiftX
				newX = Math.min(widthNav - widthBg, Math.max(0, newX))
				bg.style.left = newX + 'px'

				const currentXWithOffset = newX + widthBg / 2

				activeIndex = Math.floor(currentXWithOffset / widthBg)

				if (activeIndex !== oldActiveIndex) {
					itemsNav.forEach(setActiveItem(activeIndex))
					oldActiveIndex = activeIndex
				}
			}

			const up = (e) => {
				e.preventDefault()

				window.removeEventListener('mousemove', move)
				window.removeEventListener('mouseup', up)
				window.removeEventListener('touchmove', move)
				window.removeEventListener('touchend', up)
				itemsNav[activeIndex].click()
				}

				window.addEventListener('mousemove', move)
				window.addEventListener('mouseup', up)
				window.addEventListener('touchmove', move)
				window.addEventListener('touchend', up)
			}

			bg.addEventListener('mousedown', down)
			bg.addEventListener('touchstart', down)
		})
  	})
}