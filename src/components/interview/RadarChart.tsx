import React from "react";
import { Text, View } from "react-native";

type Point = { x: number; y: number };

const SIZE = 180;
const CENTER = SIZE / 2;
const RADIUS = SIZE * 0.35;

function getRadarPoints(scores: number[]): Point[] {
  return scores.map((score, index) => {
    const clamped = Math.max(0, Math.min(1, score));
    const angle = Math.PI / 2 + (Math.PI * 2 * index) / scores.length;
    return {
      x: CENTER + Math.cos(angle) * RADIUS * clamped,
      y: CENTER - Math.sin(angle) * RADIUS * clamped,
    };
  });
}

function Edge({
  start,
  end,
  color,
  opacity = 1,
  thickness = 2,
}: {
  start: Point;
  end: Point;
  color: string;
  opacity?: number;
  thickness?: number;
}) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  if (length === 0) return null;

  const rotation = `${(Math.atan2(dy, dx) * 180) / Math.PI}deg`;

  // transform: rotate는 요소의 중심을 기준으로 회전하므로,
  // 선의 중점을 두 끝점의 중점에 맞춰야 끝점이 정확히 일치한다.
  return (
    <View
      style={{
        position: "absolute",
        left: (start.x + end.x) / 2 - length / 2,
        top: (start.y + end.y) / 2 - thickness / 2,
        width: length,
        height: thickness,
        backgroundColor: color,
        opacity,
        transform: [{ rotate: rotation }],
      }}
    />
  );
}

interface RadarChartProps {
  axes: readonly string[];
  current: number[];
  average: number[];
}

export function RadarChart({ axes, current, average }: RadarChartProps) {
  const center: Point = { x: CENTER, y: CENTER };
  const axisTips = getRadarPoints(axes.map(() => 1));
  const points = getRadarPoints(current);
  const avgPoints = getRadarPoints(average);

  return (
    <View className="items-center justify-center">
      <View className="relative rounded-full bg-slate-50 dark:bg-ink-950" style={{ width: SIZE, height: SIZE }}>
        {[1, 0.75, 0.5, 0.25].map((scale) => {
          const ringSize = RADIUS * 2 * scale;
          return (
            <View
              key={`ring-${scale}`}
              className="absolute rounded-full border border-ink-200 dark:border-ink-700"
              style={{ width: ringSize, height: ringSize, left: CENTER - ringSize / 2, top: CENTER - ringSize / 2 }}
            />
          );
        })}

        {axisTips.map((tip, index) => (
          <Edge key={`spoke-${index}`} start={center} end={tip} color="rgba(148,163,184,0.45)" thickness={1} />
        ))}

        {avgPoints.map((startPoint, index) => (
          <Edge
            key={`avg-${index}`}
            start={startPoint}
            end={avgPoints[(index + 1) % avgPoints.length]}
            color="rgba(148,163,184,0.7)"
            opacity={0.7}
          />
        ))}

        {points.map((startPoint, index) => (
          <Edge
            key={`current-${index}`}
            start={startPoint}
            end={points[(index + 1) % points.length]}
            color="rgba(59,130,246,0.95)"
          />
        ))}

        {points.map((point, index) => (
          <View
            key={`point-${index}`}
            style={{
              position: "absolute",
              left: point.x - 5,
              top: point.y - 5,
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#3b82f6",
              borderWidth: 2,
              borderColor: "#fff",
            }}
          />
        ))}

        {axisTips.map((tip, index) => {
          const isLeft = tip.x < CENTER - 1;
          const isRight = tip.x > CENTER + 1;
          const left = isRight ? tip.x + 6 : isLeft ? tip.x - 86 : CENTER - 40;
          const top = tip.y < CENTER - 1 ? tip.y - 20 : tip.y > CENTER + 1 ? tip.y + 6 : tip.y - 8;
          const textAlign: "left" | "right" | "center" = isRight ? "left" : isLeft ? "right" : "center";
          return (
            <Text
              key={`label-${index}`}
              className="absolute text-[11px] font-semibold text-ink-600 dark:text-ink-300"
              style={{ left, top, width: 80, textAlign }}
            >
              {axes[index]}
            </Text>
          );
        })}
      </View>
    </View>
  );
}
