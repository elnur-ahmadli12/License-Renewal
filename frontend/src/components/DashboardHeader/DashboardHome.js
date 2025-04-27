import React, {useState, useEffect} from 'react';
import {SlGraph} from 'react-icons/sl';
import {Chart} from 'react-google-charts';

// PieChart component
function PieChart() {
    const dataOld = [
        ['Name', 'Popularity'],
        ['Cesar', 250],
        ['Rachel', 4200],
        ['Patrick', 2900],
        ['Eric', 8200],
    ];

    const dataNew = [
        ['Name', 'Popularity'],
        ['Cesar', 370],
        ['Rachel', 600],
        ['Patrick', 700],
        ['Eric', 1500],
    ];

    const data = {old: dataOld, new: dataNew};
    const options = {
        // fill the entire chart background
        backgroundColor: { fill: "#000000" },
        // fill only the inner plotting area
        chartArea: { backgroundColor: "#000000" },
        // title styling
        titleTextStyle: { color: "#FFFFFF", fontName: "Roboto" },
        // horizontal axis styling
        hAxis: {
            textStyle: { color: "#FFFFFF", fontName: "Roboto" },
            gridlines: { color: "#333333" },
            baselineColor: "#FFFFFF",
        },
        // vertical axis styling
        vAxis: {
            textStyle: { color: "#FFFFFF", fontName: "Roboto" },
            gridlines: { color: "#111" },
            baselineColor: "#111",
        },
        // legend styling
        legend: {
            textStyle: { color: "#111", fontName: "Roboto" },
        },
        // annotation (data labels) styling, if you use them
        annotations: {
            textStyle: { color: "#111" },
        },
        // your bar/line colors—choose some that pop on black
        colors: ["#BB86FC", "#03DAC6", "#CF6679"],
        // remove any strokes or borders that are default white
        series: {
            0: { visibleInLegend: true },
        },

        diff: {
            oldData: { opacity: 1, color: "gray" },
            newData: { opacity: 1 }
        },
    };

    return (
        <div className="barchart_container z-[100] relative w-full overflow-hidden mt-8">
            <Chart
                className="barchart w-full transition-all ease-in-out"
                chartType="BarChart"
                diffdata={data}
                options={options}
                width="100%"
                height="500px" // default height, responsive below
            />
        </div>
    );
}

// Home component
function Home({isSidebarOpen}) {
    return (
        <main className={`${isSidebarOpen ? 'ml-[100px]' : ''} transition-width duration-400 ease-in-out`}>
            <section className="pt-8 lg:pl-[140px] lg:mr-1 transition-width duration-400 ease-in-out mt-[3rem] h-100%">
                <div className="home_container mx-2 px-2 md:pl-0 2xl:mt-6">

                    {/* Counters grid */}
                    <div className="counter_container grid grid-cols-1 gap-y-4 w-full md:grid-cols-2
                        2xl:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] 2xl:gap-6 2xl:justify-between"
                    >
                        <div
                            className={`counter grid grid-cols-1 md:grid-cols-2 p-4 md:p-8 rounded-2xl leading-[3.5rem] shadow-lg border border-[#00df9a]`}
                        >
                            <div
                                className="counter_content flex items-center justify-center md:justify-start md:text-left">
                                <h2 className="counter_number flex items-center justify-center text-[2.7rem] font-semibold text-[#00df9a] ">
                                    500
                                </h2>
                                <span className="counter_description ml-2 hidden md:inline text-base font-medium text-white">
                                    New Application
                                </span>
                            </div>
                            <SlGraph className="counter_graph text-[6rem] flex items-center justify-center text-[#00df9a]"/>
                        </div>

                        <div
                            className={`counter grid grid-cols-1 md:grid-cols-2 p-4 md:p-8 rounded-2xl leading-[3.5rem] shadow-lg border border-[#00df9a]`}
                        >
                            <div
                                className="counter_content flex items-center justify-center md:justify-start md:text-left">
                                <h3 className="counter_number flex items-center justify-center text-[2.7rem] font-semibold text-[#00df9a]">
                                    500
                                </h3>
                                <span className="counter_description ml-2 hidden md:inline text-base font-medium text-white">
                                    Total Users
                                </span>
                            </div>
                            <SlGraph className="counter_graph text-[6rem] flex items-center justify-center text-[#00df9a]"/>
                        </div>


                        <div
                            className={`counter grid grid-cols-1 md:grid-cols-2 p-4 md:p-8 rounded-2xl leading-[3.5rem] shadow-lg border border-[#00df9a]`}
                        >
                            <div
                                className="counter_content flex items-center justify-center md:justify-start md:text-left">
                                <h3 className="counter_number flex items-center justify-center text-[2.7rem] font-semibold text-[#00df9a]">
                                    500
                                </h3>
                                <span className="counter_description ml-2 hidden md:inline text-base font-medium text-white">
                                    vehicle License 
                                </span>
                            </div>
                            <SlGraph className="counter_graph text-[6rem] flex items-center justify-center text-[#00df9a]"/>
                        </div>

                        <div
                            className={`counter grid grid-cols-1 md:grid-cols-2 p-4 md:p-8 rounded-2xl leading-[3.5rem] shadow-lg border border-[#00df9a]`}
                        >
                            <div
                                className="counter_content flex items-center justify-center md:justify-start md:text-left">
                                <h3 className="counter_number flex items-center justify-center text-[2.7rem] font-semibold text-[#00df9a]">
                                    500
                                </h3>
                                <span className="counter_description ml-2 hidden md:inline text-base font-medium text-white">
                                    Total Insurance
                                </span>
                            </div>
                            <SlGraph className="counter_graph text-[6rem] flex items-center justify-center text-[#00df9a]"/>
                        </div>


                    </div>

                    {/* Pie Chart */}
                    <PieChart/>
                </div>
            </section>
        </main>
    );
}

export default Home;
