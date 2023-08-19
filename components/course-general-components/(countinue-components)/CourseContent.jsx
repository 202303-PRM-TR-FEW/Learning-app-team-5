"use client";
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import "./CourseContent.css";


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
