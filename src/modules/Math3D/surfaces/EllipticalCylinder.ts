import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";
import Surface from "../entities/Surface";

class EllipticalCylinder extends Surface {
    constructor({
        r = 5, h = 10, count = 10, colors = "#888888", x = 0, y = 0, z = 0
    } = {}) {
        super();
        const points = [];
        const edges = [];
        const polygons = [];
        const borderPoints = [];
        const borderPolygon: any = [];
        const borderEdges: any = [];


        // Points
        for (let i = 0; i < count; i++) {
            const a = ((2 * Math.PI) / count) * i;
            for (let j = -count / 2; j < count / 2; j++) {
                const p = (h / count) * j;
                points.push(
                    new Point(
                        r * Math.cos(a) + x, 
                        p + y, 
                        r * Math.sin(a) + z
                    ));
            }
        }
        
        //Точки области
        for (let i = 0; i <= count * 0.2; i++) {
            const a = ((2 * Math.PI) / count) * i;
            for (let j = -count / 2; j < count * 0.5 / 2; j++) {
                const p = (h * 0.5) / count * j;
                borderPoints.push(
                    new Point(
                        r * Math.cos(a) + x, 
                        p + y, 
                        r * Math.sin(a) + z,
                        '#ff0000'
                    ));
            }
        }

        //Грани области
        for (let i = 0; i < borderPoints.length; i++) {
            if ((i + 1) % count !== 0 && i + 1 < borderPoints.length && (i+1)%8!==0) {
                borderEdges.push(new Edge(i, i + 1, '#ff0000'));
            }
            if(i + 8 < borderPoints.length) {
                borderEdges.push(new Edge(i, i + 8, '#ff0000'));
            }
        }

        //Полигоны области
        // Edges
        for (let i = 0; i < points.length; i++) {
            if ((i + 1) % count !== 0 && i + 1 < points.length) {
                edges.push(new Edge(i, i + 1));
            }
            if (i + count < points.length) {
                edges.push(new Edge(i, i + count));
            }
            if (i < count) {
                edges.push(new Edge(i, points.length - count + i));
            }
        }

        // Polygons
        for (let i = 0; i < points.length; i++) {
            if (i + count + 1 < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], colors));
            }
            if (i < count - 1) {
                polygons.push(new Polygon([i, i + 1, points.length - count + i + 1, points.length - count + i], colors));
            }
        }

    this.points = points;
    this.edges = edges;
    this.polygons = polygons;
    this.borderPoints = borderPoints;
    this.borderEdges = borderEdges;
    this.borderPolygon = borderPolygon;
    }
}

export default EllipticalCylinder;
