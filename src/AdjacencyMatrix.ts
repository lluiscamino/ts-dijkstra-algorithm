import {Node} from './Node.js';
import {Link} from './Link.js';

export class AdjacencyMatrix {
    private readonly matrix: number[][] = [];
    private readonly vertices: Node[] = [];
    private readonly edges: Link[] = [];

    constructor(v: Node[], e: Link[]) {
        this.vertices = v;
        this.edges = e;
        this.matrix = new Array(this.vertices.length).fill(0).map(() => new Array(this.vertices.length).fill(0));
        this.create();
    }

    private create(): void {
        for (let link of this.edges) {
            let i: number = this.vertices.indexOf(link.node1);
            let j: number = this.vertices.indexOf(link.node2);
            this.matrix[i][j] = link.distance;
            this.matrix[j][i] = link.distance;
        }
    }

    dijkstraAlgorithm(origin: number): number[][] {
        if (Node.nodes[origin].links.length === 0) {
            throw new Error('Destiny node is not connected');
        }
        let optimized: boolean[] = new Array(this.vertices.length).fill(false);
        let distances: number[] = new Array(this.vertices.length).fill(Number.POSITIVE_INFINITY);
        let predecessors: number[] = new Array(this.vertices.length);
        distances[origin] = 0;
        while (optimized.filter(function(x){return x === false}).length != 0) {
            let v = distances.indexOf(Math.min(...distances.filter(function(distance: number) {
                return !optimized[distances.indexOf(distance)];
            })));
            optimized[v] = true;
            for (let j = 0; j < this.matrix[v].length; j++) {
                if (this.matrix[v][j] !== 0 && v !== j) {
                    if (distances[v] + this.matrix[v][j] < distances[j]) {
                        distances[j] = distances[v] + this.matrix[v][j];
                        predecessors[j] = v;
                    }
                }
            }
        }
        return [predecessors, distances];
    }

    toString(): string {
        let result = '';
        for (let i = 0; i < this.vertices.length; i++) {
            for (let j = 0; j < this.vertices.length; j++) {
                result += this.matrix[i][j] + ' ';
            }
            result += '\n';
        }
        return result;
    }

}