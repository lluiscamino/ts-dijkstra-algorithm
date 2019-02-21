import { Node } from './Node.js';
import { Link } from './Link.js';
/**
 * Taken from <https://www.kirupa.com/html5/drag.htm>
 */
let container = Node.CONTAINER;
let activeItem = null;
let active = false;
container.addEventListener('touchstart', dragStart, false);
container.addEventListener('touchend', dragEnd, false);
container.addEventListener('touchmove', drag, false);
container.addEventListener('mousedown', dragStart, false);
container.addEventListener('mouseup', dragEnd, false);
container.addEventListener('mousemove', drag, false);
function dragStart(e) {
    if (e.target !== e.currentTarget && e.target.classList.contains('node')) {
        active = true;
        activeItem = e.target;
        if (activeItem !== null) {
            if (!activeItem.xOffset) {
                activeItem.xOffset = 0;
            }
            if (!activeItem.yOffset) {
                activeItem.yOffset = 0;
            }
            if (e.type === 'touchstart') {
                activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
            }
            else {
                // moving
                activeItem.initialX = e.clientX - activeItem.xOffset;
                activeItem.initialY = e.clientY - activeItem.yOffset;
            }
        }
    }
}
function dragEnd(e) {
    if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
        Link.updateArrows(e.target);
    }
    active = false;
    activeItem = null;
}
function drag(e) {
    if (active) {
        if (e.type === 'touchmove') {
            e.preventDefault();
            activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
            activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
        }
        else {
            activeItem.currentX = e.clientX - activeItem.initialX;
            activeItem.currentY = e.clientY - activeItem.initialY;
        }
        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;
        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
    }
}
function setTranslate(xPos, yPos, el) {
    el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)';
}
//# sourceMappingURL=drag.js.map