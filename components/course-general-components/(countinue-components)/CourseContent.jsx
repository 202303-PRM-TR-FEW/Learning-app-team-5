"use client";
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import "./CourseContent.css";

function getRandomVideoDuration() {
  // Get a random duration between 3 and 6 minutes
  return Math.floor(Math.random() * (6 - 3 + 1)) + 3;
}

const randomCourses = [
  {
    title: "Introduction to Python Programming",
    videos: [
      { name: "Variables and Data Types", duration: getRandomVideoDuration() },
      {
        name: "Conditional Statements in Python",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Loops and Iteration in Python",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Functions and Modules in Python",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Working with Lists and Dictionaries",
        duration: getRandomVideoDuration(),
      },
    ],
  },
  {
    title: "Introduction to Python Programming",
    videos: [
      { name: "Variables and Data Types", duration: getRandomVideoDuration() },
      {
        name: "Conditional Statements in Python",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Loops and Iteration in Python",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Functions and Modules in Python",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Working with Lists and Dictionaries",
        duration: getRandomVideoDuration(),
      },
    ],
  },
  {
    title: "Introduction to Python Programming",
    videos: [
      { name: "Variables and Data Types", duration: getRandomVideoDuration() },
      {
        name: "Conditional Statements in Python",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Loops and Iteration in Python",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Functions and Modules in Python",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Working with Lists and Dictionaries",
        duration: getRandomVideoDuration(),
      },
    ],
  },
  {
    title: "Digital Photography",
    videos: [
      {
        name: "Understanding Exposure in Photography",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Composition Rules and Techniques",
        duration: getRandomVideoDuration(),
      },
      { name: "Portrait Photography Tips", duration: getRandomVideoDuration() },
      {
        name: "Landscape Photography: Capturing Nature's Beauty",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Advanced Photo Editing with Lightroom",
        duration: getRandomVideoDuration(),
      },
    ],
  },
  {
    title: "Machine Learning and Data Science",
    videos: [
      {
        name: "Introduction to Machine Learning Concepts",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Supervised Learning Techniques",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Unsupervised Learning and Clustering",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Deep Learning and Neural Networks",
        duration: getRandomVideoDuration(),
      },
      {
        name: "Data Visualization and Interpretation",
        duration: getRandomVideoDuration(),
      },
    ],
  },
];

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames("AccordionTrigger", className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={classNames("AccordionContent", className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  )
);

AccordionContent.displayName = "AccordionContent";

const CourseContent = ({ selctedModules }) => {
  return (
    <div className="flex-col w-full">
      <Accordion.Root
        className="AccordionRoo py-4"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        {selctedModules.modules?.map((course, index) => (
          <Accordion.Item
            key={index}
            className="AccordionItem"
            value={`item-${index}`}
          >
            <AccordionTrigger className="">{course.title}</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li className="py-2">{course.description}</li>
                {course.content?.map((element, index) => {
                  console.log(element);
                  if (element.type === "text") {
                    return <li key={index}> {element.data}</li>;
                  }
                })}
              </ul>
            </AccordionContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default CourseContent;
