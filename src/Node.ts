import {Link} from './Link.js';

export class Node {
   static readonly CONTAINER = document.getElementById('nodesContainer');
   static nodes: Node[] = [];
   private static lastLinkedNode: Node = null;

   // TODO: make properties private
   element: HTMLElement;
   readonly value: string;
   private readonly size: number;
   private readonly color: string;
   links: Link[] = [];

   constructor(val: string, size: number, col: string) {
       this.value = val;
       this.size = size;
       this.color = col;
       Node.nodes.push(this);
   }

   private static updateList(): void {
       let nodeList = document.getElementById('nodeList');
       let originSelect: HTMLElement = document.getElementById('originSelect');
       let destinySelect: HTMLElement = document.getElementById('destinySelect');
       let numNodes: number = 0;
       nodeList.innerHTML = '';
       originSelect.innerHTML = '<option selected disabled>Origin</option>';
       destinySelect.innerHTML = '<option selected disabled>Destiny</option>';
       for (let node of Node.nodes) {
           nodeList.innerHTML += '<li>' + node.value + '</li>';
           originSelect.innerHTML += '<option value="' + numNodes + '">' + node.value + '</option>';
           destinySelect.innerHTML += '<option value="' + numNodes + '">' + node.value + '</option>';
           Link.updateArrows(node.element);
           numNodes++;
       }
       if (nodeList.innerHTML === '') {
           nodeList.innerHTML = '<li><i>No nodes.</i></li>'
       }
   }

   private static link(node: Node): void {
       if (Node.lastLinkedNode !== null) {
           let linkButton: HTMLElement = Node.lastLinkedNode.element.childNodes[2] as HTMLElement;
           linkButton.style.opacity = '1';
           linkButton.style.cursor = 'pointer';
           if (Node.lastLinkedNode === node) {
               Node.lastLinkedNode = null;
               throw new Error('You cannot not link a node with itself.');
           }
           if (Link.areLinked(Node.lastLinkedNode, node)) {
               Node.lastLinkedNode = null;
               throw new Error('Nodes already linked, remove link first.')
           }
           let distance: number = parseInt(prompt('Enter distance between nodes'));
           let link: Link = new Link(Node.lastLinkedNode, node, distance);
           link.create();
           Node.lastLinkedNode.links.push(link);
           node.links.push(link);
           Node.lastLinkedNode = null;
       } else {
           // @ts-ignore
           new Noty({
               theme: 'relax',
               type: 'info',
               layout: 'topLeft',
               text: 'Click on the link button of another node to link it with <strong>' + node.value + '</strong>.',
               killer: true
           }).show();
           let linkButton: HTMLElement = node.element.childNodes[2] as HTMLElement;
           linkButton.style.opacity = '0.4';
           linkButton.style.cursor = 'not-allowed';
           Node.lastLinkedNode = node;
       }
   }

   create(showNotification: boolean = true): void {
       this.element = document.createElement('div');
       this.element.classList.add('node');
       this.element.innerHTML = this.value + '<br>';
       this.element.draggable = navigator.userAgent.indexOf('Firefox') !== -1;
       //this.element.style.left =;
       //this.element.style.top =;
       this.element.style.width = this.element.style.height = this.size + 'px';
       this.element.style.backgroundColor = this.color;
       let linkImage = document.createElement('img');
       linkImage.title = linkImage.alt = 'Link with another node';
       linkImage.src = 'resources/images/link.png';
       let deleteImage = document.createElement('img');
       deleteImage.title = deleteImage.alt = 'Delete node';
       deleteImage.src = 'resources/images/cross-button.png';
       let obj = this;
       this.element.appendChild(linkImage);
       this.element.appendChild(deleteImage);
       deleteImage.onclick = function (): void {
           obj.delete();
       };
       linkImage.onclick = function (): void {
           try {
               Node.link(obj);
           } catch(e) {
               // @ts-ignore
               new Noty({
                   theme: 'relax',
                   type: 'error',
                   layout: 'topLeft',
                   text: e.message,
                   timeout: 3000,
                   killer: true
               }).show();
           }
       };
       Node.CONTAINER.appendChild(this.element);
       if (showNotification) {
           // @ts-ignore
           new Noty({
               theme: 'relax',
               type: 'success',
               layout: 'topLeft',
               text: 'Node <strong>' + this.value + '</strong> created.',
               timeout: 3000,
               killer: true
           }).show();
       }
       Node.updateList();
   }

   delete(): void {
       if (!this.element) {
           throw new Error('You have to create the element first');
       }
       Node.CONTAINER.removeChild(this.element);
       Node.nodes.splice(Node.nodes.indexOf(this), 1);
       this.deleteAllLinks(false);
       Node.updateList();
       // @ts-ignore
       new Noty({
           theme: 'relax',
           type: 'warning',
           layout: 'topLeft',
           text: 'Node <strong>' + this.value + '</strong> deleted.',
           timeout: 3000,
           killer: true
       }).show();
   }

   deleteAllLinks(showNotification: boolean = true): void {
       while (this.links.length > 0) {
           this.links[0].delete(showNotification);
       }
   }
}