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
            throw new Error('Origin node is not connected');
        }
        let optimized: boolean[] = new Array(this.vertices.length).fill(false);
        let distances: number[] = new Array(this.vertices.length).fill(Number.POSITIVE_INFINITY);
        let predecessors: number[] = new Array(this.vertices.length);
        distances[origin] = 0;
        while (optimized.filter(function(x: boolean): boolean{return !x}).length != 0) {
            let v: number;
            let min: number = Number.POSITIVE_INFINITY;
            let i: number = 0;
            for (let dist of distances) {
                if (dist <= min && !optimized[i]) {
                    v = i;
                    min = dist;
                }
                i++;
            }
            optimized[v] = true;
            for (let j: number = 0; j < this.matrix[v].length; j++) {
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
        let result: string = '';
        for (let i: number = 0; i < this.vertices.length; i++) {
            for (let j: number = 0; j < this.vertices.length; j++) {
                result += this.matrix[i][j] + ' ';
            }
            result += '\n';
        }
        return result;
    }

}