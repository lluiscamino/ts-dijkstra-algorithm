import {Node} from './Node.js';
import {Link} from './Link.js';
import {AdjacencyMatrix} from './AdjacencyMatrix.js';

/* Create default initial node */
let initialNode: Node = new Node('Node 1', 120, 'green');
initialNode.create();

document.getElementById('createNodeForm').addEventListener('submit', function(event: any): void {
    event.preventDefault();
    let value: string = (document.getElementById('nodeValue') as HTMLInputElement).value;
    let size: number = parseInt((document.getElementById('size') as HTMLInputElement).value);
    let color: string = (document.getElementById('color') as HTMLInputElement).value;
    let node: Node = new Node(value, size, color);
    node.create();
});

document.getElementById('shortestPathForm').addEventListener('submit', function(event: any): void {
    event.preventDefault();
    let adjMatrix: AdjacencyMatrix = new AdjacencyMatrix(Node.nodes, Link.links);
    let origin: number = parseInt((document.getElementById('originSelect') as HTMLInputElement).value);
    let destiny: number = parseInt((document.getElementById('destinySelect') as HTMLInputElement).value);
    let dijkstra: number[][] = adjMatrix.dijkstraAlgorithm(origin);
    let predecessors: number[] = dijkstra[0];
    let distance: number = dijkstra[1][destiny];
    let actualNode: number = destiny;
    let path: number[] = [];
    while (actualNode !== undefined) {
        path.unshift(actualNode);
        actualNode = predecessors[actualNode];
    }
    let shortestPathResult: HTMLElement = document.getElementById('shortestPathResult');
    for (let i: number = 0; i < path.length; i++) {
        shortestPathResult.innerHTML += i !== path.length - 1 ? Node.nodes[path[i]].value + ' → ' : Node.nodes[path[i]].value;
    }
    shortestPathResult.innerHTML += ' (' + distance + ')<br>';
});