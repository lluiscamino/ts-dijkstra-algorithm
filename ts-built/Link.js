export class Link {
    constructor(firstNode, secondNode, dist) {
        this.arrow = null;
        this.node1 = firstNode;
        this.node2 = secondNode;
        this.distance = dist;
    }
    static updateList() {
        let linkList = document.getElementById('linkList');
        linkList.innerHTML = '';
        let numLinks = 0;
        for (let link of Link.links) {
            let linkListElement = document.createElement('li');
            linkListElement.id = 'link-' + numLinks;
            linkListElement.innerText = link.node1.value + ' - ' + link.node2.value + ' (' + link.distance + ')';
            let deleteLinkImage = document.createElement('img');
            deleteLinkImage.title = deleteLinkImage.alt = 'Delete link';
            deleteLinkImage.src = 'resources/images/cross-button.png';
            let obj = Link.links[numLinks];
            deleteLinkImage.onclick = function () {
                obj.delete();
            };
            linkListElement.appendChild(deleteLinkImage);
            linkList.appendChild(linkListElement);
            numLinks++;
        }
        if (linkList.innerHTML === '') {
            linkList.innerHTML = '<li><i>No linked nodes.</i></li>';
        }
    }
    static unHighlightAll() {
        for (let link of Link.links) {
            link.unhighlight();
        }
    }
    static updateArrows(nodeElement) {
        for (let link of Link.links) {
            if (link.node1.element === nodeElement || link.node2.element === nodeElement) {
                link.generateArrow();
            }
        }
    }
    static getLinkByNodes(node1, node2) {
        for (let link of Link.links) {
            if ((link.node1 === node1 && link.node2 === node2) || (link.node1 === node2 && link.node2 === node1)) {
                return link;
            }
        }
        throw new Error('There is not a link between the given nodes');
    }
    generateArrow() {
        if (this.arrow === null) {
            // @ts-ignore
            this.arrow = new LeaderLine(this.node1.element, this.node2.element, {
                color: 'white',
                path: 'straight',
                endPlug: 'behind',
                // @ts-ignore
                middleLabel: LeaderLine.pathLabel({
                    text: String(this.distance),
                    fontWeight: 'lighter'
                })
            });
        }
        else {
            // @ts-ignore
            this.arrow.position();
        }
    }
    deleteArrow() {
        // @ts-ignore
        this.arrow.remove();
    }
    highlight() {
        this.arrow.color = 'orange';
    }
    unhighlight() {
        this.arrow.color = 'white';
    }
    create() {
        Link.links.push(this);
        this.generateArrow();
        Link.updateList();
    }
    delete() {
        let index = Link.links.indexOf(this);
        if (index > -1) {
            Link.links.splice(index, 1);
            this.deleteArrow();
            // TODO: fix this:
            /*this.node1.links.splice(this.node1.links.indexOf(this), 1);
            this.node2.links.splice(this.node2.links.indexOf(this), 1);*/
        }
        else {
            throw new Error('You have to set the link first');
        }
        Link.updateList();
    }
}
Link.links = [];
//# sourceMappingURL=Link.js.map