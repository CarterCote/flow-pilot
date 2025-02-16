import { Bar, Line } from "@/components/ui/chart"

interface ChartProps {
  type: string
  data: {
    labels: string[]
    datasets: { data: number[] }[]
  }
  className?: string
}

export function Chart({ type, data, className }: ChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 10,
          font: {
            size: 10,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        beginAtZero: true,
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Dataset",
        data: data.datasets[0].data,
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 2,
      },
    ],
  }

  if (type === "bar") {
    return (
      <div className="w-full h-full min-h-[200px]">
        <Bar options={options} data={chartData} className={className} />
      </div>
    )
  } else if (type === "line") {
    return (
      <div className="w-full h-full min-h-[200px]">
        <Line options={options} data={chartData} className={className} />
      </div>
    )
  } else {
    return <div>Unsupported chart type</div>
  }
}

