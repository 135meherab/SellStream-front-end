import PieChartComponent from "./Chart/PieChartComponent"



function Sales() {
  return (
    <div className='text-2xl font-bold text-red-500 text-center'> 
      <div className="chart flex justify-between items-center">
          <div className="pieChart">
            <PieChartComponent/>
          </div>
      </div>
    </div>
  )
}

export default Sales