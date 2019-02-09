import { Node } from './Node.js';
import { Link } from './Link.js';
import { AdjacencyMatrix } from './AdjacencyMatrix.js';
/* Create default initial node */
let initialNode = new Node('Node 1', 120, 'green');
initialNode.create();
document.getElementById('createNodeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let value = document.getElementById('nodeValue').value;
    let size = parseInt(document.getElementById('size').value);
    let color = document.getElementById('color').value;
    let node = new Node(value, size, color);
    node.create();
});
document.getElementById('shortestPathForm').addEventListener('submit', function (event) {
    event.preventDefault();
    Link.unHighlightAll();
    let adjMatrix = new AdjacencyMatrix(Node.nodes, Link.links);
    let origin = parseInt(document.getElementById('originSelect').value);
    let destiny = parseInt(document.getElementById('destinySelect').value);
    let dijkstra = adjMatrix.dijkstraAlgorithm(origin);
    let predecessors = dijkstra[0];
    let distance = dijkstra[1][destiny];
    let actualNode = destiny;
    let path = [];
    while (actualNode !== undefined) {
        path.unshift(actualNode);
        if (predecessors[actualNode] !== undefined) {
            let actualLink = Link.getLinkByNodes(Node.nodes[actualNode], Node.nodes[predecessors[actualNode]]);
            actualLink.highlight();
        }
        actualNode = predecessors[actualNode];
    }
    let shortestPathResult = document.getElementById('shortestPathResult');
    for (let i = 0; i < path.length; i++) {
        shortestPathResult.innerHTML += i !== path.length - 1 ? Node.nodes[path[i]].value + ' → ' : Node.nodes[path[i]].value;
    }
    shortestPathResult.innerHTML += ' (' + distance + ')<br>';
});
//# sourceMappingURL=main.js.map