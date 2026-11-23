import React from "react";

export interface GradientBarsProps {
  numBars?: number;
  gradientFrom?: string;
  gradientTo?: string;
  animationDuration?: number;
  className?: string;
  minHeight?: number;
  maxHeight?: number;
  barBorderColor?: string;
}

export const GradientBars: React.FC<GradientBarsProps> = ({
  numBars = 15,
  gradientFrom = "rgb(255, 60, 0)",
  gradientTo = "transparent",
  animationDuration = 2,
  className = "",
  minHeight = 30,
  maxHeight = 100,
  barBorderColor = "rgba(0, 0, 0, 0.45)",
}) => {
  const calculateHeight = (index: number, total: number) => {
    const position = index / (total - 1);
    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);

    return minHeight + (maxHeight - minHeight) * heightPercentage;
  };

  return (
    <>
      <style>{`
        @keyframes pulseBar {
          0% {
            transform: scaleY(var(--initial-scale));
          }
          100% {
            transform: scaleY(calc(var(--initial-scale) * 0.7));
          }
        }
      `}</style>

      <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
        <div
          className="flex h-full w-full"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          {Array.from({ length: numBars }).map((_, index) => {
            const height = calculateHeight(index, numBars);
            const scale = height / 100;
            return (
              <div
                key={index}
                style={{
                  flex: `1 0 calc(100% / ${numBars})`,
                  maxWidth: `calc(100% / ${numBars})`,
                  height: "100%",
                  background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
                  transform: `scaleY(${scale})`,
                  transformOrigin: "bottom",
                  transition: "transform 0.5s ease-in-out",
                  animation: `pulseBar ${animationDuration}s ease-in-out infinite alternate`,
                  animationDelay: `${index * 0.1}s`,
                  borderRight: `1px solid ${barBorderColor}`,
                  boxSizing: "border-box",
                  // @ts-ignore
                  "--initial-scale": scale,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export interface ComponentProps {
  numBars?: number;
  gradientFrom?: string;
  gradientTo?: string;
  animationDuration?: number;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export default function Component({
  numBars = 15,
  gradientFrom = "rgb(255, 60, 0)",
  gradientTo = "transparent",
  animationDuration = 2,
  backgroundColor = "rgb(10, 10, 10)",
  children,
}: ComponentProps) {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor }}
    >
      <GradientBars
        numBars={numBars}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        animationDuration={animationDuration}
      />

      {children && (
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
          {children}
        </div>
      )}
    </section>
  );
}

export { Component };
