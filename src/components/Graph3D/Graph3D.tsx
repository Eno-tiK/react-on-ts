import React, { useEffect, useRef, useState } from "react";
import Math3D from "../../modules/Math3D/Math3D";
import Graph from "../../modules/Graph/Graph";
import useGraph from "../../modules/Graph/useGraph";
import Point from "../../modules/Math3D/entities/Point";
import Light from "../../modules/Math3D/entities/Light";
import Surface from "../../modules/Math3D/entities/Surface";
import Polygon, { EDistance } from "../../modules/Math3D/entities/Polygon";
import { TSurface } from "../../modules/Math3D/Math3D";

import Sphere from "../../modules/Math3D/surfaces/sphere";
import Cone from "../../modules/Math3D/surfaces/cone";
import Ellipsoid from "../../modules/Math3D/surfaces/Ellipsoid";
import Cube from "../../modules/Math3D/surfaces/cube";
import EllipticalCylinder from "../../modules/Math3D/surfaces/EllipticalCylinder";
import EllipticalParaboloid from "../../modules/Math3D/surfaces/EllipticalParaboloid";
import HyperbolicCylinder from "../../modules/Math3D/surfaces/HyperbolicCylinder";
import HyperbolicParaboloid from "../../modules/Math3D/surfaces/HyperbolicParaboloid";
import OneWayHyperboloid from "../../modules/Math3D/surfaces/OneWayHyperboloid";
import ParabalidCylinder from "../../modules/Math3D/surfaces/ParabolidCylinder";
import Torus from "../../modules/Math3D/surfaces/torus";
import TwoSheetHyperboloid from "../../modules/Math3D/surfaces/TwoSheetHyperboloid";


import './Graph3D.css';

