"use client";

import {
    useRef,
    useState,
    type CSSProperties,
    type ImgHTMLAttributes,
    type MouseEvent,
} from "react";

type Props = {
    src: string;
    alt: string;
    zoom?: number;
    lensSize?: number;
    style?: CSSProperties;
    loading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
};

type LensState = {
    visible: boolean;
    x: number;
    y: number;
    backgroundX: number;
    backgroundY: number;
    backgroundWidth: number;
    backgroundHeight: number;
};

export default function ImageMagnifier({
                                           src,
                                           alt,
                                           zoom = 2.5,
                                           lensSize = 220,
                                           style,
                                           loading = "lazy",
                                       }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    const [lens, setLens] = useState<LensState>({
        visible: false,
        x: 0,
        y: 0,
        backgroundX: 0,
        backgroundY: 0,
        backgroundWidth: 0,
        backgroundHeight: 0,
    });

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setLens({
            visible: true,
            x,
            y,
            backgroundX: lensSize / 2 - x * zoom,
            backgroundY: lensSize / 2 - y * zoom,
            backgroundWidth: rect.width * zoom,
            backgroundHeight: rect.height * zoom,
        });
    }

    function handleMouseLeave() {
        setLens((current) => ({
            ...current,
            visible: false,
        }));
    }

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                width: "100%",
                display: "inline-block",
                ...style,
                position: "relative",
                overflow: "hidden",
                lineHeight: 0,
                cursor: "zoom-in",
            }}
        >
            <img
                src={src}
                alt={alt}
                loading={loading}
                draggable={false}
                style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    userSelect: "none",
                }}
            />

            {lens.visible && (
                <div
                    style={{
                        position: "absolute",
                        left: lens.x - lensSize / 2,
                        top: lens.y - lensSize / 2,
                        width: lensSize,
                        height: lensSize,
                        borderRadius: "50%",
                        border: "4px solid white",
                        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.35)",
                        backgroundImage: `url("${src}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${lens.backgroundWidth}px ${lens.backgroundHeight}px`,
                        backgroundPosition: `${lens.backgroundX}px ${lens.backgroundY}px`,
                        pointerEvents: "none",
                    }}
                />
            )}
        </div>
    );
}