export default function () {
	const triggerClass = ".js-custom-device-props";

	if ($(triggerClass).length === 0) {
		return;
	}

	checkMedia();
	$(window).resize(function () {
		checkMedia();
	});

	function checkMedia() {
		if (window.matchMedia("(min-width:  768px)").matches) {
			checkDataProp("desk");
		} else if (
			window.matchMedia("(max-width: 768px) and (min-width: 480px)")
				.matches
		) {
			checkDataProp("tab");
		} else if (window.matchMedia("(max-width: 480px)").matches) {
			checkDataProp("mob");
		}
	}

	function checkDataProp(device) {
		$(triggerClass).each(function () {
			if ($(this).attr(`data-${device}-img`)) {
				changeProp("img", $(this).attr(`data-${device}-img`), $(this));
			}
			if ($(this).attr(`data-${device}-color`)) {
				changeProp(
					"color",
					$(this).attr(`data-${device}-color`),
					$(this)
				);
			}
			if ($(this).attr(`data-${device}-background`)) {
				changeProp(
					"background",
					$(this).attr(`data-${device}-background`),
					$(this)
				);
			}
			if ($(this).attr(`data-${device}-font`)) {
				changeProp(
					"font",
					$(this).attr(`data-${device}-font`),
					$(this)
				);
			}
			if ($(this).attr(`data-${device}-shadow`)) {
				changeProp(
					"shadow",
					$(this).attr(`data-${device}-shadow`),
					$(this)
				);
			}
		});

		function changeProp(prop, data, target) {
			const props = {
				img: "background-image",
				color: "color",
				background: "background-color",
				font: "font-family",
				shadow: "background",
			};

			const colors = {
				Miljonbla: "#003E52",
				Nord: "#1377B0",
				Himmel: "#C7E7F8",
				Moln: "#F5F5F5",

				Turkos: "#00A4B9",
				Turkos75: "#70B9CB",
				Turkos50: "#A8D1DC",
				Turkos20: "#DEEDF2",

				Rosa: "#D96195",
				Rosa75: "#E18DB1",
				Rosa50: "#EBB6CE",
				Rosa20: "#F7E3EC",

				Gron: "#50B78D",
				Gron75: "#8BC9A9",
				Gron50: "#B7DBC7",
				Gron20: "#E4F0EA",

				Orange: "#F98F00",
				Orange75: "#F7AA56",
				Orange50: "#FBC890",
				Orange20: "#FDE9D4",

				Gul: "#FFD944",
				Gul75: "#FFE27D",
				Gul50: "#FFEBAD",
				Gul20: "#FFF7E0",
			};
			const fonts = {
				Apercu: "Apercu Pro",
				ZingRust: "Zing Rust Demo Base",
				ZingRustScript: "Zing Rust Demo SB Base Script",
			};

			if (prop === "img") {
				data = `url(${data})`;
			}

			if (data === "null") {
				data = "";
			}

			if (prop === "color" || prop === "background") {
				if (!data) {
					data = "";
				} else {
					data = colors[data];
				}
			}

			if (prop === "font") {
				if (!data) {
					data = "";
				} else {
					data = fonts[data];
				}
			}

			target.css(props[prop], data);
		}
	}
}
