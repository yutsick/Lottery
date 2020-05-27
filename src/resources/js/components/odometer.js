import debounce from 'lodash.debounce';

export default function() {

    let oddmeters = document.querySelectorAll('.js-oddmeter');
    const oddmeterDataId = 'data-oddmeter-id';
    let odds = [];

    const OddMeter = (element) => {

        const oddmeterHolderClassName = 'oddmeter__holder';
        const oddmeterInnerClassName = 'oddmeter__inner';
        const oddmeterNumberClassName = 'oddmeter__number';

        const oddmeterDataNumber = 'data-oddmeter-number';

        let currentNumber = 0;
        let currentElement = element;
        let activeNumbers = [];

        const initNumberScroll = () => {
            let addClassFor = activeNumbers.length - 3;
            let addClassFor2 = activeNumbers.length - 6;
            for(let i = 0; i < activeNumbers.length; i++) {
                let currentNumber = activeNumbers[i];
                let currentInner = currentElement.childNodes[i].childNodes[0];
                let currentActiveItem = currentInner.childNodes[currentNumber];
                const offset = currentActiveItem.offsetTop - currentInner.offsetTop;
                scrollNumber(currentInner, `${1 * i / 10}s`,  `translateY(-${offset}px)`);

                if(activeNumbers.length >= 7) {
                    if (i == addClassFor) {
                        currentInner.parentNode.classList.add("separate");
                    } else if (i == addClassFor2) {
                        currentInner.parentNode.classList.add("separate");
                    }
                } else if ( activeNumbers.length > 3 ) {
                    if (i == addClassFor) {
                        currentInner.parentNode.classList.add("separate");
                    }
                }
            }
        };

        const scrollNumber = (currentHolder, delay, transform) => {
            currentHolder.style.transitionDelay = delay;
            currentHolder.style.transform = transform
        };

        const reset = () => {
            activeNumbers = [];
            while (currentElement.firstChild) {
                currentElement.removeChild(currentElement.firstChild);
            }
            initStyle();
            initNumberScroll()
        };

        const update = (newValue) => {
            if(newValue.length != currentNumber.length) {
                currentElement.setAttribute(oddmeterDataNumber, newValue);
                reset();
                return;
            }
            if(parseInt(currentNumber) != parseInt(newValue)) {
                let changedValues = [];
                for(let i = 0; i < activeNumbers.length; i++) {
                    let activeNumber = parseInt(activeNumbers[i]);
                    let newNumber = newValue[i];
                    if(activeNumber != newNumber) {
                        let currentInner = currentElement.childNodes[i].childNodes[0];
                        let currentActiveItem = currentInner.childNodes[newNumber];
                        changedValues.push({
                            element: currentInner,
                            offset: `translateY(-${currentActiveItem.offsetTop}px)`
                        });
                        activeNumbers[i] = newNumber;
                    }
                }

                for(let x = 0; x < changedValues.length; x++) {
                    const currentChangedValue = changedValues[x];
                    scrollNumber(currentChangedValue.element, `${1 * x / 10}s`, currentChangedValue.offset)
                }
            }
        };

        const initStyle = () => {
            currentNumber = currentElement.getAttribute(oddmeterDataNumber);
            for(let i = 0; i < currentNumber.length; i++) {
                let holderContainer = document.createElement('span');
                holderContainer.classList.add(oddmeterHolderClassName);
                let innerContainer = document.createElement('span');
                innerContainer.classList.add(oddmeterInnerClassName);
                let currentActiveNumber = 0;
                for(let x = 0; x < 10; x++) {
                    let innerNumber = document.createElement('span');
                    innerNumber.innerHTML = x;
                    innerNumber.classList.add(oddmeterNumberClassName);
                    if(x == currentNumber[i]) {
                        currentActiveNumber = x
                    }
                    innerContainer.appendChild(innerNumber)
                }
                holderContainer.appendChild(innerContainer);
                activeNumbers[i] = currentActiveNumber;
                currentElement.appendChild(holderContainer)
            }
        };

        const resizeListener = () => {
            window.addEventListener('resize', debounce(() => { reset() }, 400))
        };

        const init = () => {
            initStyle();
            initNumberScroll();
            resizeListener();
        };

        return {
            init,
            update
        }
    };

    for(let i = 0; i < oddmeters.length; i++) {
        let element = oddmeters[i];
        let oddMeterId = element.getAttribute(oddmeterDataId);
        if(oddMeterId) {
            odds[oddMeterId] = new OddMeter(element);
            odds[oddMeterId].init();
        }
    }

    window.ML.updateOddMeter = (oddMeterId, newValue) => {
        let currentOddMeter = odds[oddMeterId];
        if(currentOddMeter) {
            currentOddMeter.update(newValue)
        }
    }
}