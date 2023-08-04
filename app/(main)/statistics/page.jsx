'use client';
import React from "react";
import Link from "next/link";
import CourseButton from "@/components/course-general-components/CourseButton";
import MyPerformance from "@/components/statistics-page-components/MyPerformance";
import ThisWeek from "@/components/statistics-page-components/ThisWeek";

function Statistics() {
    return (
        <>
        <div className="w-full lg:w-1/2 h-screen m-4">
            <ThisWeek/>
            <MyPerformance/>

        </div>







    </>

);
}

export default Statistics;