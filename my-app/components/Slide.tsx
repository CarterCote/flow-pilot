import Image from "next/image"
import { Chart } from "@/components/Chart"

interface SlideProps {
  title?: string
  text?: string
  imageURL?: string
  chart?: {
    type: string
    data: {
      labels: string[]
      datasets: { data: number[] }[]
    }
  }
}

export default function Slide({ title, text, imageURL, chart }: SlideProps) {
  return (
    <div className="h-full flex flex-col p-2 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      {title && (
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 text-indigo-800 border-b-2 border-indigo-300 pb-2">
          {title}
        </h2>
      )}
      <div className="flex-grow flex flex-col justify-center items-center">
        {text && (
          <p className="text-sm sm:text-base lg:text-lg mb-2 sm:mb-4 text-gray-700 max-w-2xl text-center">{text}</p>
        )}
        {imageURL && (
          <div className="relative w-full max-w-2xl aspect-video mb-6 rounded-lg overflow-hidden shadow-lg">
            <Image src={imageURL || "/placeholder.svg"} alt="Slide image" fill className="object-cover" />
          </div>
        )}
        {chart && (
          <div className="w-full h-[calc(100%-2rem)] max-w-4xl bg-white rounded-lg shadow-lg p-4 flex-grow">
            <Chart type={chart.type} data={chart.data} />
          </div>
        )}
      </div>
    </div>
  )
}

