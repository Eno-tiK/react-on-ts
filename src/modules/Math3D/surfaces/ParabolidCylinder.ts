import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";
import Surface from "../entities/Surface";

class ParabalidCylinder extends Surface {
    constructor({
        a = 5, b = 5, count = 20, color = "#888888", x = 0, y = 0, z = 0
    } = {}) {
        super();
        const points = [];
        const edges = [];
        const polygons = [];
        for (let i = -count / 2; i <= count / 2; i++) {
            const T = (Math.PI / count) * i;
            for (let j = 0; j < count; j++) {
                const p = ((3 * Math.PI) / count) * j;
                points.push(new Point(b * Math.sinh(T) + x, a * Math.cosh(T) + y, p * 2 + z));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count != 0) {
                edges.push(new Edge(i, i + 1));
            }
            if (i + count < points.length) {
                edges.push(new Edge(i, i + count));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + count + 1 < points.length && (i + 1) % count != 0) {
                polygons.push(new Polygon([i, i + 1, count + i + 1, count + i], color));
            }
        }
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default ParabalidCylinder;
