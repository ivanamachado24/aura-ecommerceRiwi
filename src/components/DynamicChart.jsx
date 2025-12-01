"use client";

import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("./HeavyChart"), {
  loading: () => <p>Cargando...</p>,
});

export default function DynamicChartExample() {
  return (
    <section>
      <h2>Gráfico cargado bajo demanda</h2>
      <HeavyChart />
    </section>
  );
}