const Graph3D: React.FC = () => {

    const graph3DRotateLightRef = useRef();

    const polygonsdOnly = useRef(true);
    const edgesOnly = useRef(false);
    const pointOnly = useRef(false);

    const WIN = {
        LEFT: -5,
        WIDTH: 10,
        BOTTOM: -5,
        HEIGHT: 10,
        CENTER: new Point(0, 0, -40),
        CAMERA: new Point(0, 0, -50),
    };

    const math3D = new Math3D(WIN);
    const light = new Light(-30, 20, -30, 1500);
    let scene: Surface[] = [new Cube()];
    const [getGraph, cancelGraph] = useGraph(renderScene);

    const gradus = Math.PI / 180 / 4;
    const zoomStep = 0.1;
    let dy = 0;
    let dx = 0;

    let graph: Graph;
    let canMove = false;
    let mouseButton: number;

    function updateScene(type: string) {
        switch (type) {
            case "sphere":
                scene = ([new Sphere({})]);
                renderScene();
                break;
            case "torus":
                scene = ([new Torus ({})]);
                renderScene();
                break;
            case "Ellipsoid":
                scene = ([new Ellipsoid({})]);
                renderScene();
                    break;
            case "EllipticalCylinder":
                scene = ([new EllipticalCylinder ({})]);
                renderScene();
                    break;
            case "EllipticalParaboloid":
                scene = ([new EllipticalParaboloid({})]);
                renderScene();
                break;
            case "HyperbolicParaboloid":
                scene = ([new HyperbolicParaboloid ({})]);
                renderScene();
                break;
            case "cone":
                scene = ([new Cone({})]);
                renderScene();
                break;
            case "HyperbolicCylinder":
                scene = ([new HyperbolicCylinder({})]);
                renderScene();
                break;
            case "OneWayHyperboloid":
                scene = ([new OneWayHyperboloid ({})]);
                renderScene();
                break;
            case "cube":
                scene = ([new Cube()]);
                renderScene();
                break;
            case "ParabolidCylinder":
                scene = ([new ParabalidCylinder ({})]);
                renderScene();
                break;
            case "TwoSheetHyperboloid":
                scene = ([new TwoSheetHyperboloid ({})]);
                renderScene();
                break;
            default:
                scene = ([new Sphere({})]);
                renderScene();
                break;
        }
    }

    function wheelHandler(event: WheelEvent) {
        event.preventDefault();
        const delta = event.deltaY > 0 ? 1 - zoomStep : 1 + zoomStep;
        const T = math3D.zoom(delta);
        scene.forEach(surface => {
            surface.points.forEach((point: any) => math3D.transform(point, T));
            surface.borderPoints.forEach((point: any) => math3D.transform(point, T));
            math3D.transform(surface.center, T);
        });
        renderScene();
    }

    const mouseupHandler = () => {
        canMove = false;
    }

    const mousedownHandler = (event: any) => {
        event.preventDefault();
        canMove = true;
        mouseButton = event.button;
    }

    function mousemoveHandler(event: MouseEvent) {
        event.preventDefault();
        if (canMove) {
            switch (mouseButton) {
                case 0: {
                    let alphaY = 0, alphaX = 0;
                    if (dy !== event.offsetY) {
                        alphaX = (dy - event.offsetY) * gradus;
                    }
                    if (dx !== event.offsetX) {
                        alphaY = (dx - event.offsetX) * gradus;
                    }
                    const T1 = math3D.rotateOX(alphaX);
                    const T2 = math3D.rotateOY(alphaY);
                    const T = math3D.getTransform(T1, T2);
                    scene.forEach(surface => {
                        surface.points.forEach(point => math3D.transform(point, T));
                        surface.borderPoints.forEach(point => math3D.transform(point, T));
                        math3D.transform(surface.center, T);
                    });
                    if (graph3DRotateLightRef.current) {
                        math3D.transform(light, T);
                    }
                    renderScene()
                    break;
                }
            }
        }
        dy = event.offsetY;
        dx = event.offsetX;
    }

    const mouseoutHandler = () => {
        canMove = false;
    }

    const checkboxHandler = (ref: any) => {
        if(ref.current) {
            ref.current = false;
            renderScene()
        } else {
            ref.current = true;
            renderScene()
        }
    }

    function renderScene(FPS = 0) {
        if (!graph) {
            return;
        }
        graph.clear();
        scene.forEach((surface) => {
            //polygon
            if (polygonsdOnly.current) {
                const polygons: Polygon[] = [];
                scene.forEach((surface, index) => {
                    math3D.calcCenter(surface);
                    math3D.calcDistance(surface, WIN.CAMERA, EDistance.distance);
                    math3D.calcDistance(surface, light, EDistance.lumen);
                    if (surface.bulge)
                    surface.polygons.forEach((polygon: any) => {
                        polygon.index = index;
                        polygons.push(polygon);
                    })
                });
                math3D.sortByArtistAlgorithm(polygons);
                polygons.forEach(polygon => {
                        const points = polygon.points.map((index: any) => new Point(
                            math3D.xs(scene[polygon.index].points[index]),
                            math3D.ys(scene[polygon.index].points[index])
                        ));
                        let { r, g, b } = polygon.color;
                        const { isShadow, dark } = false ?
                            //@ts-ignore
                            math3D.calcShadow(polygon, scene, light) : { isShadow: false, dark: 1 };
                            if(polygon.shadow) {
                                const lumen = math3D.calcIllumination(polygon.lumen, light.lumen) * (isShadow && dark ? dark : 1);
                                r = Math.round(r * lumen);
                                g = Math.round(g * lumen);
                                b = Math.round(b * lumen);
                                graph && graph.polygon(points, polygon.rgbToHex(r, g, b));
                            } else {
                                graph && graph.polygon(points, polygon.rgbToHex(r, g, b));
                            }
                    }
                );
                if(surface.borderPoints) {
                    const polygons: Polygon[] = [];
                    scene.forEach((surface, index) => {
                        math3D.calcCenter(surface);
                        math3D.calcDistance(surface, WIN.CAMERA, EDistance.distance);
                        math3D.calcDistance(surface, light, EDistance.lumen);
                        if (surface.bulge)
                            surface.borderPolygon.forEach((polygon: any) => {
                            polygon.index = index;
                            polygons.push(polygon);
                        })
                    });
                    math3D.sortByArtistAlgorithm(polygons);
                    polygons.forEach(polygon => {
                        const points = polygon.points.map((index: any) => new Point(
                            math3D.xs(scene[polygon.index].points[index]),
                            math3D.ys(scene[polygon.index].points[index])
                        ));
                        let { r, g, b } = polygon.color;
                        const { isShadow, dark } = false ?
                            //@ts-ignore
                            math3D.calcShadow(polygon, scene, light) : { isShadow: false, dark: 1 };
                            if(polygon.shadow) {
                                const lumen = math3D.calcIllumination(polygon.lumen, light.lumen) * (isShadow && dark ? dark : 1);
                                r = Math.round(r * lumen);
                                g = Math.round(g * lumen);
                                b = Math.round(b * lumen);
                                graph && graph.polygon(points, polygon.rgbToHex(r, g, b));
                            } else {
                                graph && graph.polygon(points, polygon.rgbToHex(r, g, b));
                            }
                    }
                );
                }
            }
            //edge
            if (edgesOnly.current) {
                surface.edges.forEach((edge: any) => {
                    graph && graph.line(
                        math3D.xs(surface.points[edge.p1]), math3D.ys(surface.points[edge.p1]),
                        math3D.xs(surface.points[edge.p2]), math3D.ys(surface.points[edge.p2])
                    );
                });
                surface.borderEdges.forEach((edge: any) => {
                    graph && graph.line(
                        math3D.xs(surface.borderPoints[edge.p1]), math3D.ys(surface.borderPoints[edge.p1]),
                        math3D.xs(surface.borderPoints[edge.p2]), math3D.ys(surface.borderPoints[edge.p2]), edge.color
                    );
                });
            }
            //point
            if (pointOnly.current) {
                surface.points.forEach((point: Point) => graph && graph.pointLite(math3D.xs(point), math3D.ys(point), point.color));
                surface.borderPoints.forEach((point: Point) => graph && graph.pointLite(math3D.xs(point), math3D.ys(point), point.color));
            }

            graph && graph.drawSun(math3D.xs(light), math3D.ys(light));
        });

        graph.renderFrame();
    }


    React.useEffect(() => {
        graph = new Graph({
            id: 'canvas3D',
            WIN,
            width: 500,
            height: 500,
            callbacks: {
                wheel: (event) => wheelHandler(event),
                mousemove: (event) => mousemoveHandler(event),
                mouseup: () => mouseupHandler(),
                mousedown: (event) => mousedownHandler(event),
                mouseout: () => mouseoutHandler()
            }
        });
        renderScene();
        return () => {
            cancelGraph();
        }
    })
    return(
        <>  
            <div className="Graph3D">
                <div>
                    <div>
                        <div>
                            <select id="SelectSurface" onChange={(surface) => {updateScene(surface.target.value)}}>
                                <option value="cube">КУУУУУУБ</option>
                                <option value="sphere">Сфера</option>
                                <option value="Ellipsoid">Эллипсоид</option>
                                <option value="torus">Торус</option>
                                <option value="cone">Конус</option>
                                <option value="EllipticalCylinder">Элип. Цилиндр</option>
                                <option value="HyperbolicCylinder">Гипер. Цилиндр</option>
                                <option value="ParabolidCylinder">Параб. Цилиндр</option>
                                <option value="EllipticalParaboloid">Элип. Параболоид</option>
                                <option value="HyperbolicParaboloid">Гипер. Параболоид</option>
                                <option value="OneWayHyperboloid">1-полосный Гиперболоид</option>
                                <option value="TwoSheetHyperboloid">2-полосный Гиперболоид</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className="gp3d">
                            <input className='surfaceCustom' data-custom='pointOnly' id="pointOnly" type="checkbox" onClick={() => {checkboxHandler(pointOnly)}} />
                            <label htmlFor="pointOnly">Point's</label>
                        </div>
                        <div className="gp3d">
                            <input className='surfaceCustom' data-custom='edgesOnly' id="edgesOnly" type="checkbox" onClick={() => {checkboxHandler(edgesOnly)}} />
                            <label htmlFor='edgesOnly'> Edge's</label>
                        </div>
                        <div className="gp3d">
                            <input className='surfaceCustom' data-custom='polygonsOnly' id="polygonsOnly" type="checkbox" onClick={() => {checkboxHandler(polygonsdOnly)}} />
                            <label htmlFor="polygonsOnly"> Polygon's</label>
                        </div>
                        <div className="gp3d">
                            <input className='surfaceCustom' data-custom='color' type="color" id="meshColor" value="#e66465" />
                            <label htmlFor="meshColor"> Color</label>
                        </div>
                    </div>
                </div>
                <canvas id='canvas3D' className="canvas3D" width='300' height='300'></canvas>
            </div>
        </>
    );
}

export default Graph3D