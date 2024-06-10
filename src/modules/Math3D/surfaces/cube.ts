import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";
import Surface from "../entities/Surface";

class Cube extends Surface {
    constructor() {
        super();
        const points = [
          //Угловые точки
          new Point(-6,-6,-6),
          new Point(-6,-6,6),
          new Point(6,-6,6),
          new Point(6,-6,-6),
          new Point(-6,6,-6),
          new Point(-6,6,6),
          new Point(6,6,6),
          new Point(6,6,-6),
          //Точки на гранях
          new Point(-6, 2, -6),
          new Point(-6,-2, -6),
          new Point(6, 2, -6),
          new Point(6, -2, -6),
          new Point(6, 2, 6),
          new Point(6, -2, 6),
          new Point(-6, 2, 6),
          new Point(-6, -2, 6),
  
          new Point(2, -6, -6),
          new Point(-2, -6, -6),
          new Point(2, -6, 6),
          new Point(-2, -6, 6),
          new Point(2, 6, 6),
          new Point(-2, 6, 6),
          new Point(2, 6, -6),
          new Point(-2, 6, -6),
  
          new Point(6, 6, 2),
          new Point(6, 6, -2),
          new Point(-6, 6, 2),
          new Point(-6, 6, -2),
          new Point(-6, -6, 2),
          new Point(-6, -6, -2),
          new Point(6, -6, 2),
          new Point(6, -6, -2),
  
          //Внутрение точки
          new Point(-6, -6, 2),
  
          new Point(2, 2, 6),
          new Point(-2, 2, 6),
          new Point(-2, -2, 6),
          new Point(2, -2, 6),
          new Point(2, 2, -6),
          new Point(-2, 2, -6),
          new Point(-2, -2, -6),
          new Point(2, -2, -6),
  
          new Point(2, 6, 2),
          new Point(-2, 6, 2),
          new Point(-2, 6, -2),
          new Point(2, 6, -2),
          new Point(2, -6, 2),
          new Point(-2, -6, 2),
          new Point(-2, -6, -2),
          new Point(2, -6, -2),
  
          new Point(6, 2, 2),
          new Point(6, -2, 2),
          new Point(6, -2, -2),
          new Point(6, 2, -2),
          new Point(-6, 2, 2),
          new Point(-6, -2, 2),
          new Point(-6, -2, -2),
          new Point(-6, 2, -2)
      ]
      
     const edges = [
          //Внешние грани
          new Edge(0, 1),
          new Edge(0, 3),
          new Edge(0, 4),
          new Edge(2, 1),
          new Edge(5, 1),
          new Edge(3, 2),
          new Edge(3, 7),
          new Edge(6, 7),
          new Edge(4, 7),
          new Edge(5, 6),
          new Edge(5, 4),
          new Edge(2, 6),
          //Внутрение грани
          new Edge(22, 16),
          new Edge(23, 17),
          new Edge(8, 10),
          new Edge(9, 11),
          new Edge(10, 12),
          new Edge(11, 13),
          new Edge(25, 31),
          new Edge(24, 30),
          new Edge(26, 28),
          new Edge(27, 29),
          new Edge(8, 14),
          new Edge(9, 15),
          new Edge(18, 20),
          new Edge(19, 21),
          new Edge(12, 14),
          new Edge(13, 15),
          new Edge(20, 22),
          new Edge(21, 23),
          new Edge(25, 27),
          new Edge(24, 26),
          new Edge(16, 18),
          new Edge(17, 19),
          new Edge(28, 30),
          new Edge(29, 31),
      ]
  
      const polygons = [
          //Ось
          new Polygon([33, 34, 35, 36],'#ffff00'),
          new Polygon([37, 38, 39, 40], '#ffffff'),
          new Polygon([41, 42, 43, 44], '#ff9900'),
          new Polygon([45, 46, 47, 48], '#ff0000'),
          new Polygon([49, 50, 51, 52], '#0000ff'),
          new Polygon([53, 54, 55, 56], '#008000'),
          //Грани белая
          new Polygon([23, 22, 37, 38],'#008000'),
          new Polygon([11, 10, 37, 40],'#0000ff'),
          new Polygon([39, 40, 16, 17],'#ffff00'),
          new Polygon([38, 39, 9, 8],'#ff9900'),
          new Polygon([38, 8, 4, 23], '#ff0000'),
          new Polygon([39, 9, 0, 17], '#ff0000'),
          new Polygon([37, 22, 7, 10], '#ff9900'),
          new Polygon([40, 11, 3, 16],'#008000'),
          //синий
          new Polygon([51, 52, 10, 11],'#ffff00'),
          new Polygon([52, 49, 24, 25], '#ff0000'),
          new Polygon([49, 50, 13, 12], '#008000'),
          new Polygon([50, 51, 31, 30],'#008000'),
          new Polygon([52, 10, 7, 25],'#ffffff'),
          new Polygon([49, 24, 6, 12],'#0000ff'),
          new Polygon([51, 11, 3, 31], '#ffffff'),
          new Polygon([50, 13, 2, 30],'#ff9900'),
          //желтый
          new Polygon([33, 34,21, 20], '#0000ff'),
          new Polygon([33, 36, 13, 12], '#ff0000'),
          new Polygon([34, 35, 15, 14], '#0000ff'),
          new Polygon([35, 36,18, 19], '#ff0000'),
          new Polygon([33, 20, 6, 12],'#ffff00'),
          new Polygon([34, 14, 5, 21], '#008000'),
          new Polygon([35, 15, 1, 19],'#ffff00'),
          new Polygon([36, 13, 2, 18], '#008000'),
          //зеленый
          new Polygon([53, 54, 15, 14],'#ff9900'),
          new Polygon([53, 56, 27, 26],'#ff9900'),
          new Polygon([56, 55, 9, 8],'#ffffff'),
          new Polygon([54, 55, 29, 28],'#ffffff'),
          new Polygon([53, 14, 5, 26],'#ffffff'),
          new Polygon([56, 27, 4, 8], '#0000ff'),
          new Polygon([55, 9, 0 , 29], '#0000ff'),
          new Polygon([54, 15, 1, 28], '#008000'),
          //оранжевый
          new Polygon([41, 44, 25, 24],'#ffff00'),
          new Polygon([43, 44, 22, 23],'#ffff00'),
          new Polygon([43, 27, 4, 23],'#ffff00'),
          new Polygon([42, 43, 27, 26], '#008000'),
          new Polygon([42, 41, 20, 21], '#ff0000'),
          new Polygon([41, 24, 6, 20],'#ff9900'),
          new Polygon([42, 26, 5, 21],'#ff9900'),
          new Polygon([44, 22, 7, 25], '#0000ff'),
          //красный
          new Polygon([48, 45, 30, 31],'#ffffff'),
          new Polygon([46, 45, 18, 19],'#ffffff'),
          new Polygon([47, 29, 0, 17],'#ffffff'),
          new Polygon([48, 31, 3, 16], '#ff0000'),
          new Polygon([46, 28, 1 ,19], '#ff0000'),
          new Polygon([47, 48, 16, 17],'#ff9900'),
          new Polygon([47, 46, 28, 29], '#0000ff'),
          new Polygon([45, 30, 2, 18],'#ffff00')
      ]
          
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default Cube;
