import {Node} from './Node.js';

export class Link {
    static links: Link[] = [];

    readonly node1: Node;
    readonly node2: Node;
    readonly distance: number;
    private arrow: any = null;

    constructor(firstNode: Node, secondNode: Node, dist: number) {
        this.node1 = firstNode;
        this.node2 = secondNode;
        this.distance = dist;
    }

    private static updateList(): void {
        let linkList: HTMLElement = document.getElementById('linkList');
        linkList.innerHTML = '';
        let numLinks: number = 0;
        for (let link of Link.links) {
            let linkListElement: HTMLElement = document.createElement('li');
            linkListElement.id = 'link-' + numLinks;
            linkListElement.innerText = link.node1.value + ' - ' + link.node2.value + ' (' + link.distance + ')';
            let deleteLinkImage: HTMLImageElement = document.createElement('img');
            deleteLinkImage.title = deleteLinkImage.alt = 'Delete link';
            deleteLinkImage.src = 'resources/images/cross-button.png';
            let obj: Link = Link.links[numLinks];
            deleteLinkImage.onclick = function (): void {
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

    static areLinked(node1: Node, node2: Node): boolean {
        for (let link of node1.links) {
            if (link.node1 === node2 || link.node2 === node2) {
                return true;
            }
        }
        return false;
    }

    static unHighlightAll(): void {
        for (let link of Link.links) {
            link.unhighlight();
        }
    }

    static updateArrows(nodeElement: HTMLElement): void {
        for (let link of Link.links) {
            if (link.node1.element === nodeElement || link.node2.element === nodeElement) {
                link.generateArrow();
            }
        }
    }

    static getLinkByNodes(node1: Node, node2: Node): Link {
        for (let link of Link.links) {
            if ((link.node1 === node1 && link.node2 === node2) || (link.node1 === node2 && link.node2 === node1)) {
                return link;
            }
        }
        throw new Error('There is not a link between the given nodes');
    }

    private generateArrow(): void {
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
        } else {
            this.arrow.position();
        }
    }

    private deleteArrow(): void {
        this.arrow.remove();
    }

    highlight(): void {
        this.arrow.color = 'orange';
    }

    unhighlight(): void {
        this.arrow.color = 'white';
    }

    create(): void {
        Link.links.push(this);
        this.generateArrow();
        Link.updateList();
        // @ts-ignore
        new Noty({
            theme: 'relax',
            type: 'success',
            layout: 'topLeft',
            text: 'Nodes <strong>' + this.node1.value + '</strong> and <strong>' + this.node2.value + '</strong> linked.',
            timeout: 3000,
            killer: true
        }).show();
    }

    delete(showNotification: boolean = true): void {
        let index: number = Link.links.indexOf(this);
        if (index > -1) {
            Link.links.splice(index, 1);
            this.deleteArrow();
            this.node1.links.splice(this.node1.links.indexOf(this), 1);
            this.node2.links.splice(this.node2.links.indexOf(this), 1);
        } else {
            throw new Error('You have to set the link first');
        }
        Link.updateList();
        if (showNotification) {
            // @ts-ignore
            new Noty({
                theme: 'relax',
                type: 'warning',
                layout: 'topLeft',
                text: 'Nodes <strong>' + this.node1.value + '</strong> and <strong>' + this.node2.value + '</strong> unlinked.',
                timeout: 3000,
                killer: true
            }).show();
        }
    }
